import React from 'react'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'
import Select from './select'
import DatePicker from './datePicker'
import Checkbox from './checkbox'
import Creatable from './creatable'
import Gender from './gender'
import { Row, Col, Button } from 'reactstrap'
import bsValidation from '../validations/bsValidation'
import bttValidation from '../validations/bttValidation'
import * as RestClient from '../infrastructure/restClient'
import moment from 'moment'
import { UserTypes as userTypes } from '../constants/userConstants'
import Attachments from './attachments'
import Comments from './comments'
import lodash from 'lodash'

function parseCost(val) {
    var parsed = parseInt(val)

    if (isNaN(parsed)) {
        return 0
    }

    return parsed
}

const Form = props => {
    const downloadPdf = () => {
        RestClient.download('pdf', props.staff, `${props.staff.firstName} ${props.staff.lastName} - ${moment().format('YYYY-MM-DD HH:mm')}.pdf`)
    }

    return (
        <Formik
            initialValues={props.staff}
            validationSchema={props.user.userType === userTypes.BS ? bsValidation : bttValidation}
            onSubmit={(values, actions) => {
                props.handleStaff(values)
            }}
            render={({ errors, touched, setFieldTouched, values, setFieldValue }) => (
                <FormikForm>
                    <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                            <div className="hr">
                                <span className="hr-title">BS</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="id">Id</label>
                                <Field disabled={props.disabled} className="form-control" type="text" name="id" />
                                <ErrorMessage className="message" name="id" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="firstName">First Name</label>
                                <Field disabled={props.disabled} className="form-control" type="text" name="firstName" />
                                <ErrorMessage className="message" name="firstName" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="lastName">Last Name</label>
                                <Field disabled={props.disabled} className="form-control" type="text" name="lastName" />
                                <ErrorMessage className="message" name="lastName" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="passportNumber">Passport Number</label>
                                <Field disabled={props.disabled} className="form-control" type="text" name="passportNumber" />
                                <ErrorMessage className="message" name="passportNumber" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="jobTitle">Job Title</label>
                                <Field disabled={props.disabled} className="form-control" type="text" name="jobTitle" />
                                <ErrorMessage className="message" name="jobTitle" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="phone">Phone</label>
                                <Field disabled={props.disabled} className="form-control" type="text" name="phone" />
                                <ErrorMessage className="message" name="phone" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="dateOfBirth">Date Of Birth</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'dateOfBirth'}
                                    component={DatePicker}
                                    setFieldTouched={setFieldTouched}
                                    dateFormat={'DD/MM/YYYY'}
                                />
                                {errors.dateOfBirth && touched.dateOfBirth && <div className="message">{errors.dateOfBirth}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="positionStart">Planned Assignment Start Date</label>
                                <Field disabled={props.disabled} name={'positionStart'} component={DatePicker} setFieldTouched={setFieldTouched} />
                                {errors.positionStart && touched.positionStart && <div className="message">{errors.positionStart}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="dateOfFlight">Date Of Flight</label>
                                <Field disabled={props.disabled} name={'dateOfFlight'} component={DatePicker} setFieldTouched={setFieldTouched} />
                                {errors.dateOfFlight && touched.dateOfFlight && <div className="message">{errors.dateOfFlight}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="sourceMarket">Source Market</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'sourceMarket'}
                                    component={Select}
                                    options={props.sourceMarkets}
                                    setFieldTouched={setFieldTouched}
                                    valueKey={'id'}
                                    labelKey={'name'}
                                />
                                {errors.sourceMarket && touched.sourceMarket && <div className="message">{errors.sourceMarket}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="destination">Destination</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'destination'}
                                    component={Select}
                                    options={props.destinations}
                                    setFieldTouched={setFieldTouched}
                                    valueKey={'destination'}
                                    labelKey={'destination'}
                                />
                                {errors.destination && touched.destination && <div className="message">{errors.destination}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="departureAirport">Departure Airport</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'departureAirport'}
                                    placeholder={'Please give 3 options'}
                                    component={Creatable}
                                    setFieldTouched={setFieldTouched}
                                    noOptionsMessage="Type to create.."
                                />
                                {errors.departureAirport && touched.departureAirport && <div className="message">{errors.departureAirport}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="arrivalAirport">Arrival Airport</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'arrivalAirport'}
                                    placeholder={'Please give 3 options'}
                                    component={Creatable}
                                    setFieldTouched={setFieldTouched}
                                    noOptionsMessage="Type to create.."
                                />
                                {errors.arrivalAirport && touched.arrivalAirport && <div className="message">{errors.arrivalAirport}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="typeOfFlight">Type Of Flight</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'typeOfFlight'}
                                    component={Select}
                                    options={props.typeOfFlights}
                                    setFieldTouched={setFieldTouched}
                                    valueKey={'value'}
                                    labelKey={'label'}
                                />
                                {errors.typeOfFlight && touched.typeOfFlight && <div className="message">{errors.typeOfFlight}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="iataCode">Iata Code</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'iataCode'}
                                    component={Select}
                                    options={props.iataCodes}
                                    setFieldTouched={setFieldTouched}
                                    valueKey={'value'}
                                    labelKey={'label'}
                                />
                                {errors.iataCode && touched.iataCode && <div className="message">{errors.iataCode}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <Field disabled={props.disabled} name={'gender'} component={Gender} />
                                {errors.gender && touched.gender && <div className="message">{errors.gender}</div>}
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="hotelNeeded">Hotel Needed</label>
                                <Field disabled={props.disabled} name={'hotelNeeded'} component={Checkbox} />
                                {errors.hotelNeeded && touched.hotelNeeded && <div className="message">{errors.hotelNeeded}</div>}
                            </div>
                        </Col>

                        {values.hotelNeeded === true && [
                            <Col key={0} xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="hotelNeededHotelStart">Hotel Start (HN)</label>
                                    <Field
                                        disabled={props.disabled}
                                        name={'hotelNeededHotelStart'}
                                        component={DatePicker}
                                        setFieldTouched={setFieldTouched}
                                    />
                                    {errors.hotelNeededHotelStart && touched.hotelNeededHotelStart && (
                                        <div className="message">{errors.hotelNeededHotelStart}</div>
                                    )}
                                </div>
                            </Col>,
                            <Col key={1} xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="hotelNeededHotelEnd">Hotel End (HN)</label>
                                    <Field
                                        disabled={props.disabled}
                                        name={'hotelNeededHotelEnd'}
                                        component={DatePicker}
                                        setFieldTouched={setFieldTouched}
                                    />
                                    {errors.hotelNeededHotelEnd && touched.hotelNeededHotelEnd && (
                                        <div className="message">{errors.hotelNeededHotelEnd}</div>
                                    )}
                                </div>
                            </Col>
                        ]}

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="bookReturnFlight">Book Return Flight</label>
                                <Field disabled={props.disabled} name={'bookReturnFlight'} component={Checkbox} />
                                {errors.bookReturnFlight && touched.bookReturnFlight && <div className="message">{errors.bookReturnFlight}</div>}
                            </div>
                        </Col>

                        {values.bookReturnFlight === true && [
                            <Col key={0} xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="bookReturnFlightDateOfFlight">Date Of Flight (BRF)</label>
                                    <Field
                                        disabled={props.disabled}
                                        name={'bookReturnFlightDateOfFlight'}
                                        component={DatePicker}
                                        setFieldTouched={setFieldTouched}
                                    />
                                    {errors.bookReturnFlightDateOfFlight && touched.bookReturnFlightDateOfFlight && (
                                        <div className="message">{errors.bookReturnFlightDateOfFlight}</div>
                                    )}
                                </div>
                            </Col>,

                            <Col key={1} xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="bookReturnFlightDepartureAirport">Departure Airport (BRF)</label>
                                    <Field disabled={props.disabled} className="form-control" type="text" name="bookReturnFlightDepartureAirport" />
                                    <ErrorMessage className="message" name="bookReturnFlightDepartureAirport" component="div" />
                                </div>
                            </Col>,

                            <Col key={2} xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="bookReturnFlightArrivalAirport">Arrival Airport (BRF)</label>
                                    <Field disabled={props.disabled} className="form-control" type="text" name="bookReturnFlightArrivalAirport" />
                                    <ErrorMessage className="message" name="bookReturnFlightArrivalAirport" component="div" />
                                </div>
                            </Col>
                        ]}

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="railFly">Rail & Fly</label>
                                <Field disabled={props.disabled} name={'railFly'} component={Checkbox} />
                                {errors.railFly && touched.railFly && <div className="message">{errors.railFly}</div>}
                            </div>
                        </Col>

                        {props.user.userType === userTypes.BTT && (
                            <div className="inner-form">
                                <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial', marginBottom: '15px' }}>
                                    <div className="hr">
                                        <span className="hr-title">BTT</span>
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="flightNumber">Flight Number</label>
                                        <Field disabled={props.disabled} className="form-control" type="text" name="flightNumber" />
                                        <ErrorMessage className="message" name="flightNumber" component="div" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="bookingReference">Booking Reference</label>
                                        <Field disabled={props.disabled} className="form-control" type="text" name="bookingReference" />
                                        <ErrorMessage className="message" name="bookingReference" component="div" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                        <label htmlFor="travelType">Travel Type</label>
                                        <Field
                                            disabled={props.disabled}
                                            name={'travelType'}
                                            component={Select}
                                            options={props.travelTypes}
                                            setFieldTouched={setFieldTouched}
                                            valueKey={'value'}
                                            labelKey={'label'}
                                        />
                                        {errors.travelType && touched.travelType && <div className="message">{errors.travelType}</div>}
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="paymentMethod">Payment Method</label>
                                        <Field disabled={props.disabled} className="form-control" type="text" name="paymentMethod" />
                                        <ErrorMessage className="message" name="paymentMethod" component="div" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="xbag">Xbag</label>
                                        <Field disabled={props.disabled} className="form-control" type="text" name="xbag" />
                                        <ErrorMessage className="message" name="xbag" component="div" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="flightCost">Flight Cost</label>
                                        <Field disabled={props.disabled} className="form-control" type="text" name="flightCost" />
                                        <ErrorMessage className="message" name="flightCost" component="div" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="xbagCost">Xbag Cost</label>
                                        <Field disabled={props.disabled} className="form-control" type="text" name="xbagCost" />
                                        <ErrorMessage className="message" name="xbagCost" component="div" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="hotelCost">Hotel Cost</label>
                                        <Field disabled={props.disabled} className="form-control" type="text" name="hotelCost" />
                                        <ErrorMessage className="message" name="hotelCost" component="div" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="totalCost">Total Cost</label>
                                        <Field
                                            disabled={true}
                                            className="form-control"
                                            type="text"
                                            name="totalCost"
                                            value={parseCost(values.flightCost) + parseCost(values.xbagCost) + parseCost(values.hotelCost)}
                                        />
                                        <ErrorMessage className="message" name="totalCost" component="div" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="costCentre">Cost Centre</label>
                                        <Field disabled={props.disabled} className="form-control" type="text" name="costCentre" />
                                        <ErrorMessage className="message" name="costCentre" component="div" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="flightDepartureTime">Flight Departure Time</label>
                                        <Field
                                            disabled={props.disabled}
                                            name={'flightDepartureTime'}
                                            component={DatePicker}
                                            setFieldTouched={setFieldTouched}
                                        />
                                        {errors.flightDepartureTime && touched.flightDepartureTime && (
                                            <div className="message">{errors.flightDepartureTime}</div>
                                        )}
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="flightArrivalTime">Flight Arrival Time</label>
                                        <Field
                                            disabled={props.disabled}
                                            name={'flightArrivalTime'}
                                            component={DatePicker}
                                            setFieldTouched={setFieldTouched}
                                        />
                                        {errors.flightArrivalTime && touched.flightArrivalTime && (
                                            <div className="message">{errors.flightArrivalTime}</div>
                                        )}
                                    </div>
                                </Col>
                            </div>
                        )}

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="status">Status</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'status'}
                                    component={Select}
                                    options={props.statuses}
                                    setFieldTouched={setFieldTouched}
                                    valueKey={'value'}
                                    labelKey={'label'}
                                />
                                {errors.status && touched.status && <div className="message">{errors.status}</div>}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial', marginBottom: '22px' }}>
                            <div className="hr">
                                <span className="hr-title">Comments</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                            <Comments setFieldValue={setFieldValue} comments={values.comments} disabled={props.disabled} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial', marginBottom: '22px', marginTop: '17px' }}>
                            <div className="hr">
                                <span className="hr-title">Attachments</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                            <Attachments staff={props.staff} handleStaffAttachments={props.handleStaffAttachments} disabled={props.disabled} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '23px' }}>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12">
                            {!props.disabled && (
                                <Button disabled={!lodash.isEmpty(errors)} style={{ marginRight: '15px' }} className="btn btn-primary" type="submit">
                                    Submit
                                </Button>
                            )}

                            <Button onClick={downloadPdf} className="btn btn-function" type="button">
                                PDF
                            </Button>
                        </Col>
                    </Row>
                </FormikForm>
            )}
        />
    )
}

export default Form
