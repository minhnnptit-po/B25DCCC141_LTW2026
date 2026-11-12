const BUILD_TAG = "rc-5307";
/* eslint-disable import/first, no-unused-vars */
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Play from './pages/Play';
import Result from './pages/Result';
import History from './pages/History';
import QuestionBank from './pages/QuestionBank';
import QuestionDetail from './pages/QuestionDetail';
import NotFound from './pages/NotFound';

const HISTORY_KEY = 'ltw_rcv_history';


const loadHistory = () => {
  try {
    const data = JSON.parse(localStorage.getItem(HISTORY_KEY));
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
};

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [history, setHistory] = useState(loadHistory);
 
  const [settings, setSettings] = useState({
    topic: '', 
    shuffle: false, 
    speedBonus: false, 
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuestions = async () => {
      try {
        const res = await axios.get('/data/questions.json', {
          signal: controller.signal,
        });
        setQuestions(res.data);
        setError(false);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) return; 
        setError(true);
        setLoading(false);
      }
    };

    fetchQuestions();
    return () => controller.abort();
  }, []);

  
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (err) {
  
    }
  }, [history]);

  const addHistory = (record) => setHistory((prev) => [...prev, record]);
  const clearHistory = () => setHistory([]);

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route
          index
          element={
            <Home
              playerName={playerName}
              setPlayerName={setPlayerName}
              history={history}
              settings={settings}
              setSettings={setSettings}
            />
          }
        />
        <Route
          path="play"
          element={
            <Play
              questions={questions}
              playerName={playerName}
              settings={settings}
              onFinish={addHistory}
            />
          }
        />
        <Route path="result" element={<Result />} />
        <Route
          path="history"
          element={<History history={history} onClear={clearHistory} />}
        />
        <Route path="questions" element={<QuestionBank questions={questions} />} />
        <Route
          path="questions/:id"
          element={<QuestionDetail questions={questions} />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
