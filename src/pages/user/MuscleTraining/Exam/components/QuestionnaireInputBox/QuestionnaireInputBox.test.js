import 'jsdom-global/register';
import React, { useState as useStateMock } from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import QuestionnaireInputBox from './QuestionnaireInputBox';

configure({ adapter: new Adapter() });

describe('QuestionnaireInputBox Component', () => {
  let props = {
      color: 'bg-basic-400',
      textColor: '#141414',
      setResponse: jest.fn(),
      setAnswers: jest.fn(),
      setIsShowfooter: true,
      setSelected: jest.fn(),
      correctAnswer: '',
      timerProps: {
        colorName: jest.fn(),
        isDisappearedTimer: false,
        percentage: jest.fn(),
        seconds: 20,
        isShowCommentary: false,
      },
  };

  describe('render', () => {
    it('should render exactly from snapshot', () => {
      const wrapper = mount(  <QuestionnaireInputBox  {...props}/>)
      expect(wrapper).toMatchSnapshot()
    });
  });

  describe('props', () => {
    it('should pass down to component', () => {
      const wrapper = mount(<QuestionnaireInputBox {...props} />);
      const wrapperProps = wrapper.props();

      expect(wrapperProps.color).toEqual(props.color);
      expect(wrapperProps.textColor).toEqual(props.textColor);
      expect(wrapperProps.setResponse).toEqual(props.setResponse);
      expect(wrapperProps.setAnswers).toEqual(props.setAnswers);
      expect(wrapperProps.setIsShowfooter).toEqual(props.setIsShowfooter);
      expect(wrapperProps.setSelected).toEqual(props.setSelected);
    });
  });
  
});
