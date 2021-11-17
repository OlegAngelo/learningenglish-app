import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import Home from '../pages/user/Home';
import Theme from '../pages/Theme';
import LaunchPage from '../pages/user/Dashboard/LaunchPage';
import IntegratedLearningLessons from '../pages/user/IntegratedLearningLessons';
import IntegratedLearningCourses from '../pages/user/IntegratedLearningCourses';
import VoiceQuestionnaire from '../pages/user/VoiceQuestionnaire';
import IntegratedLearningSolution from '../pages/user/IntegratedLearningSolution';
import IntegratedLearningLog from '../pages/user/IntegratedLearningLog';
import LearningResult from '../pages/user/LearningResult';
import LearningLogWordProficiency from '../pages/user/LearningLogWordProficiency';
import KnowledgeProficiency from '../pages/user/KnowledgeProficiency';
import LearningLog from '../pages/user/LearningLog';

// Middlewares
import HomeRoute from './middleware/home.route';
import NotFoundRoute from './middleware/notFound.route';

const TestRa = () => {
  return (
    <div>
      asdasdasd
    </div>
  )
}

const routes = () => {
  return (
    <Route>
      <Route exact component={TestRa} />
    </Route>
  );
}

export default adminRoutes;
