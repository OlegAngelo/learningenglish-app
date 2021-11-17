import examReducer from './exam/slice';
import learningLogsReducer from './learningLogs/slice';
import proficiencyReducer from './proficiency/slice';
import unitReducer from './unit/slice';
import trainingReducer from './training/slice';
import userPreferenceReducer from './userPreference/slice';
import checklistReducer from './checklist/slice';
import userListReducer from './users/slice';
import adminReducer from './admin/slice';
import authAdminReducer from './authAdmin/slice';
import newsReducer from './news/slice';
import newsDetailReducer from './newsDetails/slice';
import vimeoPlayerReducer from './vimeoPlayer/slice';
import lecturesReducer from './lectures/slice';
import confirmDialogReducer from './confirmDialog/slice';
import inputWordLinesReducer from './selfLearning/inputWordLines/slice';
import userLecturesReducer from './userLectures/slice';
import userLectureDetailsReducer from './userLectureDetails/slice';
import selfLearningReadingExercise from './selfLearning/reading/exercise/slice';
import selfLearningListeningExercise from './selfLearning/listening/exercise/slice';
import selfLearningReadingList from './selfLearning/reading/list/slice';
import selfLearningListeningList from './selfLearning/listening/list/slice';
import selfLearningAdminListening from './selfLearning/listening/admin/slice';
import selfLearningUserListening from './selfLearning/listening/user/slice';
import selfLearningAdminReading from './selfLearning/reading/admin/slice';
import selfLearningUserReading from './selfLearning/reading/user/slice';

const rootReducer = {
  admin: adminReducer,
  authAdmin: authAdminReducer,
  exam: examReducer,
  learningLogs: learningLogsReducer,
  proficiency: proficiencyReducer,
  training: trainingReducer,
  unit: unitReducer,
  userPreferences: userPreferenceReducer,
  checklist: checklistReducer,
  users:userListReducer,
  news: newsReducer,
  newsDetail: newsDetailReducer,
  vimeoPlayer: vimeoPlayerReducer,
  lectures: lecturesReducer,
  confirmDialog: confirmDialogReducer,
  inputWordLines: inputWordLinesReducer,
  userLectures: userLecturesReducer,
  userLectureDetails: userLectureDetailsReducer,

  // self learning
  selfLearningReadingExercise: selfLearningReadingExercise,
  selfLearningListeningExercise: selfLearningListeningExercise,
  selfLearningReadingList: selfLearningReadingList,
  selfLearningListeningList: selfLearningListeningList,
  adminSLReading: selfLearningAdminReading,
  adminSLListening: selfLearningAdminListening,
  userSLReading: selfLearningUserReading,
  userSLListening: selfLearningUserListening,
};

export default rootReducer;
