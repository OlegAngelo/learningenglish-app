import { useState, useEffect } from 'react';

export const useSetting = () => {
  const [learningTypes, setLearningType] = useState({ word: true, phrase: false });
  const [questionTypes, setQuestionTypes] = useState({
    notTried: { selected: true, disabled: false, name: 'not-tried'  },
    inProgress: { selected: false, disabled: false, name: 'in-progress' },
    master: { selected: false, disabled: false, name: 'master'},
  });
  const [learningCategories, setLearningCategories] = useState({
    meaningSelection: false,
    sentenceSelection: false,
    voiceUtterance: false,
    shadowing: false,
    speechRecognition: false,
    voiceMeaningSelection: false,
    spelling: false,
    voiceSpelling: false,
    instantComposition: false,
    voiceListening: false,
    englishSelection: false,
    wordSelection: false,
    instantUtterance: false,
  });
  const [categoryTitle, setCategoryTitle] = useState('未習の単語を学習する');

  const hasSelected = () => {
    let categories = [
      'meaningSelection',
      'sentenceSelection',
      'voiceUtterance',
      'shadowing',
      'speechRecognition',
      'voiceMeaningSelection',
      'spelling',
      'voiceSpelling',
      'instantComposition',
      'voiceListening',
      'englishSelection',
      'wordSelection',
      'instantUtterance',
    ];

    let result = false;
    if (questionTypes['master'].selected) {
      for(let category of categories) {
        if (learningCategories[category]) {
            result = true;
            break;
        }
      }
    } else {
      result = true;
    }

    return result;
  }

  const categoryNameEquivalent = {
    meaningSelection: learningTypes.word ? 'word-translation-selection' : 'reading',
    sentenceSelection: 'reading',
    voiceUtterance: 'sentence-reading',
    shadowing: 'shadowing',
    speechRecognition: 'english-speech-recognition',
    voiceMeaningSelection: learningTypes.word ? 'audio-word-selection' : 'listening',
    spelling: learningTypes.word ? 'spelling' : 'word-typing',
    voiceSpelling: 'audio-typing',
    instantComposition: 'instant-composition',
    voiceListening: learningTypes.word ? 'voice-listening' : 'phrase-voice-listening',
    englishSelection: learningTypes.word ? 'english-selection' : 'phrase-english-selection',
    wordSelection: 'vacancy-filling-problem',
    instantUtterance: 'instant-utterance'
  };
  const [showCategories, setShowCategories] = useState(true);
  const [data, setData] = useState();
  const [hideSpeakingTypes, setHideSpeakingTypes] = useState(false);

  useEffect(() => {
    setShowCategories(questionTypes['master'].selected);
    unselectLearningCategories();
  }, [questionTypes]);

  useEffect(() => {
    questionTypeDisabledOnChange('word');

    if (!parseInt(localStorage.user_enable_speaking)) {
      setHideSpeakingTypes(true);
    }
  }, [data]);

  useEffect(() => {
    const learningType = learningTypes['word'] ? 'word' : 'phrase';

    switch (getSelectedQuestionType()) {
      case 'not-tried':
        setCategoryTitle(
          learningType === 'word' ? '未習の単語を学習する' : '未習のフレーズを学習する'
        );
        break;
      case 'in-progress':
        setCategoryTitle(
          learningType === 'word' ? '学習進行中の単語を学習する' : '学習進行中のフレーズを学習する'
        );
        break;
      case 'master':
        setCategoryTitle(
          learningType === 'word' ? '習得した単語を復習する' : '習得したフレーズを復習する'
        );
        break;
    }
  }, [questionTypes, learningTypes]);

  const setInitialSelectedLearningType = (tempData) => {
    if (!tempData['notTried'].disabled) {
      setQuestionTypes({
        ...tempData,
        notTried: {
          ...tempData['notTried'],
          selected: true,
        },
      });
      return;
    }
    if (!tempData['inProgress'].disabled) {
      setQuestionTypes({
        ...tempData,
        inProgress: {
          ...tempData['inProgress'],
          selected: true,
        },
      });
      return;
    }
    if (!tempData['master'].disabled) {
      setQuestionTypes({
        ...tempData,
        master: {
          ...tempData['master'],
          selected: true,
        },
      });
    }
  };

  const questionTypeDisabledOnChange = (type) => {
    let tempData = { ...questionTypes };

    if (data) {
      let { proficiency } = data;
      tempData = {
        ...questionTypes,
        notTried: {
          ...questionTypes['notTried'],
          disabled: proficiency[type]['not_tried'] === 0,
          selected: false,
        },
        inProgress: {
          ...questionTypes['inProgress'],
          disabled: proficiency[type]['in_progress'] === 0,
          selected: false,
        },
        master: {
          ...questionTypes['master'],
          disabled: proficiency[type]['master'] === 0,
          selected: false,
        },
      };

      setQuestionTypes(tempData);
      setInitialSelectedLearningType(tempData);
    }
  };

  const unselectLearningCategories = (params) => {
    setLearningCategories({
      ...learningCategories,
      meaningSelection: true,
      meaningSelection: false,
      sentenceSelection: false,
      voiceUtterance: false,
      shadowing: false,
      speechRecognition: false,
      voiceMeaningSelection: false,
      spelling: false,
      voiceSpelling: false,
      instantComposition: false,
      voiceListening: false,
      englishSelection: false,
      wordSelection: false,
      instantUtterance: false,
    });
  };

  const learningTypeOnClick = (type) => {
    if (type === 'word' && !learningTypes[type]) {
      setLearningType({
        ...learningTypes,
        word: !learningTypes[type],
        phrase: learningTypes[type],
      });
    }
    if (type === 'phrase' && !learningTypes[type]) {
      setLearningType({
        ...learningTypes,
        word: learningTypes[type],
        phrase: !learningTypes[type],
      });
    }

    questionTypeDisabledOnChange(type);
  };

  const questionTypeOnClick = (type) => {
    if (questionTypes[type].selected) {
      return;
    }

    switch (type) {
      case 'notTried':
        setQuestionTypes({
          ...questionTypes,
          notTried: {
            ...questionTypes['notTried'],
            selected: !questionTypes[type].selected,
          },
          inProgress: {
            ...questionTypes['inProgress'],
            selected: false,
          },
          master: {
            ...questionTypes['master'],
            selected: false,
          },
        });
        break;
      case 'inProgress':
        setQuestionTypes({
          ...questionTypes,
          notTried: {
            ...questionTypes['notTried'],
            selected: false,
          },
          inProgress: {
            ...questionTypes['inProgress'],
            selected: !questionTypes[type].selected,
          },
          master: {
            ...questionTypes['master'],
            selected: false,
          },
        });
        break;
      case 'master':
        setQuestionTypes({
          ...questionTypes,
          notTried: {
            ...questionTypes['notTried'],
            selected: false,
          },
          inProgress: {
            ...questionTypes['inProgress'],
            selected: false,
          },
          master: {
            ...questionTypes['master'],
            selected: !questionTypes[type].selected,
          },
        });
    }
  };

  const learningCategoryOnClick = (category) => {
    switch (category) {
      case 'meaningSelection':
        setLearningCategories({
          ...learningCategories,
          meaningSelection: !learningCategories[category],
        });
        break;
      case 'sentenceSelection':
        setLearningCategories({
          ...learningCategories,
          sentenceSelection: !learningCategories[category],
        });
        break;
      case 'voiceUtterance':
        setLearningCategories({
          ...learningCategories,
          voiceUtterance: !learningCategories[category],
        });
        break;
      case 'shadowing':
        setLearningCategories({
          ...learningCategories,
          shadowing: !learningCategories[category],
        });
        break;
      case 'speechRecognition':
        setLearningCategories({
          ...learningCategories,
          speechRecognition: !learningCategories[category],
        });
        break;
      case 'voiceMeaningSelection':
        setLearningCategories({
          ...learningCategories,
          voiceMeaningSelection: !learningCategories[category],
        });
        break;
      case 'spelling':
        setLearningCategories({
          ...learningCategories,
          spelling: !learningCategories[category],
        });
        break;
      case 'voiceSpelling':
        setLearningCategories({
          ...learningCategories,
          voiceSpelling: !learningCategories[category],
        });
        break;
      case 'instantComposition':
        setLearningCategories({
          ...learningCategories,
          instantComposition: !learningCategories[category],
        });
        break;
      case 'voiceListening':
        setLearningCategories({
          ...learningCategories,
          voiceListening: !learningCategories[category],
        });
        break;
      case 'englishSelection':
        setLearningCategories({
          ...learningCategories,
          englishSelection: !learningCategories[category],
        });
        break;
      case 'wordSelection':
        setLearningCategories({
          ...learningCategories,
          wordSelection: !learningCategories[category],
        });
        break;
      case 'instantUtterance':
        setLearningCategories({
          ...learningCategories,
          instantUtterance: !learningCategories[category],
        });
        break;
    }
  };

  const getSelectedQuestionType = () => {
    let questionType = questionTypes.notTried.name;

    for (const [_, type] of Object.entries(questionTypes)) {
      if (type.selected) {
        questionType = type.name;
      }
    }

    return questionType;
  };

  const getSelectedData = () => {
    let categories = [];
    let questionType = getSelectedQuestionType();
    let learningType = learningTypes['word'] ? 'word' : 'phrase';

    for (let name in learningCategories) {
      if (learningCategories[name]) {
        categories.push(categoryNameEquivalent[name]);
      }
    }

    return {
      learningType,
      categories: categories.join(),
      questionType,
    };
  };

  return {
    learningCategories,
    learningTypes,
    questionTypes,
    showCategories,
    hideSpeakingTypes,
    categoryTitle,
    learningCategoryOnClick,
    learningTypeOnClick,
    questionTypeOnClick,
    getSelectedData,
    setData,
    hasSelected,
  };
};
