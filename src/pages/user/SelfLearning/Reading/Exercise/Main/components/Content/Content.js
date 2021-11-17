import React, { Fragment } from 'react';

import Preview from '../Preview';
import ChunkReading from '../ChunkReading';
import ReadingResult from '../ReadingResult';
import CheckPoint from '../CheckPoint/CheckPoint';

const Content = ({contentType, setContentType}) => {
  return (
    <Fragment>
      {contentType === 'preview' && <Preview setContentType={setContentType} />}
      {contentType === 'reading' && <ChunkReading setContentType={setContentType} />}
      {contentType === 'checkpoint' && <CheckPoint setContentType={setContentType} />}
      {contentType === 'result' && <ReadingResult setContentType={setContentType} />}
    </Fragment>
  );
};

export default Content;
