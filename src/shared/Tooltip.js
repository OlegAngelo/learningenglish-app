import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

const Tooltip = () => {
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <ReactTooltip
      id="toolTip"
      place="top"
      effect="solid"
      html={true}
      backgroundColor="#C9EBE8"
      textColor="black"
      className="custom-tooltip"
      arrowColor="transparent"
      offset={{ top: -10, left: 5 }}
      clickable={true}
    />
  );
};

export default Tooltip;
