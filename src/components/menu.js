import React from 'react'
import { elastic as ReactBurgerMenu } from 'react-burger-menu'
import { Link } from 'react-router-dom'

const Menu = props => {
  return (
    <div id="elastic">
      <ReactBurgerMenu isOpen={props.isMenuOpen} noOverlay={true} elastic pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="logo-tui" viewBox="0 0 136 60">
            <path
              className="logo-fill"
              d="M102.62,29.4a2.09,2.09,0,0,1,.07.6,8.63,8.63,0,0,1-.12,1.27,4.14,4.14,0,0,1-.35,1.24.92.92,0,0,1-.54.47,3.14,3.14,0,0,1-.91.11h-5V50.31a1.74,1.74,0,0,1-.08.62.93.93,0,0,1-.28.37,4,4,0,0,1-2.14.36,4.19,4.19,0,0,1-2.16-.35,1.15,1.15,0,0,1-.38-1V33.14H85.12a2.09,2.09,0,0,1-1-.16.61.61,0,0,1-.28-.35,2.16,2.16,0,0,1-.07-.62,7.8,7.8,0,0,1,.12-1.4,3.56,3.56,0,0,1,.35-1.09.93.93,0,0,1,.54-.48,3.14,3.14,0,0,1,.91-.11h15.65a4,4,0,0,1,.66,0,1,1,0,0,1,.35.12A.63.63,0,0,1,102.62,29.4Zm17.82-.27a.78.78,0,0,0-.3.35,1.83,1.83,0,0,0-.08.63v14a5.33,5.33,0,0,1-.29,1.69,2.65,2.65,0,0,1-1.26,1.44,5.07,5.07,0,0,1-2.57.57,6,6,0,0,1-1.89-.27,3.29,3.29,0,0,1-1.28-.75,2.93,2.93,0,0,1-.73-1.17,4.7,4.7,0,0,1-.23-1.51v-14a1.18,1.18,0,0,0-.35-1,6.77,6.77,0,0,0-4.29,0,.78.78,0,0,0-.3.35,1.83,1.83,0,0,0-.08.63v14a9.22,9.22,0,0,0,.52,3.14,6.37,6.37,0,0,0,1.63,2.5,7.7,7.7,0,0,0,2.89,1.66,14.85,14.85,0,0,0,8.3,0l0,0a7.7,7.7,0,0,0,2.85-1.65,6.37,6.37,0,0,0,1.63-2.5,9.21,9.21,0,0,0,.52-3.14v-14a1.18,1.18,0,0,0-.35-1A6.77,6.77,0,0,0,120.44,29.13Zm15,.36a.88.88,0,0,0-.29-.35,4.09,4.09,0,0,0-2.13-.35,4.31,4.31,0,0,0-2.16.35.88.88,0,0,0-.29.35,1.68,1.68,0,0,0-.09.63v20.2a1.21,1.21,0,0,0,.38,1,4.19,4.19,0,0,0,2.16.35,3.91,3.91,0,0,0,2.13-.37,1,1,0,0,0,.29-.37,1.62,1.62,0,0,0,.09-.62V30.12A1.69,1.69,0,0,0,135.44,29.49Zm-73-3.13c-2.35-.58-3,.25-5.2,4.84-13,27.73-36.8,19.34-40.87-6.41L22,24.38c3.09-.22,3.31-2.12,2.74-4.85-.54-2.45-1.8-3-3.54-3H3.53C1.26,16.53,0,17.74,0,21.14c0,1.72.15,4.8,3.83,4.53l4.45-.3c7.4,45.66,45.1,42.23,56.3,8C66.11,28.8,65.68,27.15,62.49,26.36ZM67.65,0a6.54,6.54,0,1,0,6.54,6.54A6.54,6.54,0,0,0,67.65,0Z"
            />
          </svg>
        </div>

        <Link className="menu-item" to="/new">
          New <span className="text-danger">({props.count.new})</span>
        </Link>
        <Link className="menu-item" to="/submitted">
          Submitted <span className="text-danger">({props.count.submitted})</span>
        </Link>
        <Link className="menu-item" to="/pending">
          Pending <span className="text-danger">({props.count.pending})</span>
        </Link>
        <Link className="menu-item" to="/confirmed">
          Confirmed <span className="text-danger">({props.count.confirmed})</span>
        </Link>
        <Link className="menu-item" to="/overview">
          Overview <span className="text-danger">({props.count.overview})</span>
        </Link>
      </ReactBurgerMenu>
    </div>
  )
}

export default Menu
