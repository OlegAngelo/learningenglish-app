import { useState } from "react";
import questionHelper from '../utils/questionHelper';
import { evaluationText } from '../config/evaluationText';
import { isFromAdmin } from '../utils/IsFromAdmin';
import { useHistory } from "react-router";
import { checkIfFromLecture } from '../utils/isFromLecture';


const useQuestionHandler = () => {
  const history = useHistory();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionSetIndex, setQuestionSetIndex] = useState(0);
  const [totalQuestionCount, setTotalQuestionCount] = useState(0);
  const [Question, setQuestion] = useState(null);
  const [questionData, setQuestionData] = useState([]);
  const [questionItem, setQuestionItem] = useState(null);
  const [isShowCommentaryBubble, setIsShowCommentaryBubble] = useState(true);


  const getNextQuestion = () => {
    const hasNextQuestion = questionIndex < questionData[questionSetIndex].question_count - 1;
    const hasNextCategory = questionData[questionSetIndex + 1] && true;

    let next = false;

    if (hasNextQuestion) {
      next = {
        questionSetIndex: questionSetIndex,
        questionIndex: questionIndex + 1,
      };
    } else if (hasNextCategory) {
      next = {
        questionSetIndex: questionSetIndex + 1,
        questionIndex: 0,
      };
    }

    return {
      data: next && questionData[next.questionSetIndex].questions[next.questionIndex],
      next,
      shouldSwitchCategory: !hasNextQuestion && hasNextCategory,
    };
  };

  const checkIfLastItemInRetry = (retryQuestionLength, next) => {
    const lastItem = 1;

    if ( retryQuestionLength <= lastItem) {
      next(true);
      setTimeout(() => { 
        next(false); 
      }, 1000);
    }
  }


  const formatAnswers = (answers, hint, timerSeconds, question, learningType, category) => {
    let { id } = question;
    let correctAnswer = 
      questionHelper.getCorrectAnswer(
        question,
        learningType,
        category
      );
  
    return [
      ...answers,
      {
        id: id,
        type: category,
        answer_evaluation: questionHelper.getEvaluationTimesUp(category),
        answer_time: timerSeconds,
        choice_id: null,
        is_skipped: true,
        is_correct: timerSeconds ? correctAnswer: false,
        is_used_hint: hint ? true : false,
        input_spelling: null,
        voice_text: null,
        voice_accuracy_rate: null,
      },
    ];
  }
  
  const filterIncorrectAnswers = (correctAnswers, questionData) => {
    let remainingQuestions = questionData.map((type) => {
      let questions = type.questions.filter((data) => !correctAnswers.includes(data.id));
  
      return {
        ...type,
        questions: questions,
        question_count: questions.length,
      };
    });
    
    return remainingQuestions.filter((type) => type.question_count > 0);
  }

  const getCorrectAnswers = (answers) => {
    let correctAnswers = [];

    answers.map((data) => {
      if (data.is_correct || evaluationText.correct.includes(data.answer_evaluation)) {
        correctAnswers.push(data.id);
      }
    });

    return correctAnswers;
  }

  const redirectToEnd =  (payload, dispatch) => {
    const {
      allAnswersAreCorrect,
      prevPath,
      unitId,
      questionType,
      ...lecturePayload
    } = payload;

    const isFromLecture = checkIfFromLecture(questionType);

    if (isFromAdmin) {
      dispatch();
      history.push({
        pathname: `/admin/training/lecture-exam/end`,
        state: {...lecturePayload},
      });
      return;
    }

    if (isFromLecture) {
      dispatch();
      history.push({
        pathname: `/training/lecture-exam/end`,
        state: {...lecturePayload},
      });
      return;
    }
    
    if (allAnswersAreCorrect) {
      dispatch();
      history.push({
        pathname: `/training/muscle-exam/${unitId}/end`,
        state: { prevPath },
      });
      return;
    }
  }


  return {
    checkIfLastItemInRetry,
    questionIndex,
    setQuestionIndex,
    questionSetIndex,
    setQuestionSetIndex,
    totalQuestionCount,
    setTotalQuestionCount,
    Question,
    setQuestion,
    questionData,
    setQuestionData,
    questionItem,
    setQuestionItem,
    isShowCommentaryBubble,
    setIsShowCommentaryBubble,
    getNextQuestion,
    formatAnswers,
    filterIncorrectAnswers,
    getCorrectAnswers,
    redirectToEnd
  }
}

export default useQuestionHandler;
