import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Select from '../../../components/select'
import DatePicker from '../../../components/datePicker'
import Checkbox from '../../../components/checkbox'
import MultiSelect from '../../../components/multiSelect'
import Gender from '../../../components/gender'
import { Row, Col, FormGroup, Button } from 'reactstrap'

const EditUserDialog = props => {
    return (
        <div>
            <h2>{props.staff.name}</h2>

            <Formik
                initialValues={props.staff}
                onSubmit={(values, actions) => {
                    props.handleStaff(values)
                }}
                render={({ errors, touched, isSubmitting }) => (
                    <Form>
                        <Row>
                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="id">Id</label>
                                    <Field className="form-control" type="text" name="id" />
                                    <ErrorMessage name="id" component="div" />
                                </FormGroup>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="name">Name</label>
                                    <Field className="form-control" type="text" name="name" />
                                    <ErrorMessage name="name" component="div" />
                                </FormGroup>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                                    <Field name={'dateOfBirth'} component={DatePicker} />
                                    <ErrorMessage name="dateOfBirth" component="div" />
                                </FormGroup>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="sourceMarket">Source Market</label>
                                    <Field name={'sourceMarket'} component={Select} options={props.sourceMarkets} />
                                    <ErrorMessage name="sourceMarket" component="div" />
                                </FormGroup>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="season">Season</label>
                                    <Field name={'season'} component={Select} options={props.seasons} />
                                    <ErrorMessage name="season" component="div" />
                                </FormGroup>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="dateOfFlight">Date Of Flight</label>
                                    <Field name={'dateOfFlight'} component={DatePicker} />
                                    <ErrorMessage name="dateOfFlight" component="div" />
                                </FormGroup>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="statusOfFlight">Status Of The Flight</label>
                                    <Field name={'statusOfFlight'} component={Select} options={props.flightStatuses} />
                                    <ErrorMessage name="statusOfFlight" component="div" />
                                </FormGroup>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="hotelNeeded">Hotel Needed</label>
                                    <Field name={'hotelNeeded'} component={Checkbox} />
                                    <ErrorMessage name="hotelNeeded" component="div" />
                                </FormGroup>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="role">Role</label>
                                    <Field name={'role'} component={Select} options={props.roles} />
                                    <ErrorMessage name="role" component="div" />
                                </FormGroup>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="destination">Destination</label>
                                    <Field name={'destination'} component={Select} options={props.destinations} />
                                    <ErrorMessage name="destination" component="div" />
                                </FormGroup>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <Field name={'gender'} component={Gender} />
                                    <ErrorMessage name="gender" component="div" />
                                </FormGroup>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="phone">Phone</label>
                                    <Field className="form-control" type="text" name="phone" />
                                    <ErrorMessage name="phone" component="div" />
                                </FormGroup>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="departureAirport">Departure Airport</label>
                                    <Field name={'departureAirport'} component={MultiSelect} options={props.airports} />
                                    <ErrorMessage name="departureAirport" component="div" />
                                </FormGroup>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="arrivalAirport">Arrival Airport</label>
                                    <Field name={'arrivalAirport'} component={MultiSelect} options={props.airports} />
                                    <ErrorMessage name="arrivalAirport" component="div" />
                                </FormGroup>
                            </Col>

                            <Col xl="4" lg="6" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="typeOfFlight">Type Of Flight</label>
                                    <Field name={'typeOfFlight'} component={Select} options={props.flights} />
                                    <ErrorMessage name="typeOfFlight" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xl="12" lg="612" md="12" sm="12" xs="12">
                                <FormGroup>
                                    <label htmlFor="comment">Comment</label>
                                    <Field className="form-control" component="textarea" rows="5" name="comment" />
                                    <ErrorMessage name="comment" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="divider-up">
                            <Col xs="12">
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
