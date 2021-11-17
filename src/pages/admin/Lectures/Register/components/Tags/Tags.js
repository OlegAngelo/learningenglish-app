import React, { useEffect, useState, useCallback, useRef } from 'react';
import _ from 'lodash';

import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import AddBoxIcon from '../../../../../../shared/icons/AddBoxIcon';
import RemoveIcon from '../../../../../../shared/icons/RemoveIcon';

import lectureApi from '../../../../../../api/LectureApi';

import style from './Tags.module.css';

const Tags = ({
  max = 5,
  defaultValues = [],
  tags,
  rules,
  serverErrors,
  errors,
  setTags,
  register,
  setFormValue,
}) => {
  const [tagAddButtonDisable, setTagAddButtonDisable] = useState(false);
  const [indexFocus, setIndexFocus] = useState(-1);
  const [lecturesTags, setLecturesTags] = useState([]);
  const [searchStatus, setSearchStatus] = useState('none');
  const tagValueRef = useRef(tags);
  const tagInputRef = useRef();
  const debounce = _.debounce;

  // handle when input tag focus in
  const handleTagOnFocus = (index) => {
    setIndexFocus(index);
  };

  // handle when input tag focus out
  const handleTagOnBlur = (index) => {
    setIndexFocus(-1);
    setTimeout(() => {
      // automatically remove newly added tag if it is empty
      if (!tagValueRef.current[index]) {
        handleRemoveTag(index);
        return;
      }

      // automatically remove newly added tag if it has duplicate
      const lastIndexValue = tagValueRef.current[index];
      if (
        tagValueRef.current.lastIndexOf(lastIndexValue) !== index ||
        tagValueRef.current.indexOf(lastIndexValue) !== index
      )
        handleRemoveTag(tagValueRef.current.lastIndexOf(lastIndexValue));
    }, 200);
  };

  const handleAddTag = () => {
    callApiSearch('');
    setTimeout(() => tagInputRef.current.focus(), 20);
    setTags(tags.concat(['']));
  };

  const handleRemoveTag = (id) => {
    for (let i = id + 1; i <= max; i++) {
      if (i === max) break;
      setFormValue(`tag${i}`, tags[i], { shouldValidate: true, shouldDirty: true });
    }

    setFormValue(`tag${tags.length}`, '', { shouldValidate: true, shouldDirty: true });
    let newTags = tagValueRef.current.slice();
    newTags.splice(id, 1);
    setTags(newTags);

    tagValueRef.current = newTags;
  };

  const handleOnSearchApi = useCallback(
    debounce((event) => {
      callApiSearch(event.target.value);
    }, 1000),
    []
  );

  const handleTagOnChange = (event, id) => {
    setSearchStatus('searching');
    handleOnSearchApi(event);

    const newTags = tags.slice();
    newTags[id] = event.target.value;
    setTags(newTags);

    tagValueRef.current = newTags;
  };

  const handleSelectTag = (value, id) => {
    setFormValue(`tag${id + 1}`, value, { shouldDirty: true });

    const newTags = tags.slice();
    newTags[id] = value;
    setTags(newTags);

    tagValueRef.current = newTags;
  };

  const callApiSearch = (param = '') => {
    if (!!lecturesTags.length && param === '') return;

    setSearchStatus('searching');
    lectureApi
      .fetchLectureTags(param)
      .then(({ data }) => {
        setLecturesTags(data);

        if (data.length !== 0) setSearchStatus('fetched');
        else setSearchStatus('none');
      })
      .catch(() => setSearchStatus('none'));
  };

  // disable add button if current input tag is empty or tag length exceed to max
  useEffect(() => {
    if ((tags.length != 0 && tags.indexOf('') + 1) || tags.length === max)
      setTagAddButtonDisable(true);
    else setTagAddButtonDisable(false);
  }, [tags]);

  useEffect(() => {
    if (!!defaultValues && !tags.length) {
      defaultValues.map((data, key) => {
        setFormValue(`tag${key + 1}`, data ?? '', { shouldDirty: false });
        const newTags = tagValueRef.current.concat([data]);
        tagValueRef.current = newTags;
        setTags(tagValueRef.current);
      });
    }
    callApiSearch();
  }, []);

  return (
    <div className="mb-px-40">
      <p className="text-base-dark text-18 font-bold mb-px-16">タグ</p>

      {[...Array(max)].map((x, i) => (
        <div className={`relative ${i + 1 > tags.length ? 'hidden' : ''} mb-px-8`}>
          <input
            type="text"
            className={`bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.tagInput}`}
            name={`tag${i + 1}`}
            ref={(e) => {
              register(e, rules.tag);
              if (i === tags.length - 1) tagInputRef.current = e;
            }}
            onBlur={() => handleTagOnBlur(i)}
            onFocus={() => handleTagOnFocus(i)}
            onChange={(event) => handleTagOnChange(event, i)}
          />
          <div
            className={`bg-white z-40 w-px-544 p-px-10 shadow shadow-card mb-px-10 -pb-px-10 absolute ${
              indexFocus === i && searchStatus != 'none'
                ? style.tagSuggestionShow
                : style.tagSuggestionHidden
            }`}
          >
            {searchStatus === 'searching' ? (
              <span className="py-px-5 px-px-10 text-11">読み込み中...</span>
            ) : (
              lecturesTags.map((lecture) => {
                return (
                  <span
                    className="bg-blue-100 py-px-5 px-px-10 text-11 rounded cursor-pointer mr-px-10 mb-px-5 inline-block"
                    onClick={() => handleSelectTag(lecture.name, i)}
                  >
                    {lecture.name}
                  </span>
                );
              })
            )}
          </div>

          <button type="button" onClick={() => handleRemoveTag(i)} className="ml-px-12">
            <RemoveIcon color="#757575" />
          </button>

          <ErrorMessage
            serverErrors={serverErrors?.[`tag${i + 1}`]}
            errors={errors[`tag${i + 1}`]}
          />
        </div>
      ))}

      <button
        className={`flex ${tags.length && 'mt-px-16'} ${
          tagAddButtonDisable && 'opacity-50 cursor-default'
        }`}
        onClick={() => handleAddTag()}
        disabled={tagAddButtonDisable}
      >
        <AddBoxIcon color="#0D89EE" height="15" width="15" />
        <span className="text-12 font-bold text-adminPrimary-400 ml-px-7">
          タグを追加
        </span>
      </button>
    </div>
  );
};

export default Tags;
