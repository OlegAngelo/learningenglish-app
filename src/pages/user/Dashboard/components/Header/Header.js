import React from 'react'
import styles from './Header.module.css'

const Header = ({ title }) => {
  return (
    <p className={`text-center text-basic-400 absolute font-semibold ${styles.headerTitle}`}>{title}</p>
  )
}

export default Header;
