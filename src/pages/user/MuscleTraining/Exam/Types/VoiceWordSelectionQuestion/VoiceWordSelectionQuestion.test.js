import 'jsdom-global/register';
import React, { useState as useStateMock } from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import VoiceWordSelectionQuestion from './VoiceWordSelectionQuestion';

configure({ adapter: new Adapter() });

describe('VoiceWordSelectionQuestion Component', () => {
  let props = {
    footerProps: {
      hasLightBulb: false,
      hasBack: false,
      hasSkip: false,
      hasSpeaker: true,
      hasNext: true,
    },
    setFooterProps: jest.fn(),
    response: '',
    setResponse: jest.fn(),
    selected: '',
    setSelected: jest.fn(),
    isShowCommentary: false
  };

  describe('render', () => {
    it('should be render exaclty from snapshot', () => {
      const wrapper = mount(<VoiceWordSelectionQuestion {...props} />)
      expect(wrapper).toMatchSnapshot()
    });
  });

  describe('props', () => {
    it('should be pass down to component', () => {
      const wrapper = mount(<VoiceWordSelectionQuestion {...props} />);
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
