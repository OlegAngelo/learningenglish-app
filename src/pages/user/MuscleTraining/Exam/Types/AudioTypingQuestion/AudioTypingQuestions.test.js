import 'jsdom-global/register';
import React, { useState as useStateMock } from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import AudioTypingQuestion from './AudioTypingQuestion';

configure({ adapter: new Adapter() });

describe('AudioTypingQuestion Component', () => {
  let props = {
    timerProps: {
      colorName: jest.fn(),
      isDisappearedTimer: false,
      percentage: jest.fn(),
      seconds: 20,
      isShowCommentary: false,
    },
    footerProps: {
      hasLightBulb: false,
      hasBack: false,
      hasSkip: false,
      hasSpeaker: true,
      hasNext: true,
    },
    questionItem: {
      id: 'ED1_V0001',
      title: 'conference',
      jp_title: '会議',
      audio_file: 'ED1_V0001.mp3',
      choices: [
        {
          id: 1,
          item: 'conference',
          jp_item: '会議',
          is_correct: true,
        },
        {
          id: 2,
          item: 'expense',
          jp_item: '税，税金',
          is_correct: false,
        },
        {
          id: 3,
          item: 'document',
          jp_item: '口座',
          is_correct: false,
        },
        {
          id: 4,
          item: 'insurance',
          jp_item: '政策，方針',
          is_correct: false,
        },
      ],
      typing: 'conference',
      description: '通常数日間にわたるような大規模な会議について用いられます。',
      example_sentence: {
        content: 'We\'re looking forward to attending next year\'s #★conference☆# in Hawaii.',
        translation: '我々は，ハワイで行われる来年の会議に出席するのを楽しみにしている。',
      },
      pronunciation_point: '',
    },
    setFooterProps: jest.fn(),
    response: '',
    setResponse: jest.fn(),
    selected: '',
    setSelected: jest.fn(),
    isShowCommentary: false
  };

  describe('render', () => {
    it('should render exactly from snapshot', () => {
      const wrapper = mount(<AudioTypingQuestion {...props} />)
      expect(wrapper).toMatchSnapshot()
    });
  });

  describe('props', () => {
    it('should pass down to component', () => {
      const wrapper = mount(<AudioTypingQuestion {...props} />);
      const wrapperProps = wrapper.props();

      expect(wrapperProps.footerProps).toEqual(props.footerProps);
      expect(wrapperProps.setFooterProps).toEqual(props.setFooterProps);
      expect(wrapperProps.response).toEqual(props.response);
      expect(wrapperProps.setResponse).toEqual(props.setResponse);
      expect(wrapperProps.selected).toEqual(props.selected);
      expect(wrapperProps.setSelected).toEqual(props.setSelected);
      expect(wrapperProps.isShowCommentary).toEqual(props.isShowCommentary);
    });
  });

});
