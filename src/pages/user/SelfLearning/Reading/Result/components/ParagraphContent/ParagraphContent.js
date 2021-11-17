import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

import Tooltip from '../../../../../../../shared/Tooltip';

import { englishContent, jpContent } from './computed';

import '../ChunkContent/style.css';

const ParagraphContent = ({ result, chunkTranslation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  useEffect(() => {
    if (!result) return;

    setTitle(result.sentence.title);
    const script = result.sentence.script;
    const chunks = result.log_chunks;
    const importantWordsFromDB = result.sentence.words;

    let content =
      chunkTranslation === 'en'
        ? englishContent(script, chunks, importantWordsFromDB)
        : jpContent(script, chunks);

    setContent(content);
  }, [result, chunkTranslation]);

  return (
    <div className="mb-px-16 m-px-10 pb-px-24 p-px-16 bg-basic-400">
      <Tooltip />

      <div className="text-basic-100 font-bold text-18 text-center">{title}</div>
      <div id="chunk-content" className="pt-px-24 text-14">
        {content}
      </div>
    </div>
  );
};

export default ParagraphContent;
