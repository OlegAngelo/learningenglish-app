import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

//Middleware
import AuthRoute from './middleware/auth.route';
import AdminAuthRoute from './middleware/admin-auth.route';
import UserRoute from './middleware/user.route';
import CorpRoute from './middleware/corporate.route';

// Admin News
import AdminNewsDetails from '../pages/admin/News/Details/Details'
// import AdminNewsDetailsEdit from '../pages/admin/News/NewsDetailsEdit';

// Admin Classroom
import AdminLecturesList from '../pages/admin/Lectures/List';
import AdminLectureOnDemandDetails from '../pages/admin/Lectures/Details/OnDemand';
import AdminRegisterLive from '../pages/admin/Lectures/Register/Live';
import AdminRegisterOnDemand from '../pages/admin/Lectures/Register/OnDemand';
import AdminLectureLiveDetails from '../pages/admin/Lectures/Details/Live';
import ExercisePreview from '../pages/admin/Lectures/ExercisePreview';
import AdminLecturePreviewVideo from '../pages/admin/Lectures/Previews/Video/Frame';
import AdminLecturePreviewVideoRaw from '../pages/admin/Lectures/Previews/Video';

// Admin Self Learning
import AdminSLReadingList from '../pages/admin/SelfLearning/Reading/List';
import AdminSLReadingDetails from '../pages/admin/SelfLearning/Reading/Details';
import AdminSLListeningList from '../pages/admin/SelfLearning/Listening/List';
import AdminSLListeningSetDetails from '../pages/admin/SelfLearning/Listening/SetDetails';
import AdminSLListeningEditSetDetails from '../pages/admin/SelfLearning/Listening/EditSetDetails';

// Lectures
import Lectures from '../pages/user/Lectures/Index'
import LectureOnDemand from '../pages/user/Lectures/OnDemand';
import LectureLiveDetail from '../pages/user/Lectures/LiveDetail';
import LectureExamCompletion from '../pages/user/Lectures/Exam/Completion';

// User
import Dashboard from '../pages/user/Dashboard';
import Dashboardv2 from '../pages/user/Dashboard/Dashboardv2';
import QuickStart from '../pages/user/Dashboard/QuickStart';

// News
import News from '../pages/user/News/Index';
import NewsBookmarkList from '../pages/user/News/NewsBookmarkList';
import NewsDetails from '../pages/user/News/Details';
import NewsImportantWords from '../pages/user/News/ImportantWords';

import ProficiencyKnowledgeDetail from '../pages/user/Proficiency/Knowledge/Detail';
import ProficiencyKnowledgeList from '../pages/user/Proficiency/Knowledge/List';
import LearningLogs from '../pages/user/LearningLogs';
import ProficiencySkill from '../pages/user/Proficiency/Skill';
import ProficiencyNonVerbal from '../pages/user/Proficiency/NonVerbal';

//Self Learning
import SLReadingList from '../pages/user/SelfLearning/Reading/List';
import SLReadingExercisePreview from '../pages/user/SelfLearning/Reading/Exercise/Preview';
import SLReadingExerciseEnd from '../pages/user/SelfLearning/Reading/Exercise/End';
import SLListeningExerciseEnd from '../pages/user/SelfLearning/Listening/Exercise/End';
import SLReadingIndex from '../pages/user/SelfLearning/Reading/Index';
import SLReadingExerciseResult from '../pages/user/SelfLearning/Reading/Result';
import SLListeningIndex from '../pages/user/SelfLearning/Listening';
import SLListeningCountdown from '../pages/user/SelfLearning/Listening/Exercise/Countdown';

//Self Reading
import SLReadingExercise from '../pages/user/SelfLearning/Reading/Exercise/Main';

//Self Listening
import SLListeningExercise from '../pages/user/SelfLearning/Listening/Exercise/Main';
import SLListeningList from '../pages/user/SelfLearning/Listening/List';

