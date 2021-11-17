import { DateTime } from 'luxon';
import moment from 'moment';

export const getTimeAgo = (lecture) => {
  const finalPublishedDate = lecture.publish_at;

  let date = null;
  if (lecture.type_id !== 3) { // ID 3 in lecture_types means planning to live
    let now = moment(new Date()).add(1, 'hours');
    let publishedAt = moment(finalPublishedDate);

    if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Tokyo') {
      now = moment(new Date());
    }

    if (lecture.is_live && lecture.type_id == 1) {
      publishedAt = moment(lecture.lecture_lives.start_at);
    }

    let duration = moment.duration(now.diff(publishedAt));
    let days = Math.floor(duration.asDays());
    let minutes = Math.floor(duration.asMinutes());
    let hours = Math.floor(duration.asHours());

    if (days == 0) {
      date = hours >= 1 ? `${Math.floor(hours)}時間前` : `${Math.floor(minutes)}分前`;
    } else {
      date = `${Math.floor(days)}日前`;
    }

    if (lecture?.is_live) date = `${date}配信開始`;
  } else {
    date = DateTime.fromFormat(
      lecture.lecture_lives.start_at,
      'yyyy-LL-dd HH:mm:ss'
    ).toFormat('yyyy/LL/dd  HH:mm');
    date = `${date}~ 配信予定`;
  }
  return date;
};

export const handleInterruptedVideo = (isSwitchVideo = false) => {
  const isVideoInterruptedKey = localStorage.getItem('is_video_interrupted') ?? null;
  let videoLeftSecondsData = localStorage.getItem('video_left_seconds_data') ?? null;
  if (videoLeftSecondsData) {
    if (!isSwitchVideo && !isVideoInterruptedKey) return null;
    
    videoLeftSecondsData = JSON.parse(videoLeftSecondsData);
    let payload = {
      'logId': videoLeftSecondsData.videoLogId,
      'videoDuration': parseInt(videoLeftSecondsData.videoDuration),
      'viewingSeconds': parseInt(videoLeftSecondsData.viewingSeconds),
    };
    return payload;
  }
  return null;
};
