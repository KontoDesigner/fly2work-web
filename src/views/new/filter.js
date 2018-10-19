import React from 'react'
import { Row, Col } from 'reactstrap'

const styles = {
    input: {
        backgroundColor: '#2B3339',
        textAlign: 'center',
        color: '#fff',
        padding: '10px',
        fontSize: '1.5em',
        fontWeight: 700,
        marginBottom: '15px',
        width: '100%',
        placeholderTextColor: '#fff',
        placeholder: '#fff',
        outline: 'none',
        border: '0',
        borderRadius: '3px'
    }
}

const Search = props => {
    return (
        <Row>
            <Col>
                <input
                    type="text"
                    value={props.search}
                    onChange={props.handleSearch}
                    placeholder="Search.."
                    className="placeholder-white"
                    style={styles.input}
                />
            </Col>
        </Row>
    )
}

export default Search
