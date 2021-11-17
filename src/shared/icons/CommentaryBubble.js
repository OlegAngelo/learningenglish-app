import React from 'react';

const CommentaryBubble = ({ width = 62, height = 62, ...props }) => {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_ddd)">
        <circle cx="31" cy="30" r="28" fill="#0C5F8D" stroke="white" strokeWidth="2" />
        <path fillRule="evenodd" clipRule="evenodd" d="M23 14H39C40.1 14 41 14.9 41 16V34L37 30H23C21.9 30 21 29.1 21 28V16C21 14.9 21.9 14 23 14ZM25 26H37V24H25V26ZM37 23H25V21H37V23ZM25 20H37V18H25V20Z" fill="white" />
        <text x="21" y="45" fill="#FFFFFF" fontSize="11px" fontWeight="700">解説</text>
        {/* <path d="M24.433 37.387C24.29 37.42 24.18 37.431 23.861 37.431H22.871C23.047 36.958 23.047 36.958 23.102 36.837L21.936 36.617C21.87 37.002 21.76 37.332 21.529 37.805C21.177 38.564 20.803 39.07 20.286 39.51C20.693 39.851 20.847 40.016 21.012 40.258C21.012 40.39 21.012 40.599 21.012 40.863C21.012 44.053 20.891 45.032 20.352 45.989C20.715 46.242 20.836 46.363 21.265 46.847C21.672 45.978 21.793 45.494 21.925 44.152H24.18V45.494C24.18 45.67 24.081 45.725 23.718 45.725C23.542 45.725 23.256 45.703 22.794 45.648C22.948 46.044 23.003 46.319 23.047 46.748C23.421 46.759 23.608 46.759 23.729 46.759C24.851 46.759 25.159 46.55 25.159 45.769V40.236C25.159 40.148 25.159 40.148 25.159 39.95C25.511 40.302 25.698 40.555 25.852 40.863L25.973 40.786C25.984 40.797 25.984 40.819 25.984 40.819C25.984 40.929 25.918 41.292 25.863 41.545C25.731 42.106 25.61 42.425 25.28 42.997C25.577 43.096 25.786 43.206 26.259 43.503C26.446 43.107 26.512 42.953 26.611 42.656H27.502V43.646H26.413C25.962 43.646 25.731 43.635 25.412 43.591V44.768C25.731 44.724 25.962 44.713 26.402 44.713H27.502V45.813C27.502 46.286 27.48 46.55 27.436 46.891H28.712C28.657 46.561 28.646 46.297 28.646 45.813V44.713H29.515C30.021 44.713 30.263 44.724 30.549 44.757V43.591C30.23 43.635 29.966 43.646 29.493 43.646H28.646V42.656H29.328C29.757 42.656 30.054 42.667 30.307 42.7V41.545C30.087 41.589 29.823 41.611 29.328 41.611H28.646V41.523C28.646 41.237 28.657 40.995 28.679 40.72H27.436C27.48 40.973 27.502 41.204 27.502 41.523V41.611H26.908C26.941 41.446 26.941 41.446 27.04 40.995L26.017 40.775C26.534 40.478 26.908 40.159 27.227 39.719C27.568 39.257 27.689 38.938 27.854 38.168H29.02C28.976 38.674 28.921 39.048 28.855 39.268C28.8 39.433 28.69 39.488 28.404 39.488C28.217 39.488 27.942 39.455 27.557 39.378C27.722 39.774 27.766 39.95 27.81 40.467C28.437 40.489 28.437 40.489 28.613 40.489C29.295 40.489 29.548 40.401 29.735 40.126C29.922 39.851 30.065 39.18 30.142 38.278C30.186 37.651 30.208 37.332 30.241 37.09C29.966 37.123 29.68 37.134 29.262 37.134H26.556C26.028 37.134 25.731 37.123 25.401 37.068V38.223C25.643 38.19 25.929 38.168 26.38 38.168H26.688C26.589 38.652 26.468 38.905 26.215 39.169C25.94 39.466 25.687 39.642 25.159 39.895C25.17 39.587 25.17 39.521 25.192 39.334C24.895 39.367 24.653 39.378 24.147 39.378C24.312 39.114 24.499 38.773 24.609 38.575C24.807 38.179 24.84 38.113 24.939 37.959L24.433 37.387ZM22.134 39.378C21.969 39.378 21.969 39.378 21.881 39.378C22.101 39.048 22.277 38.762 22.453 38.41H23.531C23.377 38.762 23.234 39.026 23.025 39.378H22.134ZM21.991 43.195C21.991 43.019 21.991 42.953 22.002 42.634C22.002 42.546 22.002 42.392 22.002 42.205H22.651V43.195H21.991ZM24.18 43.195H23.542V42.205H24.18V43.195ZM24.18 41.292H23.542V40.357H24.18V41.292ZM22.651 40.357V41.292H22.024V40.357H22.651ZM36.775 42.403C36.764 43.206 36.72 43.646 36.599 44.119C36.412 44.889 36.005 45.439 35.257 45.934V44.119C35.257 43.734 35.268 43.536 35.29 43.327C35.103 43.349 34.993 43.36 34.63 43.36H32.628C32.287 43.36 32.111 43.349 31.891 43.316C31.924 43.613 31.935 43.844 31.935 44.174V45.813C31.935 46.154 31.913 46.55 31.88 46.891H33.013V46.33H34.223V46.671H35.279C35.268 46.517 35.268 46.44 35.257 46.242C35.521 46.495 35.664 46.66 35.895 46.979C37.402 45.857 37.82 44.933 37.897 42.403H38.601V45.846C38.601 46.594 38.865 46.781 39.965 46.781C40.801 46.781 41.164 46.682 41.362 46.407C41.56 46.132 41.626 45.791 41.703 44.603C41.384 44.526 41.087 44.394 40.669 44.141V44.526C40.669 45.131 40.625 45.483 40.526 45.593C40.482 45.648 40.339 45.692 40.163 45.692C39.8 45.692 39.723 45.648 39.723 45.439V42.403H40.339C40.636 42.403 40.801 42.414 41.164 42.447C41.142 42.183 41.131 42.007 41.131 41.688V39.708C41.131 39.4 41.142 39.191 41.164 38.894C40.889 38.927 40.658 38.938 40.284 38.938H39.965C40.229 38.487 40.35 38.234 40.834 37.123L39.602 36.727C39.349 37.64 39.118 38.212 38.722 38.938H36.709C36.302 38.938 36.093 38.927 35.785 38.894C35.818 39.125 35.829 39.455 35.829 39.752V41.655C35.829 41.963 35.818 42.194 35.796 42.447C36.126 42.414 36.302 42.403 36.61 42.403H36.775ZM32.991 44.306H34.223V45.34H32.991V44.306ZM36.929 40.027H39.954V41.325H36.929V40.027ZM31.946 38.135C32.221 38.102 32.452 38.091 32.837 38.091H34.366C34.762 38.091 34.96 38.102 35.257 38.135V37.035C34.971 37.079 34.795 37.09 34.366 37.09H32.837C32.397 37.09 32.221 37.079 31.946 37.035V38.135ZM31.517 39.741C31.781 39.708 32.012 39.697 32.397 39.697H34.652C35.114 39.697 35.257 39.708 35.488 39.741V38.608C35.246 38.641 35.059 38.652 34.608 38.652H32.397C31.99 38.652 31.781 38.641 31.517 38.597V39.741ZM31.946 41.281C32.155 41.259 32.298 41.248 32.639 41.248H34.553C34.872 41.248 35.015 41.259 35.224 41.281V40.258C35.037 40.28 34.905 40.291 34.553 40.291H32.639C32.309 40.291 32.144 40.28 31.946 40.258V41.281ZM31.946 42.832C32.155 42.81 32.298 42.799 32.628 42.799H34.531C34.872 42.799 35.026 42.81 35.224 42.832V41.809C35.037 41.831 34.894 41.842 34.542 41.842H32.639C32.309 41.842 32.144 41.831 31.946 41.809V42.832ZM38.062 38.355C37.765 37.673 37.622 37.409 37.171 36.738L36.093 37.255C36.522 37.86 36.753 38.278 36.995 38.905L38.062 38.355Z" fill="white" /> */}
      </g>
      <defs>
        <filter id="filter0_ddd" x="0" y="0" width="62" height="62" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
          <feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default CommentaryBubble;