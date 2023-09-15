import React from 'react'
import './main-title.scss'
import { BsArrowRightShort } from "react-icons/bs";

const MainTitle = ({ title }) => {
  return (
    <div className="header">
      <div className="header-title">{title}</div>
      <div className="tvseries-arrow"><BsArrowRightShort/></div>
    </div>
  )
}

export default MainTitle
