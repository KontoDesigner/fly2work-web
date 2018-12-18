import React from 'react'
import { Card, CardBody, CardHeader, Col } from 'reactstrap'
import { Field, ErrorMessage } from 'formik'
import DatePicker from './datePicker'
import { Button } from 'reactstrap'

const styles = {
    label: { color: '#444' },
    cardBody: { background: '#f3f0ec', padding: '18px 12px 12px 12px' },
    cardHeader: { fontWeight: 'bold' },
    addButton: { marginRight: '10px', marginTop: '6px', marginBottom: '6px' },
    removeButton: { marginTop: '6px', marginBottom: '6px' }
}

function parseCost(val) {
    var parsed = parseInt(val)

    if (isNaN(parsed)) {
        return 0
    }

    return parsed
}

const Flights = props => {
    const remove = async index => {
        let flights = Object.assign([], props.flights)

        flights.splice(index, 1)

        props.setFieldValue('flights', flights)
    }

    const add = () => {
        console.log(props.initialValues)

        let flights = Object.assign([], props.flights)

        flights.push(props.initialValues.flights[0])

        props.setFieldValue('flights', flights)
    }

    return (
        <div>
            {props.flights.map((flight, index) => (
                <Card style={index === props.flights.length - 1 ? { marginBottom: '0' } : { marginBottom: '20px' }} key={index}>
                    <CardHeader style={styles.cardHeader}>
                        <span>#{index + 1} Flight</span>
                    </CardHeader>
                    <CardBody style={styles.cardBody}>
                        <div className="inner-form">
                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label style={styles.label} htmlFor={`flights[${index}].flightNumber`}>
                                        Flight Number <span className="text-danger">*</span>
                                    </label>
                                    <Field disabled={props.disabled} className="form-control" type="text" name={`flights[${index}].flightNumber`} />
                                    <ErrorMessage className="message" name={`flights[${index}].flightNumber`} component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label style={styles.label} htmlFor={`flights[${index}].flightDepartureTime`}>
                                        Flight Departure Time <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={props.disabled}
                                        name={`flights[${index}].flightDepartureTime`}
                                        component={DatePicker}
                                        setFieldTouched={props.setFieldTouched}
                                        dateFormat={false}
                                        timeFormat={'HH:mm'}
                                    />
                                    <ErrorMessage className="message" name={`flights[${index}].flightDepartureTime`} component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label style={styles.label} htmlFor={`flights[${index}].flightArrivalTime`}>
                                        Flight Arrival Time <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={props.disabled}
                                        name={`flights[${index}].flightArrivalTime`}
                                        component={DatePicker}
                                        setFieldTouched={props.setFieldTouched}
                                        dateFormat={false}
                                        timeFormat={'HH:mm'}
                                    />
                                    <ErrorMessage className="message" name={`flights[${index}].flightArrivalTime`} component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label style={styles.label} htmlFor={`flights[${index}].departureAirport`}>
                                        Departure Airport <span className="text-danger">*</span>
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
                                        Arrival Airport <span className="text-danger">*</span>
                                    </label>
                                    <Field disabled={props.disabled} className="form-control" type="text" name={`flights[${index}].arrivalAirport`} />
                                    <ErrorMessage className="message" name={`flights[${index}].arrivalAirport`} component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label style={styles.label} htmlFor={`flights[${index}].confirmedFlightDate`}>
                                        Confirmed Flight Date <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={props.disabled}
                                        name={`flights[${index}].confirmedFlightDate`}
                                        component={DatePicker}
                                        setFieldTouched={props.setFieldTouched}
                                    />
                                    <ErrorMessage className="message" name={`flights[${index}].confirmedFlightDate`} component="div" />
                                </div>
                            </Col>

                            {props.values.hotelNeeded === true && [
                                <Col key={0} xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label style={styles.label} htmlFor={`flights[${index}].hotelNeededHotelName`}>
                                            Hotel Name (HN) <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            disabled={props.disabled}
                                            className="form-control"
                                            type="text"
                                            name={`flights[${index}].hotelNeededHotelName`}
                                        />
                                        <ErrorMessage className="message" name={`flights[${index}].hotelNeededHotelName`} component="div" />
                                    </div>
                                </Col>,
                                <Col key={1} xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label style={styles.label} htmlFor={`flights[${index}].hotelNeededHotelStart`}>
                                            Hotel Start (HN) <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            disabled={props.disabled}
                                            name={`flights[${index}].hotelNeededHotelStart`}
                                            component={DatePicker}
                                            setFieldTouched={props.setFieldTouched}
                                        />
                                        <ErrorMessage className="message" name={`flights[${index}].hotelNeededHotelStart`} component="div" />
                                    </div>
                                </Col>,
                                <Col key={2} xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label style={styles.label} htmlFor={`flights[${index}].hotelNeededHotelEnd`}>
                                            Hotel End (HN) <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            disabled={props.disabled}
                                            name={`flights[${index}].hotelNeededHotelEnd`}
                                            component={DatePicker}
                                            setFieldTouched={props.setFieldTouched}
                                        />
                                        <ErrorMessage className="message" name={`flights[${index}].hotelNeededHotelEnd`} component="div" />
                                    </div>
                                </Col>
                            ]}

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label style={styles.label} htmlFor={`flights[${index}].flightCost`}>
                                        Flight Cost <span className="text-danger">*</span>
                                    </label>
                                    <Field disabled={props.disabled} className="form-control" type="text" name={`flights[${index}].flightCost`} />
                                    <ErrorMessage className="message" name={`flights[${index}].flightCost`} component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label style={styles.label} htmlFor={`flights[${index}].xbagCost`}>
                                        Xbag Cost <span className="text-danger">*</span>
                                    </label>
                                    <Field disabled={props.disabled} className="form-control" type="text" name={`flights[${index}].xbagCost`} />
                                    <ErrorMessage className="message" name={`flights[${index}].xbagCost`} component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label style={styles.label} htmlFor={`flights[${index}].hotelCost`}>
                                        Hotel Cost <span className="text-danger">*</span>
                                    </label>
                                    <Field disabled={props.disabled} className="form-control" type="text" name={`flights[${index}].hotelCost`} />
                                    <ErrorMessage className="message" name={`flights[${index}].hotelCost`} component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label style={styles.label}>Total Cost</label>
                                    <Field
                                        disabled={true}
                                        className="form-control"
                                        type="text"
                                        value={parseCost(flight.flightCost) + parseCost(flight.xbagCost) + parseCost(flight.hotelCost)}
                                    />
                                </div>
                            </Col>
                        </div>

                        <Col xl="12" lg="12" md="12" sm="12" xs="12">
                            {index === props.flights.length - 1 && index < 2 && !props.disabled && (
                                <Button
                                    style={styles.addButton}
                                    onClick={() => add()}
                                    className="btn btn-function btn btn-secondary btn-sm"
                                    type="button">
                                    ADD {`#${props.flights.length + 1} FLIGHT`}
                                </Button>
                            )}

                            {index !== 0 && index === props.flights.length - 1 && !props.disabled && (
                                <Button styles={styles.removeButton} onClick={() => remove(index)} className="btn btn-sales btn-sm" type="button">
                                    REMOVE
                                </Button>
                            )}
                        </Col>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}

export default Flights
