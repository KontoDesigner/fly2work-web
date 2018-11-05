import React, { Component } from 'react'
import { Button } from 'reactstrap'
import Moment from 'react-moment'
import * as RestClient from '../infrastructure/restClient'
import * as ajaxStatusActions from '../actions/ajaxStatusActions'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
            toastr.success('', 'Successfully uploaded file', res)
        } else {
            toastr.error('', 'Could not upload file')
        }
    }

    delete = async id => {
        const req = {
            staffId: this.props.staff.id,
            id: id
        }

        this.props.ajaxStatusActions.beginAjaxCall()

        const res = await RestClient.post('attachment/delete', req)

        this.props.ajaxStatusActions.endAjaxCall()

        if (res.ok === true) {
            toastr.success('', 'Successfully deleted file', res)
        } else {
            toastr.error('', 'Could not delete file')
        }
    }

    render() {
        return (
            <div className="tui-text-content">
                <label htmlFor="attachments">Attachments</label>

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
                            <th>Name</th>
                            <th>Created</th>
                            <th>Size</th>
                            <th style={{ width: '1px', padding: '12px 24px 11px 24px' }}>
                                <Button
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
                            this.props.staff.attachments.map(attachment => (
                                <tr key={attachment.id}>
                                    <td onClick={() => this.download(attachment)} className="link">
                                        {attachment.name}
                                    </td>

                                    <td onClick={() => this.download(attachment)} className="link">
                                        {attachment.created && <Moment format="YYYY-MM-DD mm:HH">{attachment.created}</Moment>}
                                    </td>

                                    <td onClick={() => this.download(attachment)} className="link">
                                        {attachment.size}
                                    </td>

                                    <td>
                                        <Button onClick={() => this.delete(attachment.id)} className="btn btn-sales btn-sm" type="button">
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
