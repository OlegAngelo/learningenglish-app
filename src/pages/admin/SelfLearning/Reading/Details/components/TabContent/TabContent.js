import React, { useState } from 'react'

export const TabContext = React.createContext();

const TabContent = ({children}) => {
  const [tabPosition, setTabPosition] =  useState('tab-1');

  const handleChangeTab = (position) => {
    setTabPosition(position)
  }

  return (
    <div>
      <TabContext.Provider value={{
        tabPosition,
        handleChangeTab
      }}>
        {children[0]}
        {children[1]}
      </TabContext.Provider>
    </div>
  )
};

export default TabContent;
