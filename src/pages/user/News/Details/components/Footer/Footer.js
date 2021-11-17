import React from 'react';
import { Link } from 'react-router-dom';

import BackIcon from '../../../../../../shared/icons/BackIcon';

import styles from './Footer.module.css';

const Footer = ({link, className = 'fixed left-0 right-0 bottom-0'}) => {
  return (
    <div className={`${className} ${styles.footer}`}>
      <footer className={`${styles.FooterBg} py-3`}>
        <Link to={link}>
          <div className="ml-px-40 flex flex-col w-px-30 justify-center">
            <div className="flex justify-center">
              <BackIcon 
                width="10"
                height="16"
                color="#43596D"
              />
            </div>
            <div className="text-10 flex justify-center text-primary-400">Back</div>
          </div>
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
