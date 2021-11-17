import React from 'react';
import { useParams } from 'react-router';

const Frame = () => {
  const { lectureId, videoId } = useParams();

  return (
    <div className="flex w-full justify-center py-px-20 bg-black">
      <iframe
        src={`${process.env.REACT_APP_FRONTEND_URL}/admin/lectures/${lectureId}/video/${videoId}/preview/raw`}
        title="Admin Lecture Video Preview"
        style={{ width: '375px' }}
      ></iframe>
    </div>
  );
};

export default Frame;
