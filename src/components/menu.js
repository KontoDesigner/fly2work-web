import React from 'react'
import { push as ReactBurgerMenu } from 'react-burger-menu'
import { Link } from 'react-router-dom'

const close = {
  isOpen: false
}

const Menu = props => {
  return (
    <div id="push">
      <ReactBurgerMenu
        onStateChange={state => props.handleIsMenuOpen(state)}
        isOpen={props.isMenuOpen}
        noOverlay={true}
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}>
        <h1>CTX</h1>
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
        <div onClick={() => props.handleIsMenuOpen(close)}>
          <span className="text-danger">Close</span>
        </div>
      </ReactBurgerMenu>
    </div>
  )
}

export default Menu
