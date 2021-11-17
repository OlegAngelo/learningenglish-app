import React from 'react';

const Course = ({ image, title, description }) => {
  return (
    <div className="bg-primary-50 bg-opacity-50 relative font-hiragino-kaku" style={{ height: '80px', marginTop: '3px' }} >
      <div className="flex">
        <img src={process.env.PUBLIC_URL + image} alt="person" className="object-cover w-28 h-20" style={{ padding: '10px 9.5px 10px 20px' }} />
        <div className="mt-2 text-basic-100">
          <span className="font-theme-regular text-12">
            {title}
          </span>
          <span className="block font-theme-bold" style={{ fontSize: '16px' }}>
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Course;
