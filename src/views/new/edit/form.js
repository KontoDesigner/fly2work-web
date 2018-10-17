import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Select from '../../../components/select'
import DatePicker from '../../../components/datePicker'
import Checkbox from '../../../components/checkbox'
import MultiSelect from '../../../components/multiSelect'
import Gender from '../../../components/gender'
import { Row, Col, Button } from 'reactstrap'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    id: Yup.string().required('Field is required'),
    name: Yup.string().required('Field is required'),
    dateOfBirth: Yup.string().required('Field is required'),
    sourceMarket: Yup.string().required('Field is required'),
    season: Yup.string().required('Field is required'),
    dateOfFlight: Yup.string().required('Field is required'),
    statusOfFlight: Yup.string().required('Field is required'),
    // hotelNeeded,
    role: Yup.string().required('Field is required'),
    destination: Yup.string().required('Field is required'),
    // gender,
    phone: Yup.string().required('Field is required'),
    departureAirport: Yup.string().required('Field is required'),
    arrivalAirport: Yup.string().required('Field is required'),
    typeOfFlight: Yup.string().required('Field is required'),
    comment: Yup.string().max(200, 'Max 200 characters')
})

const EditUserDialog = props => {
    return (
        <div>
            <h2>{props.staff.name}</h2>

            <Formik
                initialValues={props.staff}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    props.handleStaff(values)
                }}
                render={({ errors, touched, isSubmitting }) => (
                    <Form>
                        <Row>
                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="id">Id</label>
                                    <Field className="form-control" type="text" name="id" />
                                    <ErrorMessage className="message" name="id" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="name">Name</label>
                                    <Field className="form-control" type="text" name="name" />
                                    <ErrorMessage className="message" name="name" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                                    <Field name={'dateOfBirth'} component={DatePicker} />
                                    {errors.dateOfBirth && <div className="message">{errors.dateOfBirth}</div>}
                                </div>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="sourceMarket">Source Market</label>
                                    <Field name={'sourceMarket'} component={Select} options={props.sourceMarkets} />
                                    {errors.sourceMarket && <div className="message">{errors.sourceMarket}</div>}
                                </div>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="season">Season</label>
                                    <Field name={'season'} component={Select} options={props.seasons} />
                                    {errors.season && <div className="message">{errors.season}</div>}
                                </div>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="dateOfFlight">Date Of Flight</label>
                                    <Field name={'dateOfFlight'} component={DatePicker} />
                                    {errors.dateOfFlight && <div className="message">{errors.dateOfFlight}</div>}
                                </div>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="statusOfFlight">Status Of The Flight</label>
                                    <Field name={'statusOfFlight'} component={Select} options={props.flightStatuses} />
                                    {errors.statusOfFlight && <div className="message">{errors.statusOfFlight}</div>}
                                </div>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="hotelNeeded">Hotel Needed</label>
                                    <Field name={'hotelNeeded'} component={Checkbox} />
                                </div>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="role">Role</label>
                                    <Field name={'role'} component={Select} options={props.roles} />
                                    {errors.role && <div className="message">{errors.role}</div>}
                                </div>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="destination">Destination</label>
                                    <Field name={'destination'} component={Select} options={props.destinations} />
                                    {errors.destination && <div className="message">{errors.destination}</div>}
                                </div>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <Field name={'gender'} component={Gender} />
                                </div>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="phone">Phone</label>
                                    <Field className="form-control" type="text" name="phone" />
                                    <ErrorMessage className="message" name="phone" component="div" />
                                </div>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="departureAirport">Departure Airport</label>
                                    <Field name={'departureAirport'} component={MultiSelect} options={props.airports} />
                                    {errors.departureAirport && <div className="message">{errors.departureAirport}</div>}
                                </div>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="arrivalAirport">Arrival Airport</label>
                                    <Field name={'arrivalAirport'} component={MultiSelect} options={props.airports} />
                                    {errors.arrivalAirport && <div className="message">{errors.arrivalAirport}</div>}
                                </div>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="typeOfFlight">Type Of Flight</label>
                                    <Field name={'typeOfFlight'} component={Select} options={props.flights} />
                                    {errors.typeOfFlight && <div className="message">{errors.typeOfFlight}</div>}
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col xl="12" lg="612" md="12" sm="12" xs="12">
                                <div className="form-item">
                                    <label htmlFor="comment">Comment</label>
                                    <Field className="form-control" component="textarea" rows="5" name="comment" />
                                    <ErrorMessage className="message" name="comment" component="div" />
                                </div>
                            </Col>
                        </Row>

                        <Row className="divider-up">
                            <Col xl="12" lg="612" md="12" sm="12" xs="12">
                                <Button className="btn btn-primary" type="submit" color="success" disabled={isSubmitting}>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            />
        </div>
    )
}

export default EditUserDialog
