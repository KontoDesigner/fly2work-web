import React from 'react'
import { push as ReactBurgerMenu } from 'react-burger-menu'
import { NavLink as Link } from 'react-router-dom'
import config from '../infrastructure/config'

const logOut = () => {
    localStorage.clear()

    const tenantId = 'e3e1f65b-b973-440d-b61c-bc895fc98e28'
    const redirect = window.location

    window.location.assign(`https://login.microsoftonline.com/${tenantId}/oauth2/logout?post_logout_redirect_uri=${redirect}`)
}

const styles = {
    env: {
        fontSize: '15px',
        marginTop: '-20px',
        marginLeft: '-13px'
    }
}

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

                {config.env !== 'PROD' && (
                    <div className="text-danger" style={styles.env}>
                        {config.env}
                    </div>
                )}

                <Link activeClassName={'active'} className="menu-item" to="/new">
                    New <span className="text-danger">({props.staffCount.new})</span>
                </Link>

                <Link activeClassName={'active'} className="menu-item" to="/pendinghr">
                    Pending HR <span className="text-danger">({props.staffCount.pendingHR})</span>
                </Link>

                <Link activeClassName={'active'} className="menu-item" to="/pendingbtt">
                    Pending BTT <span className="text-danger">({props.staffCount.pendingBTT})</span>
                </Link>

                <Link activeClassName={'active'} className="menu-item" to="/pendingdes">
                    Pending DES <span className="text-danger">({props.staffCount.pendingDES})</span>
                </Link>

                <Link activeClassName={'active'} className="menu-item" to="/confirmed">
                    Confirmed <span className="text-danger">({props.staffCount.confirmed})</span>
                </Link>

                <Link activeClassName={'active'} className="menu-item" to="/overview">
                    Overview <span className="text-danger">({props.staffCount.overview})</span>
                </Link>

                <div onClick={() => logOut()}>
                    <span className="text-warning">LOG OUT</span>
                </div>

                <div onClick={() => props.handleIsOpen(false)}>
                    <span className="text-danger">Close</span>
                </div>
            </ReactBurgerMenu>
        </div>
    )
}

export default Menu
