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
    thRemove: {
        width: '1px'
    },
    td: {
        cursor: 'default',
        textDecoration: 'none'
    },
    field: { overflowX: 'auto', resize: 'vertical', minHeight: '37px', boxShadow: 'none' },
    text: { backgroundColor: '#eee', padding: '18px 24px', whiteSpace: 'pre-wrap', color: '#333' },
    errorMessage: { marginBottom: '0' },
    label: { color: '#444' },
    addButton: { marginRight: '15px', marginTop: '15px' },
    textArea: { overflowX: 'auto', resize: 'vertical', minHeight: '37px', boxShadow: 'none' }
}

class Comments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }
    }

    handleText = e => {
        this.setState({ text: e.target.value })
    }

    add = async () => {
        this.props.ajaxStatusActions.beginAjaxCall()

        const req = {
            staffId: this.props.staff.id,
            comment: {
                text: this.state.text
            }
        }

        const res = await RestClient.post('comment/insert', req)

        this.props.ajaxStatusActions.endAjaxCall()

        if (res.ok === true) {
            this.setState({ text: '' })

            let comments = Object.assign([], this.props.comments)

            comments.push(res.comment)

            this.props.setFieldValue('comments', comments)

            toastr.success('', 'Successfully added comment', res)
        } else {
            if (res && res.errors) {
                toastr.error('', `Could not add comment - ${res.errors.join(', ')}`)
            } else {
                toastr.error('', 'Could not add comment')
            }
        }
    }

    remove = async commentId => {
        this.props.ajaxStatusActions.beginAjaxCall()

        const req = {
            staffId: this.props.staff.id,
            commentId: commentId
        }

        const res = await RestClient.post('comment/delete', req)

        this.props.ajaxStatusActions.endAjaxCall()

        if (res.ok === true) {
            let comments = Object.assign([], this.props.comments)

            const index = comments.findIndex(c => c.id === commentId)

            comments.splice(index, 1)

            this.props.setFieldValue('comments', comments)

            toastr.success('', 'Successfully removed comment', res)
        } else {
            if (res && res.errors) {
                toastr.error('', `Could not remove comment - ${res.errors.join(', ')}`)
            } else {
                toastr.error('', 'Could not remove comment')
            }
        }
    }

    render() {
        const comments = this.props.comments
            ? this.props.comments.sort(function(a, b) {
                  return new Date(b.created) - new Date(a.created)
              })
            : []

        return (
            <div className="tui-text-content table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th style={styles.th}>Created By</th>
                            <th style={styles.th}>Group</th>
                            <th style={styles.th}>Created</th>
                            <th style={styles.th} />
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment, index) => [
                            comment.id && (
                                <tr key={`0-${index}`}>
                                    <td style={styles.td} className="link">
                                        {comment.createdBy}
                                    </td>

                                    <td style={styles.td} className="link">
                                        {comment.group}
                                    </td>

                                    <td style={styles.td} colSpan={this.props.BTT ? 1 : 2} className="link">
                                        {comment.created && <Moment format="DD/MM/YYYY HH:mm">{comment.created}</Moment>}
                                    </td>

                                    {this.props.BTT && (
                                        <td style={styles.thRemove}>
                                            <Button
                                                onClick={e => this.remove(comment.id)}
                                                className="btn btn-sales btn-secondary btn-sm"
                                                type="button">
                                                REMOVE
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            ),

                            <tr key={`1-${index}`}>
                                <td style={{ padding: '0' }} colSpan={4}>
                                    <div style={styles.text}>{comment.text}</div>
                                </td>
                            </tr>
                        ])}

                        <tr>
                            <td colSpan={4}>
                                <label style={styles.label} htmlFor={'comment'}>
                                    Comment
                                </label>

                                <textarea
                                    value={this.state.text}
                                    onChange={this.handleText}
                                    name="comment"
                                    className="form-control"
                                    rows="3"
                                    style={styles.textArea}
                                />

                                <Button
                                    key={0}
                                    style={styles.addButton}
                                    onClick={e => this.add(e)}
                                    className="btn btn-function btn btn-secondary btn-sm"
                                    type="button">
                                    ADD
                                </Button>
                            </td>
                        </tr>
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
)(Comments)
