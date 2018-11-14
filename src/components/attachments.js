import React, { Component } from 'react'
import { Button } from 'reactstrap'
import Moment from 'react-moment'
import * as RestClient from '../infrastructure/restClient'
import * as ajaxStatusActions from '../actions/ajaxStatusActions'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const styles = {
    th: {
        cursor: 'default'
    },
    td: {
        cursor: 'default',
        textDecoration: 'none'
    }
}

class Attachments extends Component {
    constructor(props) {
        super(props)

        this.downloadBtn = React.createRef()
    }

    download = async attachment => {
        this.props.ajaxStatusActions.beginAjaxCall()

        const req = {
            staffId: this.props.staff.id,
            id: attachment.id
        }

        await RestClient.download('attachment/download', req, attachment.name)

        this.props.ajaxStatusActions.endAjaxCall()
    }

    upload = async file => {
        this.props.ajaxStatusActions.beginAjaxCall()

        const res = await RestClient.upload('attachment/upload', file, [{ key: 'staffId', value: this.props.staff.id }])

        this.props.ajaxStatusActions.endAjaxCall()

        if (res.ok === true) {
            let attachments = Object.assign([], this.props.staff.attachments)

            attachments.push(res.attachment)

            this.props.handleStaffAttachments(attachments)

            toastr.success('', 'Successfully uploaded file', res)
        } else {
            toastr.error('', 'Could not upload file')
        }

        this.downloadBtn.value = ''
    }

    delete = async index => {
        const req = {
            staffId: this.props.staff.id,
            id: this.props.staff.attachments[index].id
        }

        this.props.ajaxStatusActions.beginAjaxCall()

        const res = await RestClient.post('attachment/delete', req)

        this.props.ajaxStatusActions.endAjaxCall()

        if (res.ok === true) {
            let attachments = Object.assign([], this.props.staff.attachments)

            attachments.splice(index, 1)

            this.props.handleStaffAttachments(attachments)

            toastr.success('', 'Successfully deleted file', res)
        } else {
            toastr.error('', 'Could not delete file')
        }
    }

    render() {
        return (
            <div className="tui-text-content table-responsive">
                <input
                    className="hidden"
                    ref={ref => {
                        this.downloadBtn = ref
                    }}
                    onChange={e => this.upload(e.target.files[0])}
                    type="file"
                    name="file"
                    id="file"
                />

                <table>
                    <thead>
                        <tr>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Created By</th>
                            <th style={styles.th}>Group</th>
                            <th style={styles.th}>Created</th>
                            <th style={styles.th}>Size</th>
                            <th style={{ ...styles.th, ...{ width: '1px', padding: '12px 24px 11px 24px' } }}>
                                <Button
                                    disabled={this.props.disabled}
                                    style={{ width: '145px' }}
                                    onClick={() => {
                                        this.downloadBtn.click()
                                    }}
                                    className="btn btn-default ghost-white btn-sm"
                                    type="button">
                                    UPLOAD
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.staff.attachments &&
                            this.props.staff.attachments.map((attachment, index) => (
                                <tr key={attachment.id}>
                                    <td onClick={() => this.download(attachment)} className="link">
                                        {attachment.name}
                                    </td>

                                    <td onClick={() => this.download(attachment)} className="link">
                                        {attachment.createdBy}
                                    </td>

                                    <td onClick={() => this.download(attachment)} className="link">
                                        {attachment.group}
                                    </td>

                                    <td onClick={() => this.download(attachment)} className="link">
                                        {attachment.created && <Moment format="YYYY-MM-DD HH:mm">{attachment.created}</Moment>}
                                    </td>

                                    <td onClick={() => this.download(attachment)} className="link">
                                        {attachment.size}
                                    </td>

                                    <td>
                                        <Button
                                            onClick={() => this.delete(index)}
                                            className="btn btn-sales btn-sm"
                                            type="button"
                                            disabled={this.props.disabled}>
                                            DELETE
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ajaxStatusActions: bindActionCreators(ajaxStatusActions, dispatch)
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Attachments)
