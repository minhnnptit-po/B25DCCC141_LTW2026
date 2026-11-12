import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { EXTRA_TIME, TIME_PER_QUESTION } from '../data';
import {
  SPEED_BONUS,
  SPEED_BONUS_MIN_TIME,
  calcScore,
  getRank,
  shuffleOptions,
} from '../utils';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import Helpers from '../components/Helpers';

const PlayGame = ({ questions, playerName, settings, onFinish }) => {
  const navigate = useNavigate();

 
  const [gameQuestions] = useState(() =>
    settings.shuffle ? questions.map(shuffleOptions) : questions
  );

  const [index, setIndex] = useState(0); 
  const [answers, setAnswers] = useState([]); 
  const [status, setStatus] = useState('answering'); 
  const [selected, setSelected] = useState(null); 
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

 
  const [used, setUsed] = useState({ fifty: false, time: false, life: false });
  const [hidden, setHidden] = useState([]); 
  const [lifeActive, setLifeActive] = useState(false); 
  const [boosted, setBoosted] = useState(false); 

  const total = gameQuestions.length;
  const question = gameQuestions[index];
  const score = calcScore(answers);


  const getBonus = () =>
    settings.speedBonus &&
    selected !== null &&
    selected === question.answer &&
    !boosted &&
    timeLeft >= SPEED_BONUS_MIN_TIME
      ? SPEED_BONUS
      : 0;

 
  const finish = (finalAnswers, reason) => {
    const finalScore = calcScore(finalAnswers);
    const rank = getRank(finalScore);
    const correctCount = finalAnswers.filter((a) => a.correct).length;

    onFinish({
      id: Date.now(),
      name: playerName,
      score: finalScore,
      rank,
      correctCount,
      playedAt: new Date().toLocaleString('vi-VN'),
    });

    navigate('/result', {
      replace: true,
      state: {
        name: playerName,
        score: finalScore,
        rank,
        correctCount,
        reason,
        total,
        topic: settings.topic,
      },
    });
  };

 
  const handleAfterReveal = () => {
    const correct = selected !== null && selected === question.answer;
    const saved = !correct && lifeActive; 
    const newAnswers = [
      ...answers,
      {
        id: question.id,
        level: question.level,
        correct,
        saved,
        bonus: getBonus(),
      },
    ];

    if (!correct && !saved) {
      finish(newAnswers, selected === null ? 'timeout' : 'wrong');
      return;
    }
    if (index === total - 1) {
      let reason = 'finished';
      if (newAnswers.every((a) => a.correct)) {
        
        reason = settings.topic ? 'topicPerfect' : 'perfect';
      }
      finish(newAnswers, reason);
      return;
    }

    setAnswers(newAnswers);
    setIndex(index + 1);
    setSelected(null);
    setTimeLeft(TIME_PER_QUESTION);
    setHidden([]);
    setLifeActive(false); 
    setBoosted(false);
    setStatus('answering');
  };


  useEffect(() => {
    if (status !== 'answering') return;
    const timer = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [status]);


  useEffect(() => {
    if (status === 'answering' && timeLeft === 0) {
      setStatus('revealed');
    }
  }, [status, timeLeft]);

 
  useEffect(() => {
    if (status === 'locked') {
      const t = setTimeout(() => setStatus('revealed'), 2000);
      return () => clearTimeout(t);
    }
    if (status === 'revealed') {
      const t = setTimeout(handleAfterReveal, 1500);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);


  useEffect(() => {
    const handleKey = (e) => {
      const i = ['1', '2', '3', '4'].indexOf(e.key);
      if (i === -1 || status !== 'answering' || hidden.includes(i)) return;
      setSelected(i);
      setStatus('locked');
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status, hidden]);


  useEffect(() => {
    document.title = `Câu ${index + 1}/${total} – ${score} điểm`;
    return () => {
      document.title = 'Rung chuông vàng';
    };
  }, [index, total, score]);

  const handleSelect = (i) => {
    if (status !== 'answering') return;
    setSelected(i);
    setStatus('locked');
  };

 
  const handleFifty = () => {
    if (status !== 'answering' || used.fifty) return;
    const wrongs = question.options
      .map((_, i) => i)
      .filter((i) => i !== question.answer);
    const pick = wrongs[Math.floor(Math.random() * wrongs.length)];
    setHidden([pick]);
    setUsed({ ...used, fifty: true });
  };

  
  const handleTime = () => {
    if (status !== 'answering' || used.time) return;
    setTimeLeft((t) => t + EXTRA_TIME);
    setBoosted(true);
    setUsed({ ...used, time: true });
  };

  
  const handleLife = () => {
    if (status !== 'answering' || used.life) return;
    setLifeActive(true);
    setUsed({ ...used, life: true });
  };

  
  const optionStates = question.options.map((_, i) => {
    if (status === 'locked') return i === selected ? 'selected' : 'idle';
    if (status === 'revealed') {
      if (i === question.answer) return 'correct';
      if (i === selected) return 'wrong';
    }
    return 'idle';
  });

  return (
    <div>
      <ScoreBoard
        score={score}
        total={total}
        answers={answers}
        currentIndex={index}
      />
      <Timer timeLeft={timeLeft} />
      <Helpers
        used={used}
        lifeActive={lifeActive}
        disabled={status !== 'answering'}
        onFifty={handleFifty}
        onTime={handleTime}
        onLife={handleLife}
      />
      <QuestionCard
        question={question}
        index={index}
        total={total}
        optionStates={optionStates}
        hiddenOptions={hidden}
        disabled={status !== 'answering'}
        onSelect={handleSelect}
      />
      {status === 'revealed' && getBonus() > 0 && (
        <p className="bonus">{`+${SPEED_BONUS} điểm thưởng tốc độ!`}</p>
      )}
    </div>
  );
};


const Play = ({ questions, playerName, settings, onFinish }) => {
  if (playerName.trim() === '') return <Navigate to="/" replace />;

  
  const pool = settings.topic
    ? questions.filter((q) => q.topic === settings.topic)
    : questions;

  return (
    <PlayGame
      questions={pool}
      playerName={playerName.trim()}
      settings={settings}
      onFinish={onFinish}
    />
  );
};

export default Play;