//Authentication
import UserLogin from '../pages/user/Login';
import UserRegister from '../pages/user/Auth/Register';
import UserRegisterVerification from '../pages/user/Auth/RegisterVerification';
import AdminLogin from '../pages/admin/Login';

//Muscle Training
import MuscleTrainingExam from '../pages/user/MuscleTraining/Exam';
import MuscleExamTest from '../pages/user/MuscleTraining/Exam/SpecificQuestion';
import WordPhraseList from '../pages/user/MuscleTraining/Exam/WordPhrasesResult/WordPhraseResult';
import MuscleCourseSettings from '../pages/user/MuscleTraining/Courses/Settings'
import MuscleTrainingCourses from '../pages/user/MuscleTraining/Courses/List';
import MuscleTrainingCourseCheckList from '../pages/user/MuscleTraining/Courses/CheckList';
import MuscleTrainingCourseCheckListCommentary from '../pages/user/MuscleTraining/Courses/CheckList/Commentary';
import MuscleTrainingLearningResult from '../pages/user/MuscleTraining/Exam/Result';
import MuscleTrainingExamCommentary from '../pages/user/MuscleTraining/Exam/Commentary';
import MuscleTrainingCoursePhraseLogs from '../pages/user/MuscleTraining/Courses/PhraseLogs';
import MuscleTrainingCourseWordLogs from '../pages/user/MuscleTraining/Courses/WordLogs';
import MuscleTrainingCourseResultDetail from '../pages/user/MuscleTraining/Courses/ResultDetail';
import MuscleTrainingCourseResult from '../pages/user/MuscleTraining/Courses/Result';
import MuscleTrainingCourseCommentary from '../pages/user/MuscleTraining/Courses/Commentary';
import MuscleTrainingExamCompletion from '../pages/user/MuscleTraining/Exam/Completion';
import MuscleTrainingExamSurvey from '../pages/user/MuscleTraining/Exam/Survey';

// Integrated Learning
// import WordPhrasesLogs from '../pages/user/IntegratedLearning/Courses/WordPhrasesLogs/WordPhrasesLogs';
// import WordPhrasesLogsDetails from '../pages/user/IntegratedLearning/Courses/WordPhrasesLogsDetail/WordPhrasesLogsDetail';

// import ExamResults from '../pages/user/IntegratedLearning/ExamResults';
// import IntegratedLearningStart from '../pages/user/IntegratedLearning/Exam/Start';

// import ListeningExamDetails from '../pages/user/IntegratedLearning/Exam/Listening/Details/Details';
// import IntegratedLearningListeningExplanation from '../pages/user/IntegratedLearning/Exam/Listening/Explanation';
// import LearningExamQuestion from '../pages/user/IntegratedLearning/Exam/Listening/Question';

// import IntegratedLearningReadingExamDetails from '../pages/user/IntegratedLearning/Exam/Reading/Details';
// import ReadingExamContent from '../pages/user/IntegratedLearning/Exam/Reading/Details/ExamContent';
// import ReadingQuestions from '../pages/user/IntegratedLearning/Exam/Reading/Question/'
// import ReadingExplanation from '../pages/user/IntegratedLearning/Exam/Reading/Explanation';

// import SpeakingExamDetails from '../pages/user/IntegratedLearning/Exam/Speaking/Details';
// import SpeakingExamReview from '../pages/user/IntegratedLearning/Exam/Speaking/Review';
// import SpeakingExamQuestion from '../pages/user/IntegratedLearning/Exam/Speaking/Question';
// import SpeakingExamTargetPhraseReview from '../pages/user/IntegratedLearning/Exam/Speaking/TargetPhraseReview';
// import WritingExamDetails from '../pages/user/IntegratedLearning/Exam/Writing/Details';
// import IntegratedLearningExamCompletion from '../pages/user/IntegratedLearning/Exam/Completion/';

