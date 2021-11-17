import React, { Fragment } from 'react';
import { useLocation } from 'react-router'; 
import ClearIcon from '../icons/ClearIcon';
import styles from './Modal.module.css';

// Refactor Modal - it should open and close logic should be here
const Modal = ({
  children,
  closeModalFunc,
  zIndex = 20,
  className,
  outerClassname,
  isClearIconShow = true,
  hasBackgroundShadow = true,
  closeIconColor,
  closeIconOpacity,
  style = {},
}) => {
  const location = useLocation()
  const regex = [
    /^\/admin\/news\/details\/\d+\/preview$/,
    /^\/admin\/news\/details\/\d+$/,
  ]
  const previewLocation = regex[0].test(location.pathname)
  const adminLocation = regex[1].test(location.pathname)

  return (
    <Fragment>
      {hasBackgroundShadow && (
        <div
          className={`${adminLocation ? `absolute`: `fixed`} top-0 
          ${previewLocation ? styles.adminModalDimension :`h-full w-full right-0`} 
          bg-background-modal`}
          onClick={closeModalFunc}
          style={{ zIndex, ...style }}
        ></div>
      )}

      <div
        className={`
          ${outerClassname}
          fixed
          top-0 h-full ${previewLocation ? styles.adminWidth :`w-full right-0`} 
          flex items-center pointer-events-none 
        `}
        style={{ zIndex, ...style }}
      >
        <div
          className={`
            ${className}
            w-full items-center relative flex flex-col
            bg-basic-400 pointer-events-auto
            ${previewLocation && `mb-px-20` }
          `}
        >
          { isClearIconShow && 
            <ClearIcon
              opacity={closeIconOpacity}
              color={closeIconColor}
              className="absolute top-px-10 right-px-10"
              onClick={closeModalFunc}
            />
          }
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
