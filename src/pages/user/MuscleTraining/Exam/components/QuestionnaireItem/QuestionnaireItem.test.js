import 'jsdom-global/register';
import React, { useState as useStateMock } from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import QuestionnaireItem from './QuestionnaireItem';

configure({ adapter: new Adapter() });

describe('QuestionnaireItem Component', () => {
  let props = {
    choices: [
      {
        id: 1,
        phrase_item: 'Let’s start the meeting.',
        word_item: 'meeting',
        jp_phrase_item: '会議を始めましょう。',
        is_correct: true,
      }],
    selected: "会議を始めましょう。",
    nothingSelected: '',
    incorrectSelected: '面談日を決めましょう。',
    questionnaireItemProps:
    {
      text: '会議を始めましょう。',
      onClick: () => jest.fn(),
      color: 'bg-basic-400',
      textColor: '#141414',
    }
  };

  describe('render', () => {
    it('should render exaclty from snapshot', () => {
      let handleSubmit = jest.fn()
      const wrapper = mount(
        <QuestionnaireItem
          text={props.questionnaireItemProps.text}
          onClick={handleSubmit}
          color={props.questionnaireItemProps.color}
          textColor={props.questionnaireItemProps.textColor}
        />
      )
      expect(wrapper).toMatchSnapshot()
    });
  });

  describe('props', () => {
    it('should pass down to component', () => {
      let handleSubmit = jest.fn()
      const wrapper = mount(
        <QuestionnaireItem
          text={props.questionnaireItemProps.text}
          onClick={handleSubmit}
          color={props.questionnaireItemProps.color}
          textColor={props.questionnaireItemProps.textColor}
        />
      )
      const wrapperProps = wrapper.props();

      wrapperProps.onClick()
      expect(wrapperProps.text).toEqual(props.questionnaireItemProps.text);
      expect(handleSubmit).toBeCalled();
      expect(wrapperProps.color).toEqual(props.questionnaireItemProps.color);
      expect(wrapperProps.textColor).toEqual(props.questionnaireItemProps.textColor);
    });
  });

});
