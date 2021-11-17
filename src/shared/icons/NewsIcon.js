import React from 'react';

const NewsIcon = ({ color = "#FFFFFF", className }) => {
  return (
    <svg 
      width="16" 
      height="15" 
      viewBox="0 0 16 15" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M14.1587 2.82324H11.8232V14.273H14.1587C14.9615 14.273 15.6183 13.6447 15.6183 12.8767V4.21956C15.6183 3.45158 14.9615 2.82324 14.1587 2.82324ZM12.2608 12.8769H14.3043V3.94043H12.2608V12.8769Z" 
        fill={color}
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M1.45965 0.0302734H11.6772C12.48 0.0302734 13.1369 0.658616 13.1369 1.42659V12.8764C13.1369 13.6444 12.48 14.2727 11.6772 14.2727H1.45965C0.656843 14.2727 0 13.6444 0 12.8764V1.42659C0 0.658616 0.656843 0.0302734 1.45965 0.0302734ZM1.16749 12.8765H11.677V1.14746H1.16749V12.8765Z" 
        fill={color}
      />
      <path 
        d="M6.55227 8.54785H3.57962C3.29628 8.54785 3.06445 8.76962 3.06445 9.04067V10.8001C3.06445 11.0712 3.29628 11.293 3.57962 11.293H6.55227C6.83562 11.293 7.06744 11.0712 7.06744 10.8001V9.04067C7.06744 8.76962 6.83562 8.54785 6.55227 8.54785Z" 
        fill={color}
      />
      <path 
        d="M2.91954 4.35823L2.91954 2.96191L8.02832 2.96191L8.02832 4.35823L2.91954 4.35823Z" 
        fill={color}
      />
      <path 
        d="M2.91952 7.1512L2.91952 5.75488L10.2178 5.75488L10.2178 7.1512L2.91952 7.1512Z" 
        fill={color}
      />
    </svg>
  );
};

export default NewsIcon;