// import WritingExamQuestion from '../pages/user/IntegratedLearning/Exam/Writing/Question';
// import LearnedLogsDetail from '../pages/user/IntegratedLearning/Exam/LearnedLogsDetail';
// import IntegratedLearningLearnedLogs from '../pages/user/IntegratedLearning/Exam/LearnedLogs';
// import IntegratedExamResult from '../pages/user/IntegratedLearning/Exam/Result';

// import WritingExamExplanation from '../pages/user/IntegratedLearning/Exam/Writing/Explanation';
// import WordPhrasesExam from '../pages/user/IntegratedLearning/Exam/WordPhrases';
// import WordPhraseDetail from '../pages/user/IntegratedLearning/Exam/WordPhraseDetail';
// import IntegratedLearningLessons from '../pages/user/IntegratedLearning/Lessons/Lessons';
// import IntegratedLearningCourses from '../pages/user/IntegratedLearning/Courses/List/List';
// import IntegratedLearningLogs from '../pages/user/IntegratedLearning/Courses/Logs/Logs';
import Training from '../pages/user/Training'; 

// Admin
import AdminDashboard from '../pages/admin/Dashboard';
import Administrator from '../pages/admin/Administrator';
import AdministratorRegistration from '../pages/admin/AdministratorRegistration';
import Student from '../pages/admin/Student';
import Corporate from '../pages/admin/Corporate/Corporate';
import Account from '../pages/admin/Account';
import AdministratorNewsList from '../pages/admin/News/List/List';
import AdministratorDetail from '../pages/admin/AdministratorDetail/AdministratorDetail';
import AdministratorDetailsPreview from '../pages/admin/News/Preview';
import AdministratorDetailsPreviewFrame from '../pages/admin/News/PreviewFrame';
import AccountChangePassword from '../pages/admin/AccountChangePassword';
import AdminChangePassword from '../pages/admin/ChangePassword';
import LearnerList from '../pages/admin/LearnerList';

// Others
import Theme from '../pages/Theme';

// Learning Environment
import LearningEnvironment from '../pages/user/LearningEnvironment';

import Logout from '../pages/user/Logout';
import Motivation from '../pages/user/Motivation';
import ChangePassword from '../pages/user/ChangePassword';
import SendPasswordResetEmail from '../pages/user/ChangePassword/SendPasswordResetEmail';

// Middlewares
import HomeRoute from './middleware/home.route';
import AdminRoutes from './middleware/admin.route';
import NotFoundRoute from './middleware/notFound.route';
import PageExpired from './middleware/PageExpired';

// FOR TESTING
// Stripe API
import StripeSubscription from '../pages/stripe/user/Plans/List';
import StripeSubscriptionPayment from '../pages/stripe/user/Payment';
import StripePaymentIntent from '../pages/stripe/PaymentIntent/PaymentIntent';
import StripeRefund from '../pages/stripe/Refund';

import StripeCustomers from '../pages/stripe/Customer/Index/Index';
import StripeCustomerDetails from '../pages/stripe/Customer/Show/Show';
import StripeCustomerPaymentMethods from '../pages/stripe/Customer/Card/CustomerCardsPage';
import StripeCustomerPaymentMethodDetails from  '../pages/stripe/Customer/Card/CustomerCardDetails';
import StripeCustomerPaymentMethodEdit from '../pages/stripe/Customer/Card/CustomerCardDetails/EditCustomerCardDetails/EditCustomerCardDetailsPage';

// Admin Stripe
import AdminStripePlans from '../pages/stripe/admin/plan/List';
import AdminStripePlanCreate from '../pages/stripe/admin/plan/Create';

