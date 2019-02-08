import React from 'react'
import { Row, Col } from 'reactstrap'

const styles = {
    input: {
        backgroundColor: '#2B3339',
        textAlign: 'center',
        color: '#fff',
        padding: '10px',
        fontSize: '1.25em',
        fontWeight: 700,
        marginBottom: '20px',
        width: '100%',
        placeholderTextColor: '#fff',
        placeholder: '#fff',
        outline: 'none',
        border: '0',
        borderRadius: '0'
    }
}

const Search = props => {
    return (
        <Row>
            <Col xl="12" lg="12" md="12" sm="12" xs="12">
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
