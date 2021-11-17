import API from './adminBase';
import UserAPI from './base';

const LectureApi = {
  fetchLectureList: (payload) => {
    const options = {
      method: 'GET',
      url: `/admin/lectures?page=${payload.page}`,
      params: {
        ...payload,
      },
    };

    return API.request(options);
  },

  saveLive: (payload) => {
    const options = {
      headers: {
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      method: 'POST',
      url: '/admin/lectures/live',
      data: payload,
    };

    return API.request(options);
  },

  updateLive: (payload) => {
    const options = {
      headers: {
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      method: 'POST',
      url: `admin/lectures/${payload.lecture_id}/details/update`,
      data: payload.formData,
    };

    return API.request(options);
  },
  
  saveOnDemand: (payload) => {
    const options = {
      headers: {
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      method: 'POST',
      url: '/admin/lectures/on-demand',
      data: payload,
    };

    return API.request(options);
  },

  updateOnDemand: (payload) => {
    const options = {
      headers: {
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      method: 'POST',
      url: `/admin/lectures/on-demand/${payload.lectureId}/update`,
      data: payload.formData,
    };

    return API.request(options);
  },

  publishOnDemand: (payload) => {
    const options = {
      method: 'POST',
      url: `/admin/lectures/on-demand/${payload.lectureId}/publish`,
    };

    return API.request(options);
  },

  uploadThumbnail: ({ file, id }) => {
    const formData = new FormData();
    formData.append('image', file);

    const options = {
      method: 'POST',
      url: `/admin/lectures/${id}/upload-image`,
      data: formData,
    };

    return API.request(options);
  },

  fetchLectureExercise: (payload) => {
    const options = {
      method: 'GET',
      url: `admin/lectures/${payload}/exercises`,
    };

    return API.request(options);
  },

  deleteLectureExercise: (payload) => {
    const options = {
      method: 'DELETE',
      url: `admin/lectures/${payload}/exercises`,
    };

    return API.request(options);
  },

  uploadExcerise: ({ file }) => {
    const formData = new FormData();

    formData.append('type', 'phrase');
    formData.append('file', file);

    const options = {
      method: 'POST',
      url: 'admin/lectures/on-demand/upload-exercise',
      data: formData,
    };

    return API.request(options);
  },

  addLectureExcerise: ({ lectureId, exercisePhraseIds, filename }) => {
    const formData = new FormData();

    formData.append('_method', 'PATCH');
    formData.append('exercise_filename', filename);
    exercisePhraseIds.map((id, index) => {
      formData.append(`phrase_ids[${index}]`, id);
    });

    const options = {
      method: 'POST',
      url: `admin/lectures/${lectureId}/exercises`,
      data: formData,
    };

    return API.request(options);
  },

  hardDeleteExcerises: ({ ids }) => {
    const formData = new FormData();

    formData.append('type', 'phrase');
    ids.map((id, key) => {
      formData.append(`ids[${key}]`, id);
    });

    const options = {
      method: 'POST',
      url: 'admin/lectures/on-demand/hard-delete-exercises',
      data: formData,
    };

    return API.request(options);
  },

  createOnDemandVideo: ({ name, size }) => {
    const formData = new FormData();
    formData.append('filename', name);
    formData.append('size', size);

    const options = {
      method: 'POST',
      url: `/admin/lectures/on-demand/create-video`,
      data: formData,
    };

    return API.request(options);
  },
  deleteVimeoVideo: ({ vimeoVideoId }) => {
    const formData = new FormData();
    formData.append('vimeoVideoId', vimeoVideoId);

    const options = {
      method: 'POST',
      url: `/admin/lectures/on-demand/delete-video`,
      data: formData,
    };

    return API.request(options);
  },

  fetchOnDemandVideos: (lectureId) => {
    const options = {
      method: 'GET',
      url: `/admin/lectures/${lectureId}/on-demand/fetch-videos`,
    };

    return API.request(options);
  },

  fetchOnDemandVideoDetails: (videoId) => {
    const options = {
      method: 'GET',
      url: `/admin/lectures/on-demand/${videoId}/fetch-video-details`,
    };

    return API.request(options);
  },

  fetchLecture: ({ lecture_id }) => {
    const options = {
      method: 'GET',
      url: `/admin/lectures/${lecture_id}/details`,
    };

    return API.request(options);
  },

  updateOnDemandVideoDetails: ({ videoId, data }) => {
    const options = {
      method: 'PATCH',
      url: `/admin/lectures/on-demand/${videoId}/update-video-details`,
      data,
    };

    return API.request(options);
  },

  fetchLectureTags: (payload) => {
    const options = {
      method: 'GET',
      url: `/admin/lectures/tags`,
      params: {
        search: payload,
      },
    };

    return API.request(options);
  },

  fetchAdminLectureDetail: (payload) => {
    const options = {
      method: 'GET',
      url: `admin/lectures/${payload}/details`,
    };

    return API.request(options);
  },

  fetchImage: (image) => {
    const options = {
      method: 'GET',
      url: '/lectures/fetch-image',
      responseType: 'blob',
      params: {
        image,
      },
    };

    return API.request(options);
  },

  // User side
  fetchUserLectureList: (payload) => {
    const options = {
      method: 'GET',
      url: '/lectures',
      params: {
        ...payload,
      },
    };

    return UserAPI.request(options);
  },

  fetchUserSLLectureList: (payload) => {
    const options = {
      method: 'GET',
      url: '/lectures/self-learning',
      params: {
        ...payload,
      },
    };

    return UserAPI.request(options);
  },

  getThumbnail: (payload) => {
    const options = {
      method: 'GET',
      url: `/lectures/fetch-image`,
      responseType: 'blob',
      params: {
        image: payload,
      },
    };

    return UserAPI.request(options);
  },

  getAdminThumbnail: (payload) => {
    const options = {
      method: 'GET',
      url: `/lectures/fetch-image`,
      responseType: 'blob',
      params: {
        image: payload,
      },
    };

    return API.request(options);
  },

  fetchUserOnDemandVideos: (lectureId) => {
    const options = {
      method: 'GET',
      url: `/lectures/${lectureId}/on-demand/fetch-videos`,
    };

    return UserAPI.request(options);
  },

  fetchUserLectureDetails: (lectureId) => {
    const options = {
      method: 'GET',
      url: `/lectures/${lectureId}`,
    };

    return UserAPI.request(options);
  },

  adminPreviewLectureDetails: (lectureId) => {
    const options = {
      method: 'GET',
      url: `/lectures/${lectureId}`,
    };

    return API.request(options);
  },

  saveOnDemandLogs: (lectureId) => {
    const options = {
      method: 'POST',
      url: `/lectures/save-on-demand`,
      data: {
        lecture_id: lectureId,
      },
    };

    return UserAPI.request(options);
  },

  saveLiveLogs: (lectureLiveId) => {
    const options = {
      method: 'POST',
      url: `/lectures/save-live`,
      data: {
        lecture_live_id: lectureLiveId,
      },
    };

    return UserAPI.request(options);
  },

  deleteOnDemandVideoDetails: ({ lectureId, onDemandVideoId }) => {
    const options = {
      method: 'DELETE',
      url: `admin/lectures/on-demand/${lectureId}/delete-video-details`,
      data: {
        onDemandVideoId: onDemandVideoId,
      },
    };

    return API.request(options);
  },

  saveOnDemandVideoLogs: ({videoId, videoDuration}) => {
    const options = {
      method: 'POST',
      url: `/lectures/on-demand/video/${videoId}/save-logs`,
      data: {
        videoDuration,
      },
    };

    return UserAPI.request(options);
  },

  updateOnDemandVideoLogs: ({logId, videoDuration, viewingSeconds}) => {
    const options = {
      method: 'POST',
      url: `/lectures/on-demand/video/${logId}/update-logs`,
      data: {
        videoDuration,
        viewingSeconds,
      },
    };

    return UserAPI.request(options);
  },

  deleteLectureDetails: ({ lectureId }) => {
    const options = {
      method: 'DELETE',
      url: `admin/lectures/${lectureId}/delete`,
    };

    return API.request(options);
  },

  saveLiveView: (lectureLiveId) => {
    const options = {
      method: 'POST',
      url: `/lectures/save-live-view`,
      data: {
        lecture_live_id: lectureLiveId,
      },
    };

    return UserAPI.request(options);
  },

};

export default LectureApi;
