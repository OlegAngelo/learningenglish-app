import { useEffect, useState } from 'react';

const useSLReadingProgress = (data, examId) => {
  const [results, setResults] = useState({
    chunkLength: 0,
    correctChunks: 0,
    percentage: 0,
    style: '',
  });

  const css = {
    timeUp : {
      color : 'secondary-500',
      label : 'Time Up!',
    },
    inProgress : {
      color : 'secondary-500',
      label : 'In Progress',
    },
    mastered : {
      color : 'progressBar-done',
      label : 'Mastered!',
    }
  }

  useEffect(() => {
    data?.forEach((item) => {
      if (item.id == examId) {
        const chunkLength = item.chunks.length;
        let correctChunks = 0;
        let percentage = 0;
        let style;
        item.chunks.forEach((chunk) => {
          if (chunk.isCorrect) correctChunks += 1;
        });
        percentage = parseInt((correctChunks / chunkLength) * 100);

        if (percentage >= 80 && item.isTimeUp === false) {
          style = css.mastered
        } else if (percentage < 80 && item.isTimeUp === false) {
          style = css.inProgress
        } else {
          style = css.timeUp
        }

        setResults({
          chunkLength,
          correctChunks,
          percentage,
          style,
        });
      }
    });

  }, []);

  return results;
};

export default useSLReadingProgress;
