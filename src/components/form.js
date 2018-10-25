import React from 'react'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'
import Select from './select'
import DatePicker from './datePicker'
import Checkbox from './checkbox'
import Creatable from './creatable'
import Gender from './gender'
import { Row, Col, Button } from 'reactstrap'
import formValidation from './formValidation'

const Form = props => {
    return (
        <Formik
            initialValues={props.staff}
            validationSchema={formValidation}
            onSubmit={(values, actions) => {
                props.handleStaff(values)
            }}
            render={({ errors, touched, setFieldTouched }) => (
                <FormikForm>
                    <Row>
                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="id">Id</label>
                                <Field disabled={props.disabled} className="form-control" type="text" name="id" />
                                <ErrorMessage className="message" name="id" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="name">Name</label>
                                <Field disabled={props.disabled} className="form-control" type="text" name="name" />
                                <ErrorMessage className="message" name="name" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="dateOfBirth">Date Of Birth</label>
                                <Field disabled={props.disabled} name={'dateOfBirth'} component={DatePicker} setFieldTouched={setFieldTouched} />
                                {errors.dateOfBirth && touched.dateOfBirth && <div className="message">{errors.dateOfBirth}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="sourceMarket">Source Market</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'sourceMarket'}
                                    component={Select}
                                    options={props.sourceMarkets}
                                    setFieldTouched={setFieldTouched}
                                />
                                {errors.sourceMarket && touched.sourceMarket && <div className="message">{errors.sourceMarket}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="positionStart">Position Start</label>
                                <Field disabled={props.disabled} name={'positionStart'} component={DatePicker} setFieldTouched={setFieldTouched} />
                                {errors.positionStart && touched.positionStart && <div className="message">{errors.positionStart}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="dateOfFlight">Date Of Flight</label>
                                <Field disabled={props.disabled} name={'dateOfFlight'} component={DatePicker} setFieldTouched={setFieldTouched} />
                                {errors.dateOfFlight && touched.dateOfFlight && <div className="message">{errors.dateOfFlight}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="hotelNeeded">Hotel Needed</label>
                                <Field disabled={props.disabled} name={'hotelNeeded'} component={Checkbox} />
                                {errors.hotelNeeded && touched.hotelNeeded && <div className="message">{errors.hotelNeeded}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="hotelStart">Hotel Start</label>
                                <Field disabled={props.disabled} name={'hotelStart'} component={DatePicker} setFieldTouched={setFieldTouched} />
                                {errors.hotelStart && touched.hotelStart && <div className="message">{errors.hotelStart}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="hotelEnd">Hotel End</label>
                                <Field disabled={props.disabled} name={'hotelEnd'} component={DatePicker} setFieldTouched={setFieldTouched} />
                                {errors.hotelEnd && touched.hotelEnd && <div className="message">{errors.hotelEnd}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="role">Role</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'role'}
                                    component={Select}
                                    options={props.roles}
                                    setFieldTouched={setFieldTouched}
                                />
                                {errors.role && touched.role && <div className="message">{errors.role}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="destination">Destination</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'destination'}
                                    component={Select}
                                    options={props.destinations}
                                    setFieldTouched={setFieldTouched}
                                />
                                {errors.destination && touched.destination && <div className="message">{errors.destination}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <Field disabled={props.disabled} name={'gender'} component={Gender} />
                                {errors.gender && touched.gender && <div className="message">{errors.gender}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="phone">Phone</label>
                                <Field disabled={props.disabled} className="form-control" type="text" name="phone" />
                                <ErrorMessage className="message" name="phone" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="departureAirport">Departure Airport</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'departureAirport'}
                                    component={Creatable}
                                    setFieldTouched={setFieldTouched}
                                    noOptionsMessage="Type to create..."
                                />
                                {errors.departureAirport && touched.departureAirport && <div className="message">{errors.departureAirport}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="arrivalAirport">Arrival Airport</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'arrivalAirport'}
                                    component={Creatable}
                                    setFieldTouched={setFieldTouched}
                                    noOptionsMessage="Type to create..."
                                />
                                {errors.arrivalAirport && touched.arrivalAirport && <div className="message">{errors.arrivalAirport}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="typeOfFlight">Type Of Flight</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'typeOfFlight'}
                                    component={Select}
                                    options={props.flights}
                                    setFieldTouched={setFieldTouched}
                                />
                                {errors.typeOfFlight && touched.typeOfFlight && <div className="message">{errors.typeOfFlight}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="6" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="status">Status</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'status'}
                                    component={Select}
                                    options={props.statuses}
                                    setFieldTouched={setFieldTouched}
                                />
                                {errors.status && touched.status && <div className="message">{errors.status}</div>}
                            </div>
                        </Col>

                        <Col xl="12" lg="612" md="12" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="comment">Comment</label>
                                <Field disabled={props.disabled} className="form-control" component="textarea" rows="5" name="comment" />
                                <ErrorMessage className="message" name="comment" component="div" />
                            </div>
                        </Col>
                    </Row>

                    {!props.disabled && (
                        <Row className="divider-up">
                            <Col xl="12" lg="612" md="12" sm="12" xs="12">
                                <Button className="btn btn-primary" type="submit" color="success">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    )}
                </FormikForm>
            )}
        />
    )
}

export default Form