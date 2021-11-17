import React, { useEffect } from 'react';

import Footer from '../../../shared/Footer/Footer';
import Header from '../../../shared/Header/Header';
import BookIcon from '../../../shared/icons/BookIcon';
import DeviceIcon from '../../../shared/icons/DeviceIcon';
import NotebookIcon from '../../../shared/icons/NotebookIcon';
import SchoolPathIcon from '../../../shared/icons/SchoolPathIcon';
import TimerIcon from '../../../shared/icons/TimerIcon';
import BrainIcon from '../../../shared/icons/BrainIcon';
import ListenIcon from '../../../shared/icons/ListenIcon';
import TrainingItem from './components/TrainingItem/TrainingItem';

const Training = () => {
  const trainings = [
    {
      title: '自習室',
      imageSrc: '/images/StudyRoom.svg',
      options : [
        {
          icon: <TimerIcon />,
          name: '筋トレ',
          linkTo: '/training/muscle-courses',
        }, 
        {
          icon: <BrainIcon height='24' color='white' className='my-1 mx-1' />,
          name: 'Reading',
          linkTo: '/self-learning/reading',
        },
        {
          icon: <ListenIcon height='24' color='white' className='my-1 ml-1 mr-1.5' />,
          name: 'Listening',
          linkTo: '/self-learning/listening',
        }
      ]
    },
    {
      title: 'ホール',
      imageSrc: '/images/Classroom.svg',
      options : [
        {
          icon: <DeviceIcon color='white' />,
          name: '大教室',
          linkTo: '/lectures',
        }
      ]
    },
    {
      title: '図書館',
      imageSrc: '/images/Library.svg',
      options : [
        {
          icon: <NotebookIcon color='white' />,
          name: 'ニュース',
          linkTo: '/news',
        },
      ]
    },
  ];

  useEffect(() => {
    localStorage.removeItem('breadcrumbs')
  }, [])

  return (
    <div className="bg-white pb-px-76">
      <Header hasBack={false} title="トレーニング" />
      <div className="mt-px-14">
        {trainings.map((training, index) => (
          <TrainingItem
            key={index}
            index={index}
            title={training.title}
            imageSrc={training.imageSrc}
            options={training.options}
          />
        ))}
      </div>
      <div className="fixed left-0 right-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Training;
