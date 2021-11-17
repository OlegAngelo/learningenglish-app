import { DateTime } from 'luxon';

export const getUrlBasedOnLastTrainingTime = (lastMotivationTimestamp, trainingRoute, lessonType=null) => {
  let route = '';

  if (lessonType !== null) {
    localStorage.setItem('selected_lesson_type', lessonType);
  }

  if (lastMotivationTimestamp !== null && Object.keys(lastMotivationTimestamp).length !== 0) {
    let lastTimestamp = DateTime.fromISO(lastMotivationTimestamp).setZone(
      'Asia/Tokyo'
    );
    let now = DateTime.now().setZone('Asia/Tokyo');
    let difference = now.diff(lastTimestamp, ['hours']).toObject();
    route = difference.hours > 4 ? `/motivation` : trainingRoute;
  } else {
    route = `/motivation`;
  }

  localStorage.setItem('env_next_page', trainingRoute);
  return route;
};
