import React from 'react';

const Cube = ({size = 'md', color = 'gray', className = ''}) => {
  const sizes = {
    xsm: { width: 20, height: 22 },
    sm: { width: 28, height: 31 },
    md: { width: 38, height: 45 },
    lg: { width: 50, height: 58 },
  };

  const cubeSize = {
    xsm: { 
      viewBox: '0 0 20 22',
      left: 'M1 5.69922L1.34667 15.6997L9.82009 21.0002V10.7997L1 5.69922Z',
      right: 'M18.6402 5.69922L18.2935 15.6997L9.82007 21.0002V10.7997L18.6402 5.69922Z',
      top: 'M1.00073 5.69957L9.82044 10.7995L18.6403 5.69862L9.82044 1L1.00073 5.69957Z'
    },
    sm: { 
      viewBox: '0 0 28 31',
      left: 'M1.12988 7.67285L1.63574 22.2655L14.0002 30V15.1155L1.12988 7.67285Z',
      right: 'M26.8703 7.67285L26.3644 22.2655L14 30V15.1155L26.8703 7.67285Z',
      top: 'M1.13037 7.67403L14.0001 15.1159L26.8701 7.67263L14.0001 0.816406L1.13037 7.67403Z'
    },
    md: { 
      viewBox: '0 0 38 43',
      left: 'M1 10.5898L1.70748 30.9987L19 41.816V20.9989L1 10.5898Z',
      right: 'M37 10.5898L36.2926 30.9987L19 41.816V20.9989L37 10.5898Z',
      top: 'M1.00098 10.5909L19.0002 20.9988L36.9998 10.5889L19.0002 1L1.00098 10.5909Z'
    },
    lg: { 
      viewBox: '0 0 50 56',
      left: 'M1 13.7852L1.9433 40.9969L24.9999 55.4198V27.6639L1 13.7852Z',
      right: 'M48.9999 13.7852L48.0566 40.9969L25 55.4198V27.6639L48.9999 13.7852Z',
      top: 'M1.00098 13.7878L24.9998 27.6649L48.9992 13.7852L24.9998 1L1.00098 13.7878Z'
    }
  };
  
  const colors = {
    red: {
      light: '#FF845D',
      dark: '#944329',
      normal: '#DA2A03',
    },
    pink: {
      light: '#F5609E',
      dark: '#AF1858',
      normal: '#DA035D',
    },
    darkBlue: {
      light: '#6066F5',
      dark: '#0D0B94',
      normal: '#1403DA',
    },
    lightBlue: {
      light: '#5DC5FF',
      dark: '#296794',
      normal: '#3E9BF0',
    },
    lightGreen: {
      light: '#B5F560',
      dark: '#6EAF18',
      normal: '#7BDA03',
    },
    darkGreen: {
      light: '#37C74E',
      dark: '#0F7E27',
      normal: '#01A61B',
    },
    violet: {
      light: '#C15DFF',
      dark: '#6B2994',
      normal: '#8803DA',
    },
    yellow: {
      light: '#FFFB82',
      dark: '#E1DA16',
      normal: '#EFE501',
    },
    orange: {
      light: '#F5B160',
      dark: '#AF6918',
      normal: '#DA7603',
    },
    gray: {
      light: '#E8E8E8',
      normal: '#C0C0C0',
      dark: '#8D8D8D',
    },
  };
  
  const style = { 
    stroke: '#F2F2F2',
    strokeWidth: '0.5px',
    strokeLinejoin: 'round',
    strokeMiterlimit: '16'
  };
  
  return (
    <svg width={sizes[size].width} height={sizes[size].height} viewBox={cubeSize[size].viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d={cubeSize[size].left} style={style} fill={colors[color].normal}/>
      <path d={cubeSize[size].right} style={style} fill={colors[color].dark}/>
      <path d={cubeSize[size].top} style={style} fill={colors[color].light}/>
    </svg>
  );
};

export default Cube;
