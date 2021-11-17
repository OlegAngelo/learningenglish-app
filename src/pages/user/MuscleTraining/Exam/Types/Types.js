import SemanticSelectionQuestion from './SemanticSelectionQuestion';
import ListeningSelectionQuestion from './ListeningSelectionQuestion/ListeningSelectionQuestion';
import AudioTypingQuestion from './AudioTypingQuestion';
import SentenceTypingQuestion from './SentenceTypingQuestion';
import WordSelectionQuestion from './WordSelectionQuestion';
import AudioWordSelectionQuestion from './AudioWordSelectionQuestion';
import TextTypingQuestion from './TextTypingQuestion';
import WordTypingQuestion from './WordTypingQuestion';
import WordTranslationSelectionQuestion from './WordTranslationSelectionQuestion';
import InstantUtteranceQuestion from './InstantUtteranceQuestion';
import VoiceWordSelectionQuestion from './VoiceWordSelectionQuestion/VoiceWordSelectionQuestion';
import AudioEnglishWordSelectionQuestion from './AudioEnglishWordSelectionQuestion';
import SentenceReadingQuestion from './SentenceReadingQuestion';
import ShadowingQuestion from './SentenceReadingQuestion';
import OverlappingQuestion from './SentenceReadingQuestion';
import WordEnglishSelectionQuestion from './WordEnglishSelectionQuestion';
import PhraseEnglishSelectionQuestion from './PhraseEnglishSelectionQuestion';
import PhraseVoiceListening from './PhraseVoiceListening';

const Types = {
  'reading': SemanticSelectionQuestion, // 意味選択
  'listening': ListeningSelectionQuestion, // 音声意味選択
  'audio-typing': AudioTypingQuestion, // 音声スペル
  'instant-composition': SentenceTypingQuestion, // 瞬間作文
  'vacancy-filling-problem': WordSelectionQuestion, // 空所補充選択
  'audio-word-selection': AudioWordSelectionQuestion, // 音声意味選択
  'spelling': TextTypingQuestion, // 空所補充タイピング
  'word-typing': WordTypingQuestion, // 空所補充タイピング
  'word-translation-selection': WordTranslationSelectionQuestion, // 意味選択
  'instant-utterance': InstantUtteranceQuestion, // 瞬間発話
  'english-speech-recognition': VoiceWordSelectionQuestion, // 発話型英語選択
  'sentence-reading': SentenceReadingQuestion, // 音声発話
  'shadowing': ShadowingQuestion,
  'overlapping': OverlappingQuestion,
  'english-selection': WordEnglishSelectionQuestion, // 英語選択
  'voice-listening': AudioEnglishWordSelectionQuestion, // 音声リスニング
  'phrase-english-selection': PhraseEnglishSelectionQuestion, // 英語選択
  'phrase-voice-listening': PhraseVoiceListening, // 音声リスニング
};

const questionsWithoutTimer = [
  'overlapping',
  'sentence-reading',
  'shadowing',
];

const questionsWithAudio = [
  'audio-word-selection',
  'listening',
  'phrase-voice-listening',
  'audio-typing',
  'voice-listening',
];

// Please add here the questions which have selection/choices
const questionsWithSelections = [
  'reading',
  'listening',
  'word-selection',
  'audio-word-selection',
  'word-translation-selection',
  'english-speech-recognition',
  'voice-listening',
  'phrase-english-selection',
  'english-selection',
  'phrase-voice-listening',
  'vacancy-filling-problem',
];

const questionsWithTyping = [
  'audio-typing',
  'word-typing',
];

export const getQuestionComponent = (selectedType) => {
  return Types[selectedType];
};

export const judgeHasTimeLimit = (selectedType) => {
  return !questionsWithoutTimer.includes(selectedType);
};

export const questionAudioType = (selectedType) => {
  return questionsWithAudio.includes(selectedType);
};

export const isQuestionWithSelection = (selectedType) => {
  return questionsWithSelections.includes(selectedType);
};

export const isQuestionWithSelectionOrTyping = (selectedType) => {
  return questionsWithSelections.includes(selectedType) || questionsWithTyping.includes(selectedType);
};
