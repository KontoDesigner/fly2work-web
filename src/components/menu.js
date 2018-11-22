import React from 'react'
import { push as ReactBurgerMenu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import config from '../infrastructure/config'

const Menu = props => {
    return (
        <div id="push">
            <ReactBurgerMenu
                isOpen={props.isOpen}
                onStateChange={state => props.handleIsOpen(state.isOpen)}
                noOverlay={true}
                pageWrapId={'page-wrap'}
                outerContainerId={'outer-container'}>
                <h1>{config.name}</h1>

                <Link className="menu-item" to="/new">
                    New <span className="text-danger">({props.staffCount.new})</span>
                </Link>

                <Link className="menu-item" to="/waitingforapproval">
                    WFA <span className="text-danger">({props.staffCount.waitingForApproval})</span>
                </Link>

                <Link className="menu-item" to="/submitted">
                    Submitted <span className="text-danger">({props.staffCount.submitted})</span>
                </Link>

                <Link className="menu-item" to="/pending">
                    Pending <span className="text-danger">({props.staffCount.pending})</span>
                </Link>

                <Link className="menu-item" to="/confirmed">
                    Confirmed <span className="text-danger">({props.staffCount.confirmed})</span>
                </Link>

                <Link className="menu-item" to="/overview">
                    Overview <span className="text-danger">({props.staffCount.overview})</span>
                </Link>

                <div onClick={() => props.handleIsOpen(false)}>
                    <span className="text-danger">Close</span>
                </div>
            </ReactBurgerMenu>
        </div>
    )
}

export default Menu
