import React, { Component } from 'react'
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
import Flights from './flights'
import { Statuses as statuses } from '../constants/geographyConstants'
import DeclineModal from './declineModal'
import AuditModal from './auditModal'
import DeleteModal from './deleteModal'
import * as helpers from '../infrastructure/helpers'

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            declineModal: false,
            auditModal: false,
            deleteModal: false
        }

        this.toggleDeclineModal = this.toggleDeclineModal.bind(this)
        this.toggleAuditModal = this.toggleAuditModal.bind(this)
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    }

    toggleDeclineModal() {
        this.setState({
            declineModal: !this.state.declineModal
        })
    }

    toggleAuditModal() {
        this.setState({
            auditModal: !this.state.auditModal
        })
    }

    toggleDeleteModal() {
        this.setState({
            deleteModal: !this.state.deleteModal
        })
    }

    render() {
        const downloadPdf = () => {
            RestClient.download(
                `pdf/${this.props.staff.id}`,
                null,
                `${this.props.staff.firstName} ${this.props.staff.lastName} ${this.props.staff.iataCode} ${this.props.staff.preferredFlightDate}.pdf`
            )
        }

        const BTT = this.props.userRoles.includes(userRoles.BTT)
        const HR = this.props.userRoles.includes(userRoles.HR)

        const dateRequested = this.props.staff.dateRequested ? moment(this.props.staff.dateRequested).format('DD/MM/YYYY HH:mm') : ''
        const created = this.props.staff.created ? moment(this.props.staff.created).format('DD/MM/YYYY HH:mm') : ''

        return (
            <Formik
                initialValues={this.props.staff}
                validationSchema={BTT === true ? bttValidation : bsValidation}
                validateOnChange={false}
                onSubmit={values => {
                    this.props.save(values)
                }}
                render={({ errors, touched, setFieldTouched, values, setFieldValue }) => (
                    <FormikForm>
                        {this.props.add !== true && (
                            <Row style={{ marginBottom: '8px' }}>
                                <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial', marginBottom: '15px' }}>
                                    <div className="hr">
                                        <span className="hr-title">Request Information</span>
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="requestedBy.name">Requested By Name</label>
                                        <Field disabled={true} className="form-control" type="text" name="requestedBy.name" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="requestedBy.email">Requested By Email</label>
                                        <Field disabled={true} className="form-control" type="text" name="requestedBy.email" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="dateRequested">Date Requested</label>
                                        <Field value={dateRequested} disabled={true} className="form-control" type="text" name="dateRequested" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="created">Date Created</label>
                                        <Field value={created} disabled={true} className="form-control" type="text" name="created" />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="created">Staff Id</label>
                                        <Field
                                            value={values.originalStaffId ? values.originalStaffId : ''}
                                            disabled={true}
                                            className="form-control"
                                            type="text"
                                            name="originalStaffId"
                                        />
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className="form-item">
                                        <label htmlFor="created">Direction</label>
                                        <Field
                                            value={values.direction ? values.direction : ''}
                                            disabled={true}
                                            className="form-control"
                                            type="text"
                                            name="direction"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        )}

                        <Row>
                            <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial', marginBottom: '15px' }}>
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
                                    <label htmlFor="id">
                                        Gender <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={
                                            (this.props.disabled || (this.props.staff.gender && this.props.staff.gender !== '')) &&
                                            this.props.add !== true
                                        }
                                        name={'gender'}
                                        setFieldTouched={setFieldTouched}
                                        component={Gender}
                                    />
                                    <ErrorMessage className="message" name="gender" component="div" />
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
                                    <label htmlFor="dateOfBirth">
                                        Date Of Birth <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={
                                            (this.props.disabled || (this.props.staff.dateOfBirth && this.props.staff.dateOfBirth !== '')) &&
                                            this.props.add !== true &&
                                            moment(this.props.staff.dateOfBirth, 'DD/MM/YYYY', true).isValid()
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
                                    <label htmlFor="passportNumber">Passport Number</label>
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
                                    <label htmlFor="plannedAssignmentStartDate">
                                        {values.typeOfFlight === 'End of season' ? 'Planned Assignment End Date' : 'Planned Assignment Start Date'}
                                    </label>
                                    <Field
                                        disabled={
                                            (this.props.disabled ||
                                                (this.props.staff.plannedAssignmentStartDate &&
                                                    this.props.staff.plannedAssignmentStartDate !== '')) &&
                                            this.props.add !== true &&
                                            moment(this.props.staff.plannedAssignmentStartDate, 'DD/MM/YYYY', true).isValid()
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
                                    <label htmlFor="preferredFlightDate">
                                        Preferred Flight Date <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        disabled={this.props.disabled || values.greenLight === true}
                                        name={'preferredFlightDate'}
                                        component={DatePicker}
                                        setFieldTouched={setFieldTouched}
                                    />
                                    <ErrorMessage className="message" name="preferredFlightDate" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div
                                    className={
                                        (this.props.disabled || (this.props.staff.sourceMarket && this.props.staff.sourceMarket !== '')) &&
                                        this.props.add !== true
                                            ? 'form-item disabled'
                                            : 'form-item'
                                    }>
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
                                <div className="form-item">
                                    <label htmlFor="season">Season</label>
                                    <Field disabled={true} className="form-control" type="text" name="season" />
                                </div>
                            </Col>

                            <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                <div
                                    className={
                                        (this.props.disabled || (this.props.staff.destination && this.props.staff.destination !== '')) &&
                                        this.props.add !== true
                                            ? 'form-item disabled'
                                            : 'form-item'
                                    }>
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
                                <div
                                    className={
                                        (this.props.disabled || (this.props.staff.iataCode && this.props.staff.iataCode !== '')) &&
                                        this.props.add !== true
                                            ? 'form-item disabled'
                                            : 'form-item'
                                    }>
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
                                <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                    <label htmlFor="emails">Additional Emails For Notification</label>
                                    <Field
                                        disabled={this.props.disabled}
                                        name={'emails'}
                                        component={Creatable}
                                        setFieldTouched={setFieldTouched}
                                        noOptionsMessage="Type to create.."
                                    />
                                    <ErrorMessage className="message" name="emails" component="div" />
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

                            {this.props.add === true && [
                                <Col key={0} xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial', marginBottom: '10px' }}>
                                    <div className="hr">
                                        <span className="hr-title">Comments</span>
                                    </div>
                                </Col>,
                                <Col key={1} xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                                    <div className="form-item">
                                        <label htmlFor="comment">Comment</label>
                                        <Field
                                            disabled={this.props.disabled}
                                            className="form-control"
                                            type="text"
                                            name="comment"
                                            component="textarea"
                                            rows="3"
                                            style={{ overflowX: 'auto', resize: 'vertical', minHeight: '37px', boxShadow: 'none' }}
                                        />
                                        <ErrorMessage className="message" name="comment" component="div" />
                                    </div>
                                </Col>
                            ]}

                            {this.props.add !== true && [
                                <Col key={0} xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial', marginBottom: '22px' }}>
                                    <div className="hr">
                                        <span className="hr-title">Comments</span>
                                    </div>
                                </Col>,
                                <Col key={1} xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                                    <Comments
                                        staff={this.props.staff}
                                        setFieldValue={setFieldValue}
                                        comments={values.comments}
                                        disabled={this.props.disabled}
                                        BTT={BTT}
                                    />
                                </Col>
                            ]}

                            <div className="inner-form">
                                <Col
                                    xl="12"
                                    lg="12"
                                    md="12"
                                    sm="12"
                                    xs="12"
                                    style={{ minHeight: 'initial', marginBottom: '10px', marginTop: '17px' }}>
                                    <div className="hr">
                                        <span className="hr-title">BTT</span>
                                    </div>
                                </Col>

                                <Col xl="4" lg="4" md="6" sm="12" xs="12">
                                    <div className={this.props.disabled || BTT === false ? 'form-item disabled' : 'form-item'}>
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

                                {this.props.staff.greenLight !== null && (
                                    <Col xl="4" lg="4" md="6" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                                        <div className={'form-item disabled'}>
                                            <label htmlFor="greenLight">Green Light</label>
                                            <Field
                                                disabled={true}
                                                name={'greenLight'}
                                                component={Checkbox}
                                                title={
                                                    this.props.staff.greenLightUpdatedBy && this.props.staff.greenLightUpdated
                                                        ? `Updated ${this.props.staff.greenLightUpdated} By ${this.props.staff.greenLightUpdatedBy}`
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
                                    initialValues={this.props.initialValues}
                                    flights={values.flights}
                                    errors={errors}
                                    touched={touched}
                                    setFieldTouched={setFieldTouched}
                                    setFieldValue={setFieldValue}
                                    values={values}
                                    travelTypes={this.props.travelTypes}
                                    paymentMethods={this.props.paymentMethods}
                                />
                            </Col>
                        </Row>

                        <Row style={{ marginTop: '30px' }}>
                            <Col xl="4" lg="4" md="6" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                                <div className="form-item">
                                    <label>Total Cost</label>
                                    <Field disabled={true} className="form-control" type="text" value={helpers.getTotalCost(values.flights)} />
                                </div>
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
                                    style={{ minHeight: 'initial', marginBottom: '22px', marginTop: '17px' }}>
                                    <div className="hr">
                                        <span className="hr-title">Attachments</span>
                                    </div>
                                </Col>
                            </Row>,

                            <Row key={1}>
                                <Col xl="12" lg="12" md="12" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                                    <Attachments setFieldValue={setFieldValue} staffId={this.props.staff.id} attachments={values.attachments} />
                                </Col>
                            </Row>
                        ]}

                        {this.props.hideStatus !== true && (
                            <Row style={{ marginTop: '20px' }}>
                                <Col xl="4" lg="4" md="6" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                                    <div className={this.props.disabled ? 'form-item disabled' : 'form-item'}>
                                        <label htmlFor="status">
                                            Status <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            disabled={this.props.disabled}
                                            name={'status'}
                                            component={Select}
                                            options={
                                                !BTT && !this.props.disabled && this.props.staff.status !== statuses.Confirmed
                                                    ? this.props.bsStatuses
                                                    : this.props.statuses
                                            }
                                            setFieldTouched={setFieldTouched}
                                            valueKey={'value'}
                                            labelKey={'label'}
                                        />
                                        <ErrorMessage className="message" name="status" component="div" />
                                    </div>
                                </Col>

                                {this.props.confirmedStatuses && values.status === statuses.Confirmed && (
                                    <Col xl="4" lg="4" md="6" sm="12" xs="12" style={{ minHeight: 'initial' }}>
                                        <div
                                            className={
                                                this.props.disabled || this.props.staff.status !== statuses.PendingBTT
                                                    ? 'form-item disabled'
                                                    : 'form-item'
                                            }>
                                            <label htmlFor="status">Confirmed Status</label>
                                            <Field
                                                disabled={this.props.disabled || BTT === false}
                                                name={'confirmedStatus'}
                                                component={Select}
                                                options={this.props.confirmedStatuses}
                                                setFieldTouched={setFieldTouched}
                                                valueKey={'value'}
                                                labelKey={'label'}
                                                isClearable={true}
                                            />
                                            <ErrorMessage className="message" name="status" component="div" />
                                        </div>
                                    </Col>
                                )}
                            </Row>
                        )}

                        <Row style={{ marginTop: '25px' }}>
                            <Col xl="12" lg="12" md="12" sm="12" xs="12">
                                {!this.props.disabled && this.props.hideSubmit !== true && (
                                    <Button style={{ marginRight: '15px' }} className="btn btn-primary" type="submit">
                                        Submit
                                    </Button>
                                )}

                                {BTT === true &&
                                    this.props.staff.status === statuses.PendingBTT &&
                                    this.props.add !== true &&
                                    this.props.hideDecline !== true &&
                                    this.props.staff.greenLight !== false && (
                                        <Button
                                            onClick={this.toggleDeclineModal}
                                            style={{ marginRight: '15px' }}
                                            className="btn btn-warning"
                                            type="button">
                                            Decline
                                        </Button>
                                    )}

                                {HR === true && this.props.staff.greenLight === false && this.props.staff.status !== statuses.New && (
                                    <Button
                                        onClick={this.props.confirmGreenLight}
                                        style={{ marginRight: '15px' }}
                                        className="btn btn-primary"
                                        type="button">
                                        Confirm
                                    </Button>
                                )}

                                {this.props.add !== true && (
                                    <Button style={{ marginRight: '15px' }} onClick={downloadPdf} className="btn btn-function" type="button">
                                        PDF
                                    </Button>
                                )}

                                {this.props.add !== true && this.props.staff.audit && this.props.staff.audit.length > 0 && (
                                    <Button onClick={this.toggleAuditModal} className="btn btn-function" type="button">
                                        History
                                    </Button>
                                )}

                                {this.props.add !== true && BTT === true && this.props.showDelete === true && (
                                    <Button
                                        style={{ marginRight: '15px', float: 'right' }}
                                        onClick={this.toggleDeleteModal}
                                        className="btn btn-sales"
                                        type="button">
                                        Delete
                                    </Button>
                                )}
                            </Col>
                        </Row>

                        <DeclineModal
                            declineStaff={this.props.declineStaff}
                            history={this.props.history}
                            toggle={this.toggleDeclineModal}
                            staff={this.props.staff}
                            open={this.state.declineModal}
                        />

                        <AuditModal
                            toggle={this.toggleAuditModal}
                            open={this.state.auditModal}
                            audit={this.props.staff.audit}
                            sentEmails={this.props.staff.sentEmails}
                        />

                        <DeleteModal
                            history={this.props.history}
                            deleteStaff={this.props.deleteStaff}
                            toggle={this.toggleDeleteModal}
                            staff={this.props.staff}
                            open={this.state.deleteModal}
                        />
                    </FormikForm>
                )}
            />
        )
    }
}

export default Form
