import React from 'react'

const styles = {
    title: {
        paddingTop: '2em'
    },
    imgContainer: {
        textAlign: 'center',
        paddingTop: '1em'
    }
}

const Maintenance = props => {
    return (
        <div>
            <h2 style={styles.title}>OOPSIE WOOPSIE!!</h2>

            <p>Uwu We made a funky wucky!! A wittle funny boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!</p>

            <div style={styles.imgContainer}>
                <iframe
                    title="monkey"
                    src="https://giphy.com/embed/mDOwJTgHHo9IA"
                    width="480"
                    height="330"
                    frameBorder="0"
                    className="giphy-embed"
                    allowFullScreen
                />
            </div>
        </div>
    )
}

export default Maintenance
