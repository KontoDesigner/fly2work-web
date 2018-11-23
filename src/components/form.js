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
import { UserRoles as userRoles } from '../constants/userConstants'
import Attachments from './attachments'
import Comments from './comments'
// import lodash from 'lodash'
import Flights from './flights'

const Form = props => {
    const downloadPdf = () => {
        RestClient.download(
            `pdf/${props.staff.id}`,
            props.staff,
            `${props.staff.firstName} ${props.staff.lastName} - ${moment().format('YYYY-MM-DD HH:mm')}.pdf`
        )
    }

    const BTT = props.userRoles.includes(userRoles.BTT)

    return (
        <Formik
            initialValues={props.staff}
            validationSchema={BTT === true ? bttValidation : bsValidation}
            onSubmit={(values, actions) => {
                props.handleStaff(values)
            }}
            render={({ errors, touched, setFieldTouched, values, setFieldValue }) => (
                <FormikForm>
                    <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial', marginTop: '-15px' }}>
                            <div className="hr">
                                <span className="hr-title">BS</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="id">Id</label>
                                <Field disabled={props.add !== true} className="form-control" type="text" name="id" />
                                <ErrorMessage className="message" name="id" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="firstName">First Name</label>
                                <Field
                                    disabled={(props.disabled || (values.firstName && values.firstName !== '')) && props.add !== true}
                                    className="form-control"
                                    type="text"
                                    name="firstName"
                                />
                                <ErrorMessage className="message" name="firstName" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="lastName">Last Name</label>
                                <Field
                                    disabled={(props.disabled || (values.lastName && values.lastName !== '')) && props.add !== true}
                                    className="form-control"
                                    type="text"
                                    name="lastName"
                                />
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
                                <Field
                                    disabled={(props.disabled || (values.jobTitle && values.jobTitle !== '')) && props.add !== true}
                                    className="form-control"
                                    type="text"
                                    name="jobTitle"
                                />
                                <ErrorMessage className="message" name="jobTitle" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="phone">Phone</label>
                                <Field
                                    disabled={(props.disabled || (values.phone && values.phone !== '')) && props.add !== true}
                                    className="form-control"
                                    type="text"
                                    name="phone"
                                />
                                <ErrorMessage className="message" name="phone" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="dateOfBirth">Date Of Birth</label>
                                <Field
                                    disabled={(props.disabled || (values.dateOfBirth && values.dateOfBirth !== '')) && props.add !== true}
                                    name={'dateOfBirth'}
                                    component={DatePicker}
                                    setFieldTouched={setFieldTouched}
                                    dateFormat={'DD/MM/YYYY'}
                                />
                                <ErrorMessage className="message" name="dateOfBirth" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="positionStart">Planned Assignment Start Date</label>
                                <Field
                                    disabled={(props.disabled || (values.positionStart && values.positionStart !== '')) && props.add !== true}
                                    name={'positionStart'}
                                    component={DatePicker}
                                    setFieldTouched={setFieldTouched}
                                />
                                <ErrorMessage className="message" name="positionStart" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <label htmlFor="dateOfFlight">Date Of Flight</label>
                                <Field disabled={props.disabled} name={'dateOfFlight'} component={DatePicker} setFieldTouched={setFieldTouched} />
                                <ErrorMessage className="message" name="dateOfFlight" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="sourceMarket">Source Market</label>
                                <Field
                                    disabled={(props.disabled || (values.sourceMarket && values.sourceMarket !== '')) && props.add !== true}
                                    name={'sourceMarket'}
                                    component={Select}
                                    options={props.sourceMarkets}
                                    setFieldTouched={setFieldTouched}
                                    valueKey={'id'}
                                    labelKey={'name'}
                                />
                                <ErrorMessage className="message" name="sourceMarket" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="destination">Destination</label>
                                <Field
                                    disabled={(props.disabled || (values.destination && values.destination !== '')) && props.add !== true}
                                    name={'destination'}
                                    component={Select}
                                    options={props.destinations}
                                    setFieldTouched={setFieldTouched}
                                    valueKey={'destination'}
                                    labelKey={'destination'}
                                />
                                <ErrorMessage className="message" name="destination" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="departureAirports">Departure Airports</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'departureAirports'}
                                    placeholder={'Please give 3 options'}
                                    component={Creatable}
                                    setFieldTouched={setFieldTouched}
                                    noOptionsMessage="Type to create.."
                                />
                                <ErrorMessage className="message" name="departureAirports" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="arrivalAirports">Arrival Airports</label>
                                <Field
                                    disabled={props.disabled}
                                    name={'arrivalAirports'}
                                    placeholder={'Please give 3 options'}
                                    component={Creatable}
                                    setFieldTouched={setFieldTouched}
                                    noOptionsMessage="Type to create.."
                                />
                                <ErrorMessage className="message" name="arrivalAirports" component="div" />
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
                                <ErrorMessage className="message" name="typeOfFlight" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="iataCode">Iata Code</label>
                                <Field
                                    disabled={(props.disabled || (values.iataCode && values.iataCode !== '')) && props.add !== true}
                                    name={'iataCode'}
                                    component={Select}
                                    options={props.iataCodes}
                                    setFieldTouched={setFieldTouched}
                                    valueKey={'value'}
                                    labelKey={'label'}
                                />
                                <ErrorMessage className="message" name="iataCode" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className="form-item">
                                <Field
                                    disabled={(props.disabled || (values.gender && values.gender !== '')) && props.add !== true}
                                    name={'gender'}
                                    component={Gender}
                                />
                                <ErrorMessage className="message" name="gender" component="div" />
                            </div>
                        </Col>

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="hotelNeeded">Hotel Needed</label>
                                <Field disabled={props.disabled} name={'hotelNeeded'} component={Checkbox} />
                                <ErrorMessage className="message" name="hotelNeeded" component="div" />
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
                                    <ErrorMessage className="message" name="hotelNeededHotelStart" component="div" />
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
                                    <ErrorMessage className="message" name="hotelNeededHotelEnd" component="div" />
                                </div>
                            </Col>
                        ]}

                        <Col xl="4" lg="4" md="6" sm="12" xs="12">
                            <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                <label htmlFor="bookReturnFlight">Book Return Flight</label>
                                <Field disabled={props.disabled} name={'bookReturnFlight'} component={Checkbox} />
                                <ErrorMessage className="message" name="bookReturnFlight" component="div" />
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
                                    <ErrorMessage className="message" name="bookReturnFlightDateOfFlight" component="div" />
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
                                <label htmlFor="railFly">Rail & Fly (Germany Only)</label>
                                <Field disabled={props.disabled} name={'railFly'} component={Checkbox} />
                                <ErrorMessage className="message" name="railFly" component="div" />
                            </div>
                        </Col>

                        <div className="inner-form">
                            <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial', marginBottom: '15px' }}>
                                <div className="hr">
                                    <span className="hr-title">BTT</span>
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="bookingReference">Booking Reference</label>
                                    <Field disabled={props.disabled || BTT === false} className="form-control" type="text" name="bookingReference" />
                                    <ErrorMessage className="message" name="bookingReference" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                    <label htmlFor="travelType">Travel Type</label>
                                    <Field
                                        disabled={props.disabled || BTT === false}
                                        name={'travelType'}
                                        component={Select}
                                        options={props.travelTypes}
                                        setFieldTouched={setFieldTouched}
                                        valueKey={'value'}
                                        labelKey={'label'}
                                    />
                                    <ErrorMessage className="message" name="travelType" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="paymentMethod">Payment Method</label>
                                    <Field disabled={props.disabled || BTT === false} className="form-control" type="text" name="paymentMethod" />
                                    <ErrorMessage className="message" name="paymentMethod" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="xbag">Xbag</label>
                                    <Field disabled={props.disabled || BTT === false} className="form-control" type="text" name="xbag" />
                                    <ErrorMessage className="message" name="xbag" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="costCentre">Cost Centre</label>
                                    <Field disabled={props.disabled || BTT === false} className="form-control" type="text" name="costCentre" />
                                    <ErrorMessage className="message" name="costCentre" component="div" />
                                </div>
                            </Col>

                            {BTT === true && props.staff.greenLight !== null && (
                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className={props.disabled ? 'form-item disabled' : 'form-item'}>
                                        <label htmlFor="greenLight">Green Light</label>
                                        <Field
                                            disabled={props.disabled || props.staff.greenLight === true}
                                            name={'greenLight'}
                                            component={Checkbox}
                                            title={
                                                props.staff.greenLightUpdatedBy && props.staff.greenLightUpdated
                                                    ? `Updated: ${moment(props.staff.greenLightUpdated).format('YYYY-MM-DD HH:mm')} By: ${
                                                          props.staff.greenLightUpdatedBy
                                                      }`
                                                    : ''
                                            }
                                        />
                                        <ErrorMessage className="message" name="greenLight" component="div" />
                                    </div>
                                </Col>
                            )}
                        </div>
                    </Row>

                    <Row style={{ marginTop: '15px' }}>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                            <Flights
                                disabled={props.disabled || BTT === false}
                                flights={values.flights}
                                errors={errors}
                                touched={touched}
                                setFieldTouched={setFieldTouched}
                                setFieldValue={setFieldValue}
                            />
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

                    {props.add !== true && [
                        <Row key={0}>
                            <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial', marginBottom: '22px', marginTop: '17px' }}>
                                <div className="hr">
                                    <span className="hr-title">Attachments</span>
                                </div>
                            </Col>
                        </Row>,

                        <Row key={1}>
                            <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                                <Attachments
                                    staff={props.staff}
                                    staffId={values.id}
                                    handleStaffAttachments={props.handleStaffAttachments}
                                    disabled={props.disabled}
                                />
                            </Col>
                        </Row>
                    ]}

                    <Row style={{ marginTop: '22px', marginBottom: '10px' }}>
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
                                <ErrorMessage className="message" name="status" component="div" />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl="12" lg="12" md="12" sm="12" xs="12">
                            {!props.disabled && (
                                <Button
                                    // disabled={!lodash.isEmpty(errors)}
                                    style={{ marginRight: '15px' }}
                                    className="btn btn-primary"
                                    type="submit">
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
