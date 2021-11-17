import React from 'react';

import MicIcon from '../../../../../../shared/icons/MicIcon';
import Cube from '../../../../../../shared/icons/Cube';

const SpeakingSection = () => {
  return (
    <section>
      <div>
        <h3 className="mt-10 text-center">
          <span className="mr-px-7">
            <MicIcon
              color="#43596D"
              height={16}
              width={16}
            />
          </span>
          <span className="align-middle font-semibold text-primary-400">非言語</span>
        </h3>
      </div>

      <div className="flex justify-around mt-4">
        <div className="flex flex-col items-center">
          <div className="bg-primary-50 flex items-center justify-center rounded-full" style={{width: "84px", height: "84px"}}>
            <Cube
              size="sm"
              color="orange"
            />
          </div>
          <p className="text-primary-400 text-11 font-semibold mt-2">Unit.1 Lesson.6</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-primary-50 flex items-center justify-center rounded-full" style={{width: "84px", height: "84px"}}>
            <Cube
              size="sm"
              color="yellow"
            />
          </div>
          <p className="text-primary-400 text-11 font-semibold mt-2">Unit.1 Lesson.6</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-primary-50 flex items-center justify-center rounded-full" style={{width: "84px", height: "84px"}}>
            <Cube
              size="md"
              color="lightGreen"
            />
          </div>
          <p className="text-primary-400 text-11 font-semibold mt-2">Unit.1 Lesson.6</p>
        </div>
      </div>

      <div className="flex justify-around mt-7">
        <div className="flex flex-col items-center">
          <div className="bg-primary-50 flex items-center justify-center rounded-full" style={{width: "84px", height: "84px"}}>
            <Cube
              size="lg"
              color="violet"
            />
          </div>
          <p className="text-primary-400 text-11 font-semibold mt-2">Unit.1 Lesson.6</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-primary-50 flex items-center justify-center rounded-full" style={{width: "84px", height: "84px"}}>
            <Cube
              size="md"
              color="pink"
            />
          </div>
          <p className="text-primary-400 text-11 font-semibold mt-2">Unit.1 Lesson.6</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-primary-50 flex items-center justify-center rounded-full" style={{width: "84px", height: "84px"}}>
            <Cube
              size="lg"
              color="darkGreen"
            />
          </div>
          <p className="text-primary-400 text-11 font-semibold mt-2">Unit.1 Lesson.6</p>
        </div>
      </div>

    </section>
  );
};

export default SpeakingSection;