// Corp Admin
import CorpLogin from '../pages/corp/Auth/CorpLogin';
import CorpResetPassword from '../pages/corp/ResetPassword';
import CorpForgotPassword from '../pages/corp/ForgotPassword';
import CorpAdminList from '../pages/corp/Admin/List';
import CorpAdminDetails from '../pages/corp/Admin/Details';
import CorpUserList from '../pages/corp/User/List/Index'
import CorpUserDetails from '../pages/corp/User/Details/Index'
import CorpAdminSampleRegistration from '../pages/corp/Registration/SampleRegistration'

const routes = () => {
  return (
    <Switch>
      <AuthRoute path="/login" component={UserLogin} />
      <AuthRoute path="/register" component={UserRegister} />
      <AuthRoute path="/verify-account" component={UserRegisterVerification} />
      <AuthRoute path="/input-email" component={SendPasswordResetEmail} />
      <UserRoute path="/training/muscle-courses/:id/settings" exact component={MuscleCourseSettings} />
      <UserRoute path="/quick-start/:id" exact component={QuickStart} />
      <Route path="/theme" exact component={Theme} />
      <UserRoute path="/proficiency/knowledge/:category(words|phrases)/:courseId" component={ProficiencyKnowledgeDetail} />
      <UserRoute path="/proficiency/knowledge/:category(words|phrases)" component={ProficiencyKnowledgeList} />
      <UserRoute path="/proficiency/knowledge/check-list/:category(word|phrase)" component={MuscleTrainingCourseCheckList} />
      <UserRoute path="/learning-logs" exact component={LearningLogs} />
      <UserRoute path="/training/muscle-courses" exact component={MuscleTrainingCourses} />
      <UserRoute path="/proficiency/skill/:courseId" exact component={ProficiencySkill} />
      <UserRoute path="/proficiency/non-verbal/:courseId" exact component={ProficiencyNonVerbal} />
      <UserRoute path="/training/muscle-exam/commentary/:id" exact component={MuscleTrainingExamCommentary} />
      <UserRoute path="/training/muscle-courses/commentary/:id" exact component={MuscleTrainingCourseCommentary} />
      <UserRoute path="/training/muscle-courses/check-list/commentary/:id/:category(word|phrase)" exact component={MuscleTrainingCourseCheckListCommentary} />
      <UserRoute path="/training/muscle-exam/:unitId/survey" exact component={MuscleTrainingExamSurvey} />
      <UserRoute path="/training/muscle-exam/:unitId/end" exact component={MuscleTrainingExamCompletion} />
      <UserRoute path="/training/lecture-exam/end" exact component={LectureExamCompletion} />
      <UserRoute path="/training/muscle-exam" exact component={MuscleTrainingExam} />
      <UserRoute path="/training/muscle-exam/:unitId" exact component={MuscleTrainingExam} />
      <UserRoute path="/training/muscle-result/:id" exact component={MuscleTrainingLearningResult} />
      <UserRoute path="/training/muscle-courses/:courseId/lesson-log/result/:questionId" exact component={MuscleTrainingCourseResultDetail} />
      <UserRoute path="/training/muscle-courses/:courseId/lesson-log/result" exact component={MuscleTrainingCourseResult} />
      <UserRoute path="/training/muscle-courses/:courseId/lesson-log/phrases" exact component={MuscleTrainingCoursePhraseLogs} />
      <UserRoute path="/training/muscle-courses/:courseId/lesson-log/words" exact component={MuscleTrainingCourseWordLogs} />

      <UserRoute path="/training/muscle-result/question/:questionId" exact component={WordPhraseList} />
      <UserRoute path="/training" exact component={Training} />

      <UserRoute path="/motivation" exact component={Motivation} />
      <UserRoute path="/learning-environment" component={LearningEnvironment} />

      <UserRoute path="/news/details/important-words" component={NewsImportantWords} />
      <UserRoute path="/news/:id/details" component={NewsDetails} name="news-details" />
      <UserRoute path="/news/:tab(science-health|national|world|business-tech)" exact component={News} />
      <UserRoute path="/news/bookmarks" exact component={NewsBookmarkList} />
      <UserRoute path="/news" exact component={News} />

      <UserRoute path="/lectures/:tab(live|grammar|listening|reading|speaking|writing|culture|tips)" exact component={Lectures} />
      <UserRoute path="/lectures" exact component={Lectures} />
      <UserRoute path="/lectures/:id/live" exact component={LectureLiveDetail} />
      <UserRoute path="/lectures/:id/on-demand/:tab(overview|video-list|handouts|comment)" exact component={LectureOnDemand} />

      {
        (process.env.REACT_APP_ENV !== 'production') &&
         <UserRoute path="/training/muscle-exam-test/:learningType(word|phrase)/:id/:category" exact component={MuscleExamTest} />
      }

      {
        (process.env.REACT_APP_ENV === 'production') 
          ? <UserRoute path="/" exact component={Dashboard} /> 
          : <UserRoute path="/" exact component={Dashboardv2} />
      }

      {/* Self Learning */}
      <UserRoute path="/self-learning/reading/:id/exercise" exact component={SLReadingExercise} />
      <UserRoute path="/self-learning/listening/:id/exercise" exact component={SLListeningExercise} />
      <UserRoute path="/self-learning/reading/:levelId/list" exact component={SLReadingList} />
      <UserRoute path="/self-learning/reading/:id/preview" exact component={SLReadingExercisePreview} />
      <UserRoute path="/self-learning/reading/:id/end" exact component={SLReadingExerciseEnd} />
      <UserRoute path="/self-learning/reading/" exact component={SLReadingIndex} />
      <UserRoute path="/self-learning/reading/:id/result" exact component={SLReadingExerciseResult} />
      <UserRoute path="/self-learning/listening/:id/end" exact component={SLListeningExerciseEnd} />
      <UserRoute path="/self-learning/listening/" exact component={SLListeningIndex} />
      <UserRoute path="/self-learning/listening/:levelId/list" exact component={SLListeningList} />

      {/* old routes */}
      {/* <UserRoute path="/muscle-training/question/:type" exact component={MuscleTrainingQuestion} />
      <UserRoute path="/muscle-training/word-selection/question" exact component={WordSelection} /> */}

      {/* commented out routes */}
      {/* <UserRoute path="/training/integrated/exam/:id/:category(listening|reading)/result/" exact component={ExamResults} />
      <UserRoute path="/training/integrated-courses/:id" exact component={IntegratedLearningLessons} />
      <UserRoute path="/training/integrated-courses/:courseId/lesson-logs/:lessonId/(words|phrases)/:questionId" exact component={WordPhrasesLogsDetails} />
      <UserRoute path="/training/integrated-courses/:courseId/lesson-logs/:lessonId/:category(words|phrases)" exact component={WordPhrasesLogs} />
      <UserRoute path="/training/integrated-courses/:courseId/lesson-logs/:lessonId" exact component={IntegratedLearningLogs} />
      <UserRoute path="/training/integrated/:category(listening|reading)/word-phrases" exact component={WordPhrasesExam} />
      <UserRoute path="/training/integrated-exam/:category(listening|reading)/word-phrases" component={WordPhraseDetail} />
      <UserRoute path="/training/integrated-courses" exact component={IntegratedLearningCourses} />
      <UserRoute path="/training/integrated-exam/:type/end" exact component={IntegratedLearningExamCompletion} />
      <UserRoute path="/training/integrated-exam/:type/start" exact component={IntegratedLearningStart} />
      <UserRoute path="/training/integrated-exam/listening" exact component={ListeningExamDetails} />
      <UserRoute path="/training/integrated-exam/listening/:id" exact component={LearningExamQuestion} />
      <UserRoute path="/training/integrated-exam/listening/:id?scenario=failed" exact component={LearningExamQuestion} />
      <UserRoute path="/training/integrated-exam/listening/:id/explanation" exact component={IntegratedLearningListeningExplanation} />
      <UserRoute path="/training/integrated-exam/reading" exact component={IntegratedLearningReadingExamDetails} />
      <UserRoute path="/training/integrated-exam/reading/:id/content" exact component={ReadingExamContent} />
      <UserRoute path="/training/integrated-exam/reading/:questionId/explanation" exact component={ReadingExplanation} />
      <UserRoute path="/training/integrated-exam/speaking" exact component={SpeakingExamDetails} />
      <UserRoute path="/training/integrated-exam/speaking/:id(0|1|2)" exact component={SpeakingExamQuestion} />
      <UserRoute path="/training/integrated-exam/speaking/:id/target-phrase-review" exact component={SpeakingExamTargetPhraseReview} />
      <UserRoute path="/training/integrated-exam/speaking/:id/review" exact component={SpeakingExamReview} />
      <UserRoute path="/training/integrated-exam/writing" exact component={WritingExamDetails} />
      <UserRoute path="/training/integrated-result/:id/learned-logs" exact component={IntegratedLearningLearnedLogs} />
      <UserRoute path="/training/integrated-result/:id/learned-logs/question/:questionId" exact component={LearnedLogsDetail} />
      <UserRoute path="/training/integrated-result/:id" exact component={IntegratedExamResult} />
      <UserRoute path="/training/integrated-exam/writing/:id" exact component={WritingExamQuestion} />
      <UserRoute path="/training/integrated-exam/writing/:id/explanation" exact component={WritingExamExplanation} /> */}

      <Route path="/logout" component={Logout} />
      <Route path="/first-login" component={ChangePassword} />
      <Route path="/reset/password" component={ChangePassword} />
      <Route path="/admin/reset/password" exact component={AdminChangePassword} />

      <AdminAuthRoute path="/admin/login" component={AdminLogin} />
      {/* <AdminRoutes path="" exact component={} /> */}
      <AdminRoutes path="/admin" exact component={AdminDashboard} />
      <AdminRoutes path="/admin/administrators" exact component={Administrator} />
      <AdminRoutes path="/admin/administrators/register" exact component={AdministratorRegistration} />
      <AdminRoutes path="/admin/users/:id" exact component={Student} />
      <AdminRoutes path="/admin/corporates/:id/:tab(basic-information|learning-log)" hasForm exact component={Corporate} />
      <AdminRoutes path="/admin/account" exact component={Account} />
      <AdminRoutes path="/admin/news" exact component={AdministratorNewsList} />
      <AdminRoutes path="/admin/administrators/:id/details" exact component={AdministratorDetail} />
      <AdminRoutes path="/admin/news/details/:id/preview" exact component={AdministratorDetailsPreviewFrame} />
      <AdminRoutes path="/admin/news/:id/preview" exact component={AdministratorDetailsPreview} />
      <AdminRoutes path="/admin/account/:id/changepassword" exact component={AccountChangePassword} />
      <AdminRoutes path="/admin/users" exact component={LearnerList} />
      <AdminRoutes path="/admin/news/details/:id" hasForm exact component={AdminNewsDetails} />
      {/* <AdminRoutes path="/admin/news/details/:id/edit" exact component={AdminNewsDetailsEdit} /> */}

      <AdminRoutes path="/admin/lectures" exact component={AdminLecturesList} />
      <AdminRoutes path="/admin/lectures/:id/details" hasForm exact component={AdminLectureLiveDetails} />
      <AdminRoutes path="/admin/lectures/on-demand/details/:id/:tab(overview|video-list|exercises|video-list-edit)/:videoId?/(edit)?" hasForm exact component={AdminLectureOnDemandDetails} />
      <AdminRoutes path="/admin/lectures/register/live" hasForm exact component={AdminRegisterLive} />
      <AdminRoutes path="/admin/lectures/register/on-demand/:tab(overview|video-list|exercises)" hasForm exact component={AdminRegisterOnDemand} />
      <AdminRoutes path="/admin/lectures/register/on-demand/:id/:tab(overview|video-list|exercises)" hasForm exact component={AdminRegisterOnDemand} />
      
      {/* Lecture excercise */}
      <AdminRoutes path="/admin/lectures/exercise-preview" exact component={ExercisePreview} />
      <AdminRoutes path="/admin/training/muscle-exam/:unitId" exact component={MuscleTrainingExam} />
      <AdminRoutes path="/admin/training/lecture-exam/end" exact component={LectureExamCompletion} />
      <AdminRoutes path="/admin/lectures/:lectureId/video/:videoId/preview" exact component={AdminLecturePreviewVideo} />
      <AdminRoutes path="/admin/lectures/:lectureId/video/:videoId/preview/raw" exact component={AdminLecturePreviewVideoRaw} />

      {/* Lecture excercise */}
      <AdminRoutes path="/admin/reading" exact component={AdminSLReadingList} />
      <AdminRoutes path="/admin/reading/details/:readingId" exact component={AdminSLReadingDetails} />
      <AdminRoutes path="/admin/listening" exact component={AdminSLListeningList} />
      <AdminRoutes path="/admin/listening/set/:id" exact component={AdminSLListeningSetDetails} />
      <AdminRoutes path="/admin/listening/phrase/:id/edit" exact component={AdminSLListeningEditSetDetails} />

      {/* Corporate Routes */}

      {/* Unauthenticated */}
      <Route path="/corp/login" exact component={CorpLogin} />
      <Route path="/corp/forgot/password" component={CorpForgotPassword} />
      <Route path="/corp/reset/password" component={CorpResetPassword} />

      <CorpRoute path="/corp" exact component={AdminDashboard}/> 
      <CorpRoute path="/corp/admins" exact component={CorpAdminList}/>
      <CorpRoute path="/corp/admins/:id/details" exact component={CorpAdminDetails}/>
      <CorpRoute path="/corp/users" exact component={CorpUserList} />
      <CorpRoute path="/corp/users/:id" exact component={CorpUserDetails} />
      
      {/* FOR TESTING */}
      {/* Admin Stripe API */}
      <AdminRoutes path="/admin/stripe/plans" exact component={AdminStripePlans} />
      <AdminRoutes path="/admin/stripe/plan/create" exact component={AdminStripePlanCreate} />

      {/* Stripe API */}
      <UserRoute path="/stripe/:tab(plans|subscriptions)" exact component={StripeSubscription} />
      <UserRoute path="/stripe/plan/:id/payment" exact component={StripeSubscriptionPayment} />

      <Route path="/stripe/payment-intent" exact component={StripePaymentIntent} />
      <Route path="/stripe/refund" exact component={StripeRefund} />

      <Route path="/stripe/customers" exact component={StripeCustomers} />
      <Route path="/stripe/customer/:custId" exact component={StripeCustomerDetails} />
      <Route path="/stripe/customer/:custId/payment-methods" exact component={StripeCustomerPaymentMethods} />
      <Route path="/stripe/customer/:custId/payment-method/:pmId" exact component={StripeCustomerPaymentMethodDetails} />
      <Route path="/stripe/customer/:custId/payment-method/:pmId/edit" exact component={StripeCustomerPaymentMethodEdit} />

      {/* Corporate Routes */}
      {/* FIXME should change AdminDashboard to CorpAdminDasboard */}
      <CorpRoute path="/corp" exact component={AdminDashboard}/>
      <CorpRoute path="/corp/sample/registration" exact component={CorpAdminSampleRegistration}/> 
      <Route path="/corp/users" exact component={CorpUserList} />
      <Route path="/corp/reset-password" component={CorpResetPassword} />

      <Route path="/419" component={PageExpired} />
      <NotFoundRoute />
    </Switch>
  );
};

export default withRouter(routes);
