import React from 'react'
import { elastic as ReactBurgerMenu } from 'react-burger-menu'
import { Link } from 'react-router-dom'

const Menu = props => {
  return (
    <div id="elastic">
      <ReactBurgerMenu isOpen={true} noOverlay={true} elastic pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
        <Link className="menu-item" to="/new">
          New
        </Link>
        <Link className="menu-item" to="/submitted">
          Submitted
        </Link>
        <Link className="menu-item" to="/pending">
          Pending
        </Link>
        <Link className="menu-item" to="/confirmed">
          Confirmed
        </Link>
        <Link className="menu-item" to="/overview">
          Overview
        </Link>
      </ReactBurgerMenu>
    </div>
  )
}

export default Menu
