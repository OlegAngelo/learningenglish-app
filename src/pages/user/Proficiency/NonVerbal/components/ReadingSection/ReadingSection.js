import React from 'react';

import BrainIcon from '../../../../../../shared/icons/BrainIcon';
import Cube from '../../../../../../shared/icons/Cube';

const ReadingSection = () => {
  return (
    <section>
      <div>
        <h3 className="mt-3 text-center">
          <span className="mr-px-7">
            <BrainIcon
              color="#43596D"
              width={20}
              height={20}
            />
          </span>
          <span className="align-middle font-semibold text-primary-400">異文化理解</span>
        </h3>
      </div>

      <div className="flex justify-around mt-5">
        <div className="flex flex-col items-center">
          <div className="bg-primary-50 flex items-center justify-center rounded-full" style={{width: "84px", height: "84px"}}>
            <Cube
              size="md"
              color="darkBlue"
            />
          </div>
          <p className="text-primary-400 text-11 font-semibold mt-2">Unit.1 Lesson.6</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-primary-50 flex items-center justify-center rounded-full" style={{width: "84px", height: "84px"}}>
            <Cube
              size="lg"
              color="red"
            />
          </div>
          <p className="text-primary-400 text-11 font-semibold mt-2">Unit.1 Lesson.6</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-primary-50 flex items-center justify-center rounded-full" style={{width: "84px", height: "84px"}}>
            <Cube
              size="lg"
              color="lightBlue"
            />
          </div>
          <p className="text-primary-400 text-11 font-semibold mt-2">Unit.1 Lesson.6</p>
        </div>
      </div>
    </section>
  );
};

export default ReadingSection;
