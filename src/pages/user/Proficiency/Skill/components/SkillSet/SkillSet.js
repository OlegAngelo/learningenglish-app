import React from 'react';
import Cube from '../../../../../../shared/icons/Cube';
import ListeningIcon from '../../../../../../shared/icons/ListeningIcon';
import MicIcon from '../../../../../../shared/icons/MicIcon';
import BrainIcon from '../../../../../../shared/icons/BrainIcon';
import ModeIcon from '../../../../../../shared/icons/ModeIcon';

import style from './SkillSet.module.css';

const Skills = () => {
  const userCanDoList = [
    {
      color: 'darkBlue',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 6,
      lesson_type: 'reading',
      size: 'md',
      unit_number: 1,
    },
    {
      color: 'red',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 7,
      lesson_type: 'reading',
      size: 'lg',
      unit_number: 1,
    },
    {
      color: 'lightBlue',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 10,
      lesson_type: 'reading',
      size: 'lg',
      unit_number: 1,
    },
    {
      color: 'orange',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 1,
      lesson_type: 'listening',
      size: 'sm',
      unit_number: 1,
    },
    {
      color: 'yellow',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 2,
      lesson_type: 'listening',
      size: 'sm',
      unit_number: 1,
    },
    {
      color: 'lightGreen',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 4,
      lesson_type: 'listening',
      size: 'md',
      unit_number: 1,
    },
    {
      color: 'gray',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 6,
      lesson_type: 'listening',
      size: 'lg',
      unit_number: 1,
    },
    {
      color: 'gray',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 7,
      lesson_type: 'listening',
      size: 'md',
      unit_number: 1,
    },
    {
      color: 'gray',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 10,
      lesson_type: 'listening',
      size: 'lg',
      unit_number: 1,
    },
    {
      color: 'darkBlue',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 6,
      lesson_type: 'speaking',
      size: 'md',
      unit_number: 1,
    },
    {
      color: 'red',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 7,
      lesson_type: 'speaking',
      size: 'lg',
      unit_number: 1,
    },
    {
      color: 'lightBlue',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 10,
      lesson_type: 'speaking',
      size: 'lg',
      unit_number: 1,
    },
    {
      color: 'orange',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 1,
      lesson_type: 'writing',
      size: 'sm',
      unit_number: 1,
    },
    {
      color: 'yellow',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 2,
      lesson_type: 'writing',
      size: 'sm',
      unit_number: 1,
    },
    {
      color: 'lightGreen',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 4,
      lesson_type: 'writing',
      size: 'md',
      unit_number: 1,
    },
    {
      color: 'gray',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 6,
      lesson_type: 'writing',
      size: 'lg',
      unit_number: 1,
    },
    {
      color: 'gray',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 7,
      lesson_type: 'writing',
      size: 'md',
      unit_number: 1,
    },
    {
      color: 'gray',
      description: 'ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる',
      lesson_number: 10,
      lesson_type: 'writing',
      size: 'lg',
      unit_number: 1,
    },
  ];

  const groupBy = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (collection) {
        collection.push(item);
      } else {
        map.set(key, [item]);
      }
    });
    return map;
  }

  const categorized = groupBy(userCanDoList, lesson => lesson.lesson_type);
  const reading = categorized.get('reading');
  const listening = categorized.get('listening');
  const speaking = categorized.get('speaking');
  const writing = categorized.get('writing');

  return (
    <div className="mb-2.5">
      <div className={ `${style.skillsCardDescription}` }>
        <span className="text-18 text-primary-500 font-bold">
          Can-Do一覧
        </span>
      </div>

      <div className="text-16 text-primary-400 font-bold text-center">
        <BrainIcon width="20" height="20" className="fill-primary-400"/> Reading
      </div>
      <div className= {`flex justify-center ${style.skill}` }>
        <div className={`inline-grid gap-x-5 grid-cols-3 justify-center ${style.lessons}`}>
          {reading.map((data, index) => (
            <div
              className="my-2"
              key={index}
            >
              <div className={`${style.icon} rounded-full flex items-center justify-center ${data.color === "gray" ? "bg-background-200" : "bg-primary-50"}`}>
                <Cube size={data.size} color={data.color}/>
              </div>
              <div className={`${style.lessonNumber} font-bold text-11 text-primary-400`}>
                Unit.{data.unit_number} Lesson.{data.lesson_number}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-16 text-primary-400 font-bold text-center">
        <ListeningIcon width="20" height="20" className="mb-1 fill-primary-400"/> Listening
      </div>
      <div className={`flex justify-center ${style.skill}` }>
        <div className={`inline-grid gap-x-5 grid-cols-3 justify-center ${style.lessons}`}>
          {listening.map((data, index) => (
            <div
              className="my-2"
              key={index}
            >
              <div className={`${style.icon} rounded-full flex items-center justify-center ${data.color === "gray" ? "bg-background-200" : "bg-primary-50"}`}>
                <Cube size={data.size} color={data.color}/>
              </div>
              <div className={`${style.lessonNumber} font-bold text-11 text-primary-400`}>
                Unit.{data.unit_number} Lesson.{data.lesson_number}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-16 text-primary-400 font-bold text-center">
        <MicIcon width="11.67" height="15.83" className={`mb-1 fill-primary-400 ${style.mic}`} />Speaking
      </div>
      <div className={`flex justify-center ${style.skill}` }>
        <div className={`inline-grid gap-x-5 grid-cols-3 justify-center ${style.lessons}`}>
          {speaking.map((data, index) => (
            <div
              className="my-2"
              key={index}
            >
              <div className={`${style.icon} rounded-full flex items-center justify-center ${data.color === "gray" ? "bg-background-200" : "bg-primary-50"}`}>
                <Cube size={data.size} color={data.color}/>
              </div>
              <div className={`${style.lessonNumber} font-bold text-11 text-primary-400`}>
                Unit.{data.unit_number} Lesson.{data.lesson_number}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-16 text-primary-400 font-bold text-center">
        <ModeIcon width="23" height="24" className="fill-primary-400"/> Writing
      </div>
      <div className={`flex justify-center` }>
        <div className={`inline-grid gap-x-5 grid-cols-3 justify-center ${style.lessons}`}>
          {writing.map((data, index) => (
            <div
              className="my-2"
              key={index}
            >
              <div className={`${style.icon} rounded-full flex items-center justify-center ${data.color === "gray" ? "bg-background-200" : "bg-primary-50"}`}>
                <Cube size={data.size} color={data.color}/>
              </div>
              <div className={`${style.lessonNumber} font-bold text-11 text-primary-400`}>
                Unit.{data.unit_number} Lesson.{data.lesson_number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
