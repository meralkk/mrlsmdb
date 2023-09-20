import React from 'react'
import './main-title.scss'

const MainTitle = ({ title }) => {
  return (
    <div className="header">
      <div className="header-title">{title}</div>
    </div>
  )
}

export default MainTitle
