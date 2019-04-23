import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import Moment from 'react-moment'
import classnames from 'classnames'

const styles = {
    cancelBtn: { marginLeft: '10px' },
    th: {
        cursor: 'default'
    },
    td: {
        cursor: 'default',
        textDecoration: 'none'
    }
}

class AuditModal extends Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)

        this.state = {
            activeTab: 'status'
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
    }

    render() {
        return (
            <Modal size={'lg'} isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>History</ModalHeader>
                <ModalBody>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === 'status' })}
                                onClick={() => {
                                    this.toggle('status')
                                }}>
                                Status
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === 'email' })}
                                onClick={() => {
                                    this.toggle('email')
                                }}>
                                Email
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="status">
                            <div className="tui-text-content table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>Updated By</th>
                                            <th style={styles.th}>Group</th>
                                            <th style={styles.th}>Status From</th>
                                            <th style={styles.th}>Status To</th>
                                            <th style={styles.th}>Green Light From</th>
                                            <th style={styles.th}>Green Light To</th>
                                            <th style={styles.th}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.audit.map((a, index) => (
                                            <tr key={index}>
                                                <td style={styles.td} className="link">
                                                    {a.updatedBy}
                                                </td>

                                                <td style={styles.td} className="link">
                                                    {a.group}
                                                </td>

                                                <td style={styles.td} className="link">
                                                    {a.statusFrom}
                                                </td>

                                                <td style={styles.td} className="link">
                                                    {a.statusTo}
                                                </td>

                                                <td style={styles.td} className="link">
                                                    {a.greenLightFrom !== undefined && a.greenLightFrom !== null
                                                        ? a.greenLightFrom === true
                                                            ? 'YES'
                                                            : 'NO'
                                                        : ''}
                                                </td>

                                                <td style={styles.td} className="link">
                                                    {a.greenLightTo !== undefined && a.greenLightTo !== null
                                                        ? a.greenLightTo === true
                                                            ? 'YES'
                                                            : 'NO'
                                                        : ''}
                                                </td>

                                                <td colSpan={2} style={styles.td} className="link">
                                                    {a.date && <Moment format="DD/MM/YYYY HH:mm">{a.date}</Moment>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabPane>

                        <TabPane tabId="email">
                            <div className="tui-text-content table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>Sent</th>
                                            <th style={styles.th}>To</th>
                                            <th style={styles.th}>CC</th>
                                            <th style={styles.th}>attachments</th>
                                            <th style={styles.th}>Error</th>
                                            <th style={styles.th}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.sentEmails.map((se, index) => (
                                            <tr key={index}>
                                                <td style={styles.td} className="link">
                                                    {se.date && <Moment format="DD/MM/YYYY HH:mm">{se.date}</Moment>}
                                                </td>

                                                <td style={styles.td} className="link">
                                                    {se.to ? se.to.join(', ') : ''}
                                                </td>

                                                <td style={styles.td} className="link">
                                                    {se.cc ? se.cc.join(', ') : ''}
                                                </td>

                                                <td style={styles.td} className="link">
                                                    {se.attachments}
                                                </td>

                                                <td style={styles.td} className="link">
                                                    {se.error}
                                                </td>

                                                <td style={styles.td} className="link">
                                                    {se.statusText}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabPane>
                    </TabContent>
                </ModalBody>

                <ModalFooter>
                    <Button style={styles.cancelBtn} onClick={this.props.toggle} className="btn btn-default ghost-white btn-sm" type="button">
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default AuditModal
