import 'jsdom-global/register';
import React, { useState as useStateMock } from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import SemanticSelectionQuestion from './SemanticSelectionQuestion';

configure({ adapter: new Adapter() });

describe('SemanticSelectionQuestion Component', () => {
  let props = {
    footerProps: {
      hasLightBulb: false,
      hasBack: false,
      hasSkip: false,
      hasSpeaker: true,
      hasNext: true,
    },
    questionItem: {
      id: 'ED1_P0001',
      title: 'Let’s start the #★meeting☆#.',
      jp_title: '会議を始めましょう。',
      audio_file: 'ED1_P0001.mp3',
      choices: [
        {
          id: 1,
          phrase_item: 'Let’s start the meeting.',
          word_item: 'meeting',
          jp_phrase_item: '会議を始めましょう。',
          is_correct: true,
        },
        {
          id: 2,
          phrase_item: 'Let’s start the chat.',
          word_item: 'mapping',
          jp_phrase_item: '文通を始めましょう。',
          is_correct: false,
        },
        {
          id: 3,
          phrase_item: 'Let’s start the project.',
          word_item: 'shooting',
          jp_phrase_item: '面談日を決めましょう。',
          is_correct: false,
        },
        {
          id: 4,
          phrase_item: 'Let’s start the exhibition.',
          word_item: 'viewing',
          jp_phrase_item: '録音を開始しましょう。',
          is_correct: false,
        },
      ],
      typing: 'meeting',
      description: '会議の開始のときによく使うセリフです。Let\'s start off the meeting now.、Let\'s get started.などの言い方もします。',
      pronunciation_point: 'Let\'s startを「レッスタート」のように一気に言います。',
    },
    selected: "会議を始めましょう。",
    setFooterProps: jest.fn(),
    response: '',
    setResponse: jest.fn(),
    selected: '',
    setSelected: jest.fn(),
    isShowCommentary: false
  };

  describe('render', () => {
    it('should render exaclty from snapshot', () => {
      const wrapper = mount(<SemanticSelectionQuestion {...props} />)
      expect(wrapper).toMatchSnapshot()
    });
  });

  describe('props', () => {
    it('should pass down to component', () => {
      const wrapper = mount(<SemanticSelectionQuestion {...props} />);
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

  describe("Questionnaire Title Text", () => {
    it('should check if the questionnaire item title is similar to the dynamic data', () => {
      const wrapper = mount(<SemanticSelectionQuestion {...props} />);
      const QuestionTitle = props.questionItem.title.replace(/#★|☆#/g, "");
      expect(wrapper.find('.englishQuestion').text()).toContain(QuestionTitle);
    });
  });

  describe("Questionnaire Items text", () => {
    it('should check if the question item choices are same from dynamic data', () => {
      const wrapper = mount(<SemanticSelectionQuestion {...props} />);

      expect(wrapper.find('button').contains(props.questionItem.choices[0].jp_phrase_item));
      expect(wrapper.find('button').contains(props.questionItem.choices[1].jp_phrase_item));
      expect(wrapper.find('button').contains(props.questionItem.choices[2].jp_phrase_item));
      expect(wrapper.find('button').contains(props.questionItem.choices[3].jp_phrase_item));
    });
  });

});
