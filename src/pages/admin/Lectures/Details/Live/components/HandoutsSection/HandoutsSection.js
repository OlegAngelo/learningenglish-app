import React, { Fragment } from 'react';

import AddBoxIcon from '../../../../../../../../shared/icons/AddBoxIcon';
import Button from '../../../../../../../../shared/Button';

const HandoutsSection = ({}) => {
  return (
    <Fragment>
      {/* # Handouts */}
      <div className="mb-px-40">
        <p className="text-base-dark text-18 font-bold mb-px-16">配布物</p>
        <p className="text-adminGray-400 text-12 font-bold mb-px-14">資料</p>

        <Button
          innerClass="cursor-pointer"
          type="blue-square"
          icon={<AddBoxIcon width="16" height="16" />}
          onClick={(e) => e.target.blur()}
        >
          資料をアップロード
        </Button>
      </div>
    </Fragment>
  );
};

export default HandoutsSection;
