export const getLectureTitle = (lecture) => {
  if (lecture.lecture_live) {
    return lecture.lecture_live.lecture.title;
  } else {
    return lecture.lecture.title;
  }
};

export const getLectureGenre = (lecture) => {
  if (lecture.lecture_live) {
    return lecture.lecture_live.lecture.lecture_genre.name;
  } else {
    return lecture.lecture.lecture_genre.name;
  }
};

export const getLectureGenre2 = (lecture) => {
  if (lecture.lecture_live) {
    return lecture.lecture_live.lecture.lecture_genre2?.name;
  } else {
    return '';
  }
};

export const getLectureLevel = (lecture) => {
  if (lecture.lecture_live) {
    return lecture.lecture_live.lecture.level;
  } else {
    return lecture.lecture.level;
  }
};
