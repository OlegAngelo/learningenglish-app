import React from 'react';
import styles from './ObjectiveList.module.css';
import CheckCircleIconBackground from './components/CheckCircleIconBackground';
import DashedCircle from './components/DashedCircle';

const ObjectiveList = ({ title, titleClass, isColoredBG, goalMission }) => {
  const border = 'border-primary-500 border-t border-b border-r flex-1';
  const textColor = 'text-primary-500';

  const isGoalActive = (key) => {
    if (key === 'is_logged_in') {
      return true;
    } else {
      if (goalMission === null) {
        return false;
      } else {
        if (goalMission[key] !== 0) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  return (
    <div>
      <div className={titleClass}>
        <h3 className={`${textColor} ${styles.title}`}>{title}</h3>
      </div>
      <div className={`flex ${styles.objectiveList}`}>
        <div className={`${border} border ${styles.border1} ${styles.box} ${isColoredBG && isGoalActive('is_logged_in') ? styles.checkBg : ''}`}>
          {isGoalActive('is_logged_in') ? <CheckCircleIconBackground /> : <DashedCircle />}
          <p key="goal1" className={`${textColor} ${styles.listText1}`}>ログイン</p>
        </div>
        <div className={`${border} ${styles.box} ${isColoredBG && isGoalActive('trained_count') ? styles.checkBg : ''}`}>
          {isGoalActive('trained_count') ? <CheckCircleIconBackground /> : <DashedCircle />}
          <p key="goal2" className={`${textColor} ${styles.listText2}`}> 気分の選択</p>
        </div>
        <div className={`${border} ${styles.box} ${isColoredBG && isGoalActive('quick_start_count') ? styles.checkBg : ''}`}>
          {isGoalActive('quick_start_count') ? <CheckCircleIconBackground /> : <DashedCircle />}
          <p key="goal3" className={`${textColor} ${styles.listText3}`}>筋トレ<br />
            <span className="font-bold">{isGoalActive('quick_start_count') ? goalMission.quick_start_count : `0`}</span>問
          </p>
        </div>
      </div>
    </div>
  );
};

ObjectiveList.defaultProps = {
  titleClass: '',
  checkClass: '',
  title: '今月の目標',
  goalMission: null
};

export default ObjectiveList;
