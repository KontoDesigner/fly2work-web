import React from 'react'
import { Card, CardBody, CardHeader, Col } from 'reactstrap'
import { Field, ErrorMessage } from 'formik'
import DatePicker from './datePicker'
import { Button } from 'reactstrap'

const styles = {
    label: { color: '#444' },
    cardBody: { background: '#f3f0ec', padding: '18px 12px' },
    addButton: { marginRight: '10px' }
}

function parseCost(val) {
    var parsed = parseInt(val)

    if (isNaN(parsed)) {
        return 0
    }

    return parsed
}

const Flights = props => {
    const enabledFlights = props.flights.filter(f => f.enabled === true).length

    const remove = async index => {
        let flights = Object.assign([], props.flights)

        flights[index] = {
            enabled: false,
            departureAirport: '',
            arrivalAirport: '',
            flightNumber: '',
            flightArrivalTime: '',
            flightDepartureTime: '',
            hotelCost: '',
            flightCost: '',
            xbagCost: '',
            totalCost: ''
        }

        props.setFieldValue('flights', flights)
    }

    const add = () => {
        let flights = Object.assign([], props.flights)

        flights[enabledFlights].enabled = true

        props.setFieldValue('flights', flights)
    }

    return (
        <div>
            {props.flights.map(
                (flight, index) =>
                    flight.enabled === true && (
                        <Card style={{ marginBottom: '20px' }} key={index}>
                            <CardHeader style={{ cursor: 'pointer' }}>
                                <span>#{index + 1} Flight</span>
                            </CardHeader>
                            <CardBody style={styles.cardBody}>
                                <div className="inner-form">
                                    <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                        <div className="form-item">
                                            <label style={styles.label} htmlFor={`flights[${index}].flightNumber`}>
                                                Flight Number
                                            </label>
                                            <Field
                                                disabled={props.disabled}
                                                className="form-control"
                                                type="text"
                                                name={`flights[${index}].flightNumber`}
                                            />
                                            <ErrorMessage className="message" name={`flights[${index}].flightNumber`} component="div" />
                                        </div>
                                    </Col>

                                    <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                        <div className="form-item">
                                            <label style={styles.label} htmlFor={`flights[${index}].flightDepartureTime`}>
                                                Flight Departure Time
                                            </label>
                                            <Field
                                                disabled={props.disabled}
                                                name={`flights[${index}].flightDepartureTime`}
                                                component={DatePicker}
                                                setFieldTouched={props.setFieldTouched}
                                            />
                                            <ErrorMessage className="message" name={`flights[${index}].flightDepartureTime`} component="div" />
                                        </div>
                                    </Col>

                                    <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                        <div className="form-item">
                                            <label style={styles.label} htmlFor={`flights[${index}].flightArrivalTime`}>
                                                Flight Arrival Time
                                            </label>
                                            <Field
                                                disabled={props.disabled}
                                                name={`flights[${index}].flightArrivalTime`}
                                                component={DatePicker}
                                                setFieldTouched={props.setFieldTouched}
                                            />
                                            <ErrorMessage className="message" name={`flights[${index}].flightArrivalTime`} component="div" />
                                        </div>
                                    </Col>

                                    <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                        <div className="form-item">
                                            <label style={styles.label} htmlFor={`flights[${index}].departureAirport`}>
                                                Departure Airport
                                            </label>
                                            <Field
                                                disabled={props.disabled}
                                                className="form-control"
                                                type="text"
                                                name={`flights[${index}].departureAirport`}
                                            />
                                            <ErrorMessage className="message" name={`flights[${index}].departureAirport`} component="div" />
                                        </div>
                                    </Col>

                                    <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                        <div className="form-item">
                                            <label style={styles.label} htmlFor={`flights[${index}].arrivalAirport`}>
                                                Arrival Airport
                                            </label>
                                            <Field
                                                disabled={props.disabled}
                                                className="form-control"
                                                type="text"
                                                name={`flights[${index}].arrivalAirport`}
                                            />
                                            <ErrorMessage className="message" name={`flights[${index}].arrivalAirport`} component="div" />
                                        </div>
                                    </Col>

                                    <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                        <div className="form-item">
                                            <label style={styles.label} htmlFor={`flights[${index}].flightCost`}>
                                                Flight Cost
                                            </label>
                                            <Field
                                                disabled={props.disabled}
                                                className="form-control"
                                                type="text"
                                                name={`flights[${index}].flightCost`}
                                            />
                                            <ErrorMessage className="message" name={`flights[${index}].flightCost`} component="div" />
                                        </div>
                                    </Col>

                                    <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                        <div className="form-item">
                                            <label style={styles.label} htmlFor={`flights[${index}].xbagCost`}>
                                                Xbag Cost
                                            </label>
                                            <Field
                                                disabled={props.disabled}
                                                className="form-control"
                                                type="text"
                                                name={`flights[${index}].xbagCost`}
                                            />
                                            <ErrorMessage className="message" name={`flights[${index}].xbagCost`} component="div" />
                                        </div>
                                    </Col>

                                    <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                        <div className="form-item">
                                            <label style={styles.label} htmlFor={`flights[${index}].hotelCost`}>
                                                Hotel Cost
                                            </label>
                                            <Field
                                                disabled={props.disabled}
                                                className="form-control"
                                                type="text"
                                                name={`flights[${index}].hotelCost`}
                                            />
                                            <ErrorMessage className="message" name={`flights[${index}].hotelCost`} component="div" />
                                        </div>
                                    </Col>

                                    <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                        <div className="form-item">
                                            <label style={styles.label} htmlFor={`flights[${index}].totalCost`}>
                                                Total Cost
                                            </label>
                                            <Field
                                                disabled={true}
                                                className="form-control"
                                                type="text"
                                                name={`flights[${index}].totalCost`}
                                                value={parseCost(flight.flightCost) + parseCost(flight.xbagCost) + parseCost(flight.hotelCost)}
                                            />
                                            <ErrorMessage className="message" name={`flights[${index}].totalCost`} component="div" />
                                        </div>
                                    </Col>
                                </div>

                                <Col xl="12" lg="12" md="12" sm="12" xs="12">
                                    {enabledFlights < 3 && index === enabledFlights - 1 && (
                                        <Button
                                            style={styles.addButton}
                                            onClick={() => add()}
                                            className="btn btn-function btn btn-secondary btn-sm"
                                            type="button">
                                            ADD {`#${enabledFlights + 1} FLIGHT`}
                                        </Button>
                                    )}

                                    {index !== 0 && index === enabledFlights - 1 && (
                                        <Button onClick={() => remove(index)} className="btn btn-sales btn-sm" type="button">
                                            REMOVE
                                        </Button>
                                    )}
                                </Col>
                            </CardBody>
                        </Card>
                    )
            )}
        </div>
    )
}

export default Flights
