import { POINTS, RANKS } from './data';


export const SPEED_BONUS = 5;
export const SPEED_BONUS_MIN_TIME = 15;


export const calcScore = (answers) =>
  answers
    .filter((a) => a.correct)
    .reduce((sum, a) => sum + POINTS[a.level] + (a.bonus || 0), 0);

export const getRank = (score) => RANKS.find((r) => score >= r.min).title;


export const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};


export const shuffleOptions = (q) => {
  const order = shuffle(q.options.map((_, i) => i)); 
  return {
    ...q,
    options: order.map((oldIndex) => q.options[oldIndex]),
    answer: order.indexOf(q.answer),
  };
};
