import { useContext } from 'react';

import { FormWrapperContext } from '../FormWrapper/FormWrapper';
import SelectInput from '../../../../../../../shared/SelectInput/SelectInput';

import style from './EditableInfoSection.module.css';

const EditableInfoSection = ({ item }) => {
  const { title, total_limit_sec } = item || {};

  const { register, errors, rules, control, Controller } = useContext(FormWrapperContext);
  let levelOptions = [];
  Array(15)
    .fill()
    .map((data, index) => {
      const computed = index ? levelOptions[index - 1].value + 5 : 30;
      return levelOptions.push({
        label: computed,
        value: computed,
      });
    });

  return (
    <div className="mt-14">
      <div className="mb-px-40">
        <div className="mb-2">
          <label
            htmlFor="title"
            className={`text-adminGray-400 text-12 font-bold mb-px-8`}
          >
            タイトル <span className="text-adminRed-400">*</span>
          </label>
        </div>

        <input
          type="text"
          name="title"
          className={`bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14`}
          defaultValue={title}
          ref={register(rules.title)}
        />

        {errors?.title?.message && (
          <p className="text-red-500 mt-px-2">{errors.title.message}</p>
        )}
      </div>

      {total_limit_sec ? (
        <Controller
          control={control}
          name="total_limit_sec"
          rules={rules.timerSeconds}
          defaultValue={total_limit_sec}
          render={({ value, onChange }) => (
            <SelectInput
              className="mb-px-40"
              innerClass={`border-px-2 border-adminGray-200 ${style.timerSecondsField}`}
              label="タイマーの秒数"
              options={levelOptions}
              required
              value={value}
              defaultLabel={total_limit_sec}
              hideDefaultOption
              onChange={(event) => onChange(parseInt(event.target.value))}
              errorComponent={
                errors?.timerSeconds?.message && (
                  <p className="text-red-500 mt-px-2">{errors.timerSeconds.message}</p>
                )
              }
            />
          )}
        />
      ) : (
        <SelectInput
          innerClass={`border-px-2 border-adminGray-200 ${style.timerSecondsField}`}
          label="タイマーの秒数"
          required
        />
      )}
    </div>
  );
};

export default EditableInfoSection;
