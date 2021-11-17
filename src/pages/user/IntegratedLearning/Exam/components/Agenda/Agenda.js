import React from 'react';

import style from './Agenda.module.css';

const Agenda = ({ members, date, location, contents }) => {

  const formatText = (text) => {
    return text.split("\n").map((text, i) => i ? [<br/>, text] : text);
  }

  return (
    <div className={`flex rounded bg-white`}>
      <div className={`${style.agendaWrapper} w-full font-hiragano`}>
        <span key="title" className="text-left text-18 font-theme-bolder">Regular meeting</span>
        <br/>
        <p key="right" className={`${style.rightContent} text-right text-14 font-theme-normal`}>
          {date}
          <br/>
          {location}
          <br/>
          Members: {members}
        </p>
        <p key="left" className={`${style.leftContent} text-16 text-justify font-theme-normal whitespace-pre-line`} >
          {contents}
        </p>
      </div>
    </div>
  )
}

Agenda.defaultProps = {
  members: "Nancy, Sam, Ken",
  date: "09/07/2021 10:00 - 11:00",
  location: "@Room B",
  contents: "Today’s Agenda"+
  "\n\n"+
  "1 Sales improvement of the division - Objectives The sales projection has not achieved this fiscal year To reach the projection, we have to do something right now - Items to be discussed. "+
  "\n\n"+
  "1 Sales improvement of the division - Objectives The sales projection has not achieved this fiscal year To reach the projection, we have to do something right now - Items to be discussed. "+
  "\n\n"+
  "1 Sales improvement of the division - Objectives The sales projection has not achieved this fiscal year To reach the projection, we have to do something right now - Items to be discussed. "+
  "\n\n"+
  "1 Sales improvement of the division - Objectives The sales projection has not achieved this fiscal year To reach the projection, we have to do something right now - Items to be discussed."
}

export default Agenda

