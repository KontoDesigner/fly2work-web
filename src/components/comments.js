import React from 'react'
import { Button } from 'reactstrap'
import Moment from 'react-moment'
import { Field, ErrorMessage } from 'formik'

const styles = {
    th: {
        cursor: 'default'
    },
    td: {
        cursor: 'default',
        textDecoration: 'none'
    },
    field: { overflowX: 'auto', resize: 'vertical', minHeight: '37px', boxShadow: 'none' },
    text: { backgroundColor: '#eee', padding: '18px 24px', whiteSpace: 'pre-wrap', color: '#333' },
    errorMessage: { marginBottom: '0' },
    button: { marginTop: '10px' },
    label: { color: '#555' }
}

const Comments = props => {
    const add = () => {
        let comments = Object.assign([], props.comments)

        const comment = {
            id: null,
            text: '',
            createdBy: null,
            group: null,
            created: null
        }

        comments.push(comment)

        props.setFieldValue('comments', comments)
    }

    const remove = async index => {
        let comments = Object.assign([], props.comments)

        comments.splice(index, 1)

        props.setFieldValue('comments', comments)
    }

    const comments = props.comments
        ? props.comments.sort(function(a, b) {
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
                        <th style={{ ...styles.th, ...{ width: '1px', padding: '12px 24px 11px 24px', whiteSpace: 'nowrap' } }}>
                            <Button disabled={props.disabled} onClick={() => add()} className="btn btn-default ghost-white btn-sm" type="button">
                                Add
                            </Button>
                        </th>
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

                                <td colSpan={2} style={styles.td} className="link">
                                    {comment.created && <Moment format="YYYY-MM-DD HH:mm">{comment.created}</Moment>}
                                </td>
                            </tr>
                        ),

                        <tr key={`1-${index}`}>
                            <td style={comment.id ? { padding: '0' } : {}} colSpan={4}>
                                {!comment.id && (
                                    <label style={styles.label} htmlFor={`comments[${index}].text`}>
                                        Comment
                                    </label>
                                )}

                                {!comment.id ? (
                                    <Field
                                        disabled={props.disabled || comment.id}
                                        className="form-control"
                                        component="textarea"
                                        style={styles.field}
                                        rows="3"
                                        name={`comments[${index}].text`}
                                    />
                                ) : (
                                    <div style={styles.text}>{comment.text}</div>
                                )}
                                <ErrorMessage style={styles.errorMessage} className="message" name={`comments[${index}].text`} component="div" />

                                {!comment.id && (
                                    <Button style={styles.button} onClick={() => remove(index)} className="btn btn-sales btn-sm" type="button">
                                        REMOVE
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ])}
                </tbody>
            </table>
        </div>
    )
}

export default Comments
