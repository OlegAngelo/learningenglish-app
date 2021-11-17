import React, {Fragment} from 'react';

import styleOptions from './styleOptions';

function Button({
  children,
  className,
  disabled = false,
  icon,
  innerClass = '',
  onClick,
  type,
  withoutFocus,
  hide = false
}) {
  const { base, border, color, disable, fontSize, height, padding, withShadow } = styleOptions;

  const btnTypes = {
    // Rounded
    'lightblue': [
      base.rounded,
      color.lightblue,
      fontSize.smaller,
      height['px-30'],
      padding.narrow,
      'font-hiragino-kaku',
    ],
    'lightblue-outline': [
      base.rounded,
      border.light,
      color.lightblueOutline,
      fontSize.smaller,
      height['px-30'],
      padding.narrow,
      'font-hiragino-kaku',
    ],
    'white-bold': [
      base.rounded,
      border.dark,
      color.white,
      fontSize.baseBold,
      height['px-48'],
      padding.narrowBold,
      withShadow,
    ],
    'white-small': [
      base.rounded,
      border.dark,
      color.white,
      fontSize.smallBold,
      height['px-28'],
      'w-px-100',
    ],
    'white-small-outline': [
      base.rounded,
      border.dark,
      color.whiteOutline,
      fontSize.small,
      height['px-28'],
      'w-px-100',
    ],
    'white-flexible': [
      base.rounded,
      border.dark,
      color.white,
      fontSize.smallBold,
      'w-full h-full',
    ],
    'blue-flexible': [
      base.rounded,
      border.darkblue,
      color.darkblue,
      fontSize.smallBold,
      'w-full h-full',
    ],

    // Square
    'gray-square-outline': [
      base.square,
      border.gray,
      color.grayOutline,
      fontSize.normal,
      height['px-36'],
      'px-px-15 leading-px-12',
    ],
    'blue-square': [
      base.square,
      color.blue,
      fontSize.normal,
      height['px-36'],
      'px-px-16 leading-px-20',
    ],
    'blue-square-outline': [
      base.square,
      border.blue,
      color.blueOutline,
      fontSize.normal,
      height['px-36'],
      'px-px-15 leading-px-20',
    ],
    'darkblue-square': [
      base.square,
      color.darkblue,
      fontSize.baseBold,
      height['px-44'],
      padding.wideBold,
      withShadow,
    ],
    'darkblue-square-outline': [
      base.square,
      border.darkBlue,
      color.darkblueOutline,
      fontSize.baseBold,
      height['px-44'],
      padding.wideBold,
      withShadow,
    ],
    'darkblue-square-icon': [
      base.square,
      color.darkblue,
      height['px-26'],
      padding.wider,
      withShadow,
    ],
    'lightgray-square': [
      base.square,
      color.lightgray,
      fontSize.baseBold,
      height['px-44'],
      padding.wideBold,
      withShadow,
    ],
    'lightgray-square-wide': [
      base.square,
      color.disabledSquare,
      fontSize.baseBold,
      height['px-44'],
      padding.wideBold,
      withShadow,
    ],
    'lightgray-square-icon': [
      base.square,
      color.lightgray,
      height['px-26'],
      padding.wider,
      withShadow,
    ],
    'white-square-narrow': [
      base.square,
      color.whiteSquare,
      fontSize.baseBold,
      height['px-44'],
      padding.narrowBold,
      withShadow,
    ],
    'white-square-wide': [
      base.square,
      color.whiteSquare,
      fontSize.baseBold,
      height['px-44'],
      padding.wideBold,
      withShadow,
    ],
    'white-square-wider': [
      base.square,
      color.whiteSquare,
      fontSize.baseBold,
      height['px-44'],
      withShadow,
      'w-px-162'
    ],
    'white-square-normal-wider': [
      base.square,
      color.whiteSquare,
      fontSize.normal,
      height['px-44'],
      withShadow,
      'w-px-162'
    ],
    'white-rectangle': [
      base.square,
      border.dark,
      color.white,
      fontSize.base,
      height['px-48'],
      withShadow,
      'font-hiragino',
      'w-full',
    ],
    'whiter-square-wide': [
      base.square,
      fontSize.baseBold,
      height['px-44'],
      padding.wideBold,
      'text-custom-2 py-px-18 shadow-btn-choice mb-px-50',
    ],
    'white-square': [
      base.square,
      color.white,
      fontSize.baseBold,
      height['px-44'],
      padding.wideBold,
      border.darkBlue,
      withShadow,
    ],
    'plain-square-slight-wide': [
      base.square,
      color.plainSquare,
      fontSize.baseBold,
      height['px-44'],
      withShadow,
      'w-px-140'
    ],
    'plain-square-wider': [
      base.square,
      color.plainSquare,
      fontSize.baseBold,
      height['px-44'],
      withShadow,
      'w-px-162'
    ],
  };

  return (
    <Fragment>
      { !hide && (
        <div className={className}>
          <button
            className={`${btnTypes[type].join(' ')} ${innerClass} ${
              disabled ? `${disable} cursor-default` : 'cursor-pointer'
            } ${withoutFocus ? '' : 'focus:bg-state-active'}`}
            disabled={disabled}
            onClick={onClick}
          >
            {icon && (
              <span className="pr-px-6 pb-px-2" style={{ paddingLeft: '2.5px' }}>
                {icon}
              </span>
            )}
            {children}
          </button>
        </div>
      )}
    </Fragment>
  );
}

export default Button;
