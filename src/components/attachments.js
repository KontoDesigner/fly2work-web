import React, { Component } from 'react'
import { Button } from 'reactstrap'
import Moment from 'react-moment'
import * as RestClient from '../infrastructure/restClient'

class Attachments extends Component {
    constructor(props) {
        super(props)

        this.downloadBtn = React.createRef()
    }

    download = attachment => {
        RestClient.download('pdf', { id: attachment.id }, `${attachment.name}.${attachment.extension}`)
    }

    upload = file => {
        RestClient.upload('attachment/upload', file, [{ key: 'staffId', value: this.props.staff.id }])
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
                            <th>Extension</th>
                            <th>Created</th>
                            <th>Size</th>
                            <th style={{ width: '1px', padding: '12px 24px 11px 24px' }}>
                                <Button
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
                                    <td className="link">{attachment.name}</td>

                                    <td className="link">{attachment.extension}</td>

                                    <td className="link">{attachment.created && <Moment format="YYYY-MM-DD mm:HH">{attachment.created}</Moment>}</td>

                                    <td className="link">{attachment.size}</td>

                                    <td>
                                        <Button onClick={() => this.download(attachment)} className="btn btn-function btn-sm" type="button">
                                            DOWNLOAD
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

export default Attachments
