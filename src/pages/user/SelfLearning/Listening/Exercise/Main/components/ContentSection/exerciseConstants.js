import style from './ContentSection.module.css';

const exerciseConstants = {
  pageStates: {
    listenToProblem: 'まずは英文を聞きましょう',
    shadowing: '問題のすぐ後に続いて発音しましょう',
    completeEnglishSentence: '読まれた英文を完成させましょう',
    completeBlankText: '英文を聞き、空欄の文章を完成させましょう',
    resultWithSpeakingDisabled: '答えを確認しましょう',
    resultWithSpeakingEnabled: '音声を聞いて、まねして発音しましょう',
    resultAfterRecording: '見本音声と自分の発音を聞き比べ、うまく発音できるまで練習しましょう',
  },

  recordingStates: {
    default: {
      text: '録音する',
      textClassname: 'text-14 text-primary-500 text-center mt-px-7 font-hiragino-kaku',
      note: null,
    },
    recording: {
      text: '録音終了',
      textClassname: 'text-14 text-exam-error text-center mt-px-7 font-hiragino-kaku',
      note: 'タップして録音を終了させます。',
      noteClassname: 'text-primary-500 text-11 grid text-center mt-px-16 font-bold',
    },
    playing: {
      text: {
        play: '録音音声を再生',
        pause: '再生を一時停止'
      },
      textClassname: 'text-14 text-primary-500 text-center font-hiragino-kaku',
      note: null,
    },
    errorRecording: {
      text: null,
      note: 'うまく聞き取れませんでした',
      noteClassname: 'text-exam-error text-14 grid text-center mt-px-58 font-bold',
    },
  },
  
  isTypingStates: ['completeEnglishSentence', 'completeBlankText'],
  isResultStates: ['resultWithSpeakingDisabled', 'resultWithSpeakingEnabled'],

  feedbackConstants: {
    correct: {
      message: 'Excellent!!',
      borderClassname: 'shadow-btn-choice border-secondary-500 rounded-px-4 border-px-2',
      textClassname: `text-24 leading-px-38 text-center font-black font-hiragino text-secondary-500 ${style.resultFeedback}`,
    },
    incorrect: {
      message: 'Keep it up!',
      borderClassname: 'shadow-btn-choice text-exam-error border-progress-red rounded-px-4 border-px-2',
      textClassname: `text-24 leading-px-38 text-center font-black font-hiragino text-progress-red ${style.resultFeedback}`,
    },
    default: {
      borderClassname: 'shadow-btn-choice rounded-px-4 border-px-2',
    },
  },

};

export default exerciseConstants;
