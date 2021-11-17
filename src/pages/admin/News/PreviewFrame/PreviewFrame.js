import React from 'react';
import { useParams } from 'react-router';

const PreviewFrame = () => {
  const newsId = useParams().id;

  return (
    <div className="flex w-full justify-center py-px-20 bg-black">
      <iframe
        src={`${process.env.REACT_APP_FRONTEND_URL}/admin/news/${newsId}/preview`}
        title="Admin News Preview"
        style={{width: '375px'}}
      ></iframe>
    </div>
  );
};

export default PreviewFrame;
