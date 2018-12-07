import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import Moment from 'react-moment'

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

const AuditModal = props => {
    return (
        <Modal size={'lg'} isOpen={props.open} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Status History</ModalHeader>
            <ModalBody style={{ padding: '0px' }}>
                <div className="tui-text-content table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th style={styles.th}>Updated By</th>
                                <th style={styles.th}>Status From</th>
                                <th style={styles.th}>Status To</th>
                                <th style={styles.th}>Green Light From</th>
                                <th style={styles.th}>Green Light To</th>
                                <th style={styles.th}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.audit.map((a, index) => (
                                <tr key={index}>
                                    <td style={styles.td} className="link">
                                        {a.updatedBy}
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
                                        {a.greenLightTo !== undefined && a.greenLightTo !== null ? (a.greenLightTo === true ? 'YES' : 'NO') : ''}
                                    </td>

                                    <td colSpan={2} style={styles.td} className="link">
                                        {a.date && <Moment format="YYYY-MM-DD HH:mm">{a.date}</Moment>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ModalBody>

            <ModalFooter>
                <Button style={styles.cancelBtn} onClick={props.toggle} className="btn btn-default ghost-white btn-sm" type="button">
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default AuditModal
