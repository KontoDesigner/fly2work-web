import React, { Component } from 'react'
import { Formik, Field, Form as FormikForm, ErrorMessage, validateYupSchema, yupToFormErrors } from 'formik'
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
import Flights from './flights'
import { Statuses as statuses } from '../constants/geographyConstants'
import DeclineModal from './declineModal'

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            declineModal: false
        }

        this.toggleDeclineModal = this.toggleDeclineModal.bind(this)
    }

    toggleDeclineModal() {
        this.setState({
            declineModal: !this.state.declineModal
        })
    }

    render() {
        const downloadPdf = () => {
            RestClient.download(
                `pdf/${this.props.staff.id}`,
                this.props.staff,
                `${this.props.staff.firstName} ${this.props.staff.lastName} - ${moment().format('YYYY-MM-DD HH:mm')}.pdf`
            )
        }

        const BTT = this.props.userRoles.includes(userRoles.BTT)

        // const validate = values => {
        //     try {
        //         if (BTT === false || (this.props.staff.status === statuses.PendingBTT && values.status === statuses.PendingDES)) {
        //             validateYupSchema(values, bsValidation, true)
        //         } else {
        //             validateYupSchema(values, bttValidation, true)
        //         }
        //     } catch (err) {
        //         return yupToFormErrors(err)
        //     }

        //     return {}
        // }

        return (
            <Formik
                initialValues={this.props.staff}
                //validate={validate}
                validationSchema={BTT === true ? bttValidation : bsValidation}
                validateOnChange={false}
                onSubmit={values => {
                    this.props.handleStaff(values)
                }}
                render={({ errors, touched, setFieldTouched, values, setFieldValue }) => (
                    <FormikForm>
                        {this.props.staff.createdBy && this.props.staff.createdByEmail && (
                            <Row style={{ marginBottom: '8px' }}>
                                <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial', marginTop: '-15px' }}>
                                    <div className="hr">
                                        <span className="hr-title">Requested by</span>
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="createdBy">Name</label>
                                        <Field disabled={true} className="form-control" type="text" name="createdBy" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="createdByEmail">Email</label>
                                        <Field disabled={true} className="form-control" type="text" name="createdByEmail" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="created">Date</label>
                                        <Field disabled={true} className="form-control" type="text" name="created" />
                                    </div>
                                </Col>
                            </Row>
                        )}

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
                                    <label htmlFor="id">
                                        Id <span className="text-danger">*</span>
                                    </label>
                                    <Field disabled={this.props.add !== true} className="form-control" type="text" name="id" />
                                    <ErrorMessage className="message" name="id" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="firstName">
                                        First Name <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={
                                            (this.props.disabled || (this.props.staff.firstName && this.props.staff.firstName !== '')) &&
                                            this.props.add !== true
                                        }
                                        className="form-control"
                                        type="text"
                                        name="firstName"
                                    />
                                    <ErrorMessage className="message" name="firstName" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="lastName">
                                        Sur Name <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={
                                            (this.props.disabled || (this.props.staff.lastName && this.props.staff.lastName !== '')) &&
                                            this.props.add !== true
                                        }
                                        className="form-control"
                                        type="text"
                                        name="lastName"
                                    />
                                    <ErrorMessage className="message" name="lastName" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="lastName2">2nd Sur Name</label>
                                    <Field
                                        disabled={
                                            (this.props.disabled || (this.props.staff.lastName2 && this.props.staff.lastName2 !== '')) &&
                                            this.props.add !== true
                                        }
                                        className="form-control"
                                        type="text"
                                        name="lastName2"
                                    />
                                    <ErrorMessage className="message" name="lastName2" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="passportNumber">
                                        Passport Number <span className="text-danger">*</span>
                                    </label>
                                    <Field disabled={this.props.disabled} className="form-control" type="text" name="passportNumber" />
                                    <ErrorMessage className="message" name="passportNumber" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="jobTitle">
                                        Job Title <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={
                                            (this.props.disabled || (this.props.staff.jobTitle && this.props.staff.jobTitle !== '')) &&
                                            this.props.add !== true
                                        }
                                        className="form-control"
                                        type="text"
                                        name="jobTitle"
                                    />
                                    <ErrorMessage className="message" name="jobTitle" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="phone">
                                        Phone <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={
                                            (this.props.disabled || (this.props.staff.phone && this.props.staff.phone !== '')) &&
                                            this.props.add !== true
                                        }
                                        className="form-control"
                                        type="text"
                                        name="phone"
                                    />
                                    <ErrorMessage className="message" name="phone" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="dateOfBirth">
                                        Date Of Birth <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={
                                            (this.props.disabled || (this.props.staff.dateOfBirth && this.props.staff.dateOfBirth !== '')) &&
                                            this.props.add !== true
                                        }
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
                                    <label htmlFor="plannedAssignmentStartDate">Planned Assignment Start Date</label>
                                    <Field
                                        disabled={
                                            (this.props.disabled ||
                                                (this.props.staff.plannedAssignmentStartDate &&
                                                    this.props.staff.plannedAssignmentStartDate !== '')) &&
                                            this.props.add !== true
                                        }
                                        name={'plannedAssignmentStartDate'}
                                        component={DatePicker}
                                        setFieldTouched={setFieldTouched}
                                    />
                                    <ErrorMessage className="message" name="plannedAssignmentStartDate" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="dateOfFlight">
                                        Date Of Flight <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={this.props.disabled || values.greenLight === true}
                                        name={'dateOfFlight'}
                                        component={DatePicker}
                                        setFieldTouched={setFieldTouched}
                                    />
                                    <ErrorMessage className="message" name="dateOfFlight" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                    <label htmlFor="sourceMarket">
                                        Source Market <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={
                                            (this.props.disabled || (this.props.staff.sourceMarket && this.props.staff.sourceMarket !== '')) &&
                                            this.props.add !== true
                                        }
                                        name={'sourceMarket'}
                                        component={Select}
                                        options={this.props.sourceMarkets}
                                        setFieldTouched={setFieldTouched}
                                        valueKey={'id'}
                                        labelKey={'name'}
                                    />
                                    <ErrorMessage className="message" name="sourceMarket" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                    <label htmlFor="destination">
                                        Destination <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={
                                            (this.props.disabled || (this.props.staff.destination && this.props.staff.destination !== '')) &&
                                            this.props.add !== true
                                        }
                                        name={'destination'}
                                        component={Select}
                                        options={this.props.destinations}
                                        setFieldTouched={setFieldTouched}
                                        valueKey={'destination'}
                                        labelKey={'destination'}
                                    />
                                    <ErrorMessage className="message" name="destination" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                    <label htmlFor="departureAirports">
                                        Departure Airports <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={this.props.disabled}
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
                                <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                    <label htmlFor="arrivalAirports">
                                        Arrival Airports <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={this.props.disabled}
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
                                <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                    <label htmlFor="typeOfFlight">
                                        Type Of Flight <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={this.props.disabled}
                                        name={'typeOfFlight'}
                                        component={Select}
                                        options={this.props.typeOfFlights}
                                        setFieldTouched={setFieldTouched}
                                        valueKey={'value'}
                                        labelKey={'label'}
                                    />
                                    <ErrorMessage className="message" name="typeOfFlight" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                    <label htmlFor="iataCode">
                                        Iata Code <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={
                                            (this.props.disabled || (this.props.staff.iataCode && this.props.staff.iataCode !== '')) &&
                                            this.props.add !== true
                                        }
                                        name={'iataCode'}
                                        component={Select}
                                        options={this.props.iataCodes}
                                        setFieldTouched={setFieldTouched}
                                        valueKey={'value'}
                                        labelKey={'label'}
                                    />
                                    <ErrorMessage className="message" name="iataCode" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className={this.props.disabled || this.props.add !== true ? 'form-item disabled' : 'form-item'}>
                                    <label htmlFor="emails">Additional Emails For Notification</label>
                                    <Field
                                        disabled={this.props.disabled || this.props.enableEmails !== true}
                                        name={'emails'}
                                        component={Creatable}
                                        setFieldTouched={setFieldTouched}
                                        noOptionsMessage="Type to create.."
                                    />
                                    <ErrorMessage className="message" name="emails" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className="form-item">
                                    <Field
                                        disabled={
                                            (this.props.disabled || (this.props.staff.gender && this.props.staff.gender !== '')) &&
                                            this.props.add !== true
                                        }
                                        name={'gender'}
                                        component={Gender}
                                    />
                                    <ErrorMessage className="message" name="gender" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                    <label htmlFor="hotelNeeded">Hotel Needed</label>
                                    <Field disabled={this.props.disabled} name={'hotelNeeded'} component={Checkbox} />
                                    <ErrorMessage className="message" name="hotelNeeded" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                    <label htmlFor="bookReturnFlight">Book Return Flight</label>
                                    <Field disabled={this.props.disabled} name={'bookReturnFlight'} component={Checkbox} />
                                    <ErrorMessage className="message" name="bookReturnFlight" component="div" />
                                </div>
                            </Col>

                            {values.bookReturnFlight === true && [
                                <Col key={0} xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="bookReturnFlightDateOfFlight">Date Of Flight (BRF)</label>
                                        <Field
                                            disabled={this.props.disabled}
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
                                        <Field
                                            disabled={this.props.disabled}
                                            className="form-control"
                                            type="text"
                                            name="bookReturnFlightDepartureAirport"
                                        />
                                        <ErrorMessage className="message" name="bookReturnFlightDepartureAirport" component="div" />
                                    </div>
                                </Col>,

                                <Col key={2} xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="bookReturnFlightArrivalAirport">Arrival Airport (BRF)</label>
                                        <Field
                                            disabled={this.props.disabled}
                                            className="form-control"
                                            type="text"
                                            name="bookReturnFlightArrivalAirport"
                                        />
                                        <ErrorMessage className="message" name="bookReturnFlightArrivalAirport" component="div" />
                                    </div>
                                </Col>
                            ]}

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                    <label htmlFor="railFly">Rail & Fly (Only In Germany)</label>
                                    <Field disabled={this.props.disabled} name={'railFly'} component={Checkbox} />
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
                                        <label htmlFor="bookingReference">
                                            Booking Reference <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            disabled={this.props.disabled || BTT === false}
                                            className="form-control"
                                            type="text"
                                            name="bookingReference"
                                        />
                                        <ErrorMessage className="message" name="bookingReference" component="div" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                        <label htmlFor="travelType">
                                            Travel Type <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            disabled={this.props.disabled || BTT === false}
                                            name={'travelType'}
                                            component={Select}
                                            options={this.props.travelTypes}
                                            setFieldTouched={setFieldTouched}
                                            valueKey={'value'}
                                            labelKey={'label'}
                                        />
                                        <ErrorMessage className="message" name="travelType" component="div" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                        <label htmlFor="paymentMethod">
                                            Payment Method <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            disabled={this.props.disabled || BTT === false}
                                            name={'paymentMethod'}
                                            component={Select}
                                            options={this.props.paymentMethods}
                                            setFieldTouched={setFieldTouched}
                                            valueKey={'value'}
                                            labelKey={'label'}
                                        />
                                        <ErrorMessage className="message" name="paymentMethod" component="div" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="luggage">
                                            Luggage <span className="text-danger">*</span>
                                        </label>
                                        <Field disabled={this.props.disabled || BTT === false} className="form-control" type="text" name="luggage" />
                                        <ErrorMessage className="message" name="luggage" component="div" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="costCentre">
                                            Cost Centre <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            disabled={this.props.disabled || BTT === false}
                                            className="form-control"
                                            type="text"
                                            name="costCentre"
                                        />
                                        <ErrorMessage className="message" name="costCentre" component="div" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                        <label htmlFor="currency">
                                            Currency <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            disabled={this.props.disabled || BTT === false}
                                            name={'currency'}
                                            component={Select}
                                            options={this.props.currencies}
                                            setFieldTouched={setFieldTouched}
                                            valueKey={'value'}
                                            labelKey={'label'}
                                        />
                                        <ErrorMessage className="message" name="currency" component="div" />
                                    </div>
                                </Col>

                                {values.hotelNeeded === true && [
                                    <Col key={0} xl="4" lg="4" md="6" sm="12" xs="12">
                                        <div className="form-item">
                                            <label htmlFor="hotelNeededHotelName">
                                                Hotel Name (HN) <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                disabled={this.props.disabled || BTT === false}
                                                className="form-control"
                                                type="text"
                                                name="hotelNeededHotelName"
                                            />
                                            <ErrorMessage className="message" name="hotelNeededHotelName" component="div" />
                                        </div>
                                    </Col>,
                                    <Col key={1} xl="4" lg="4" md="6" sm="12" xs="12">
                                        <div className="form-item">
                                            <label htmlFor="hotelNeededHotelStart">
                                                Hotel Start (HN) <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                disabled={this.props.disabled || BTT === false}
                                                name={'hotelNeededHotelStart'}
                                                component={DatePicker}
                                                setFieldTouched={setFieldTouched}
                                            />
                                            <ErrorMessage className="message" name="hotelNeededHotelStart" component="div" />
                                        </div>
                                    </Col>,
                                    <Col key={2} xl="4" lg="4" md="6" sm="12" xs="12">
                                        <div className="form-item">
                                            <label htmlFor="hotelNeededHotelEnd">
                                                Hotel End (HN) <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                disabled={this.props.disabled || BTT === false}
                                                name={'hotelNeededHotelEnd'}
                                                component={DatePicker}
                                                setFieldTouched={setFieldTouched}
                                            />
                                            <ErrorMessage className="message" name="hotelNeededHotelEnd" component="div" />
                                        </div>
                                    </Col>
                                ]}

                                {this.props.staff.greenLight !== null && (
                                    <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                        <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                            <label htmlFor="greenLight">Green Light</label>
                                            <Field
                                                disabled={this.props.disabled || this.props.staff.greenLight === true || BTT === false}
                                                name={'greenLight'}
                                                component={Checkbox}
                                                title={
                                                    this.props.staff.greenLightUpdatedBy && this.props.staff.greenLightUpdated
                                                        ? `Updated: ${moment(this.props.staff.greenLightUpdated).format('YYYY-MM-DD HH:mm')} By: ${
                                                              this.props.staff.greenLightUpdatedBy
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
                                    disabled={this.props.disabled || BTT === false}
                                    flights={values.flights}
                                    errors={errors}
                                    touched={touched}
                                    setFieldTouched={setFieldTouched}
                                    setFieldValue={setFieldValue}
                                />
                            </Col>
                        </Row>

                        {this.props.add !== true && [
                            <Row key={0}>
                                <Col
                                    xl="12"
                                    lg="12"
                                    md="12"
                                    sm="12"
                                    xs="12"
                                    style={{ minHeight: 'initial', marginBottom: '22px', marginTop: '20px' }}>
                                    <div className="hr">
                                        <span className="hr-title">Comments</span>
                                    </div>
                                </Col>
                            </Row>,

                            <Row key={1}>
                                <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                                    <Comments
                                        staff={this.props.staff}
                                        setFieldValue={setFieldValue}
                                        comments={values.comments}
                                        disabled={this.props.disabled}
                                    />
                                </Col>
                            </Row>,

                            <Row key={2}>
                                <Col
                                    xl="12"
                                    lg="12"
                                    md="12"
                                    sm="12"
                                    xs="12"
                                    style={{ minHeight: 'initial', marginBottom: '22px', marginTop: '17px' }}>
                                    <div className="hr">
                                        <span className="hr-title">Attachments</span>
                                    </div>
                                </Col>
                            </Row>,

                            <Row key={3}>
                                <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                                    <Attachments
                                        staff={this.props.staff}
                                        handleStaffAttachments={this.props.handleStaffAttachments}
                                        disabled={this.props.disabled}
                                    />
                                </Col>
                            </Row>
                        ]}

                        {this.props.hideStatus !== true && (
                            <Row style={{ marginTop: '20px' }}>
                                <Col xl="4" lg="4" md="6" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                                    <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                        <label htmlFor="status">Status</label>
                                        <Field
                                            disabled={this.props.disabled}
                                            name={'status'}
                                            component={Select}
                                            options={this.props.statuses}
                                            setFieldTouched={setFieldTouched}
                                            valueKey={'value'}
                                            labelKey={'label'}
                                        />
                                        <ErrorMessage className="message" name="status" component="div" />
                                    </div>
                                </Col>
                            </Row>
                        )}

                        <Row style={{ marginTop: '25px' }}>
                            <Col xl="12" lg="12" md="12" sm="12" xs="12">
                                {!this.props.disabled && (
                                    <Button style={{ marginRight: '15px' }} className="btn btn-primary" type="submit">
                                        Submit
                                    </Button>
                                )}

                                {this.props.staff.status === statuses.PendingBTT && (
                                    <Button onClick={this.toggleDeclineModal} style={{ marginRight: '15px' }} className="btn btn-sales" type="button">
                                        Decline
                                    </Button>
                                )}

                                <Button onClick={downloadPdf} className="btn btn-function" type="button">
                                    PDF
                                </Button>
                            </Col>
                        </Row>

                        <DeclineModal
                            declineStaff={this.props.declineStaff}
                            history={this.props.history}
                            toggle={this.toggleDeclineModal}
                            staff={this.props.staff}
                            open={this.state.declineModal}
                        />
                    </FormikForm>
                )}
            />
        )
    }
}

export default Form
