import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Select from '../../../components/select'
import MultiSelect from '../../../components/multiSelect'
import { Row, Col, FormGroup, Button } from 'reactstrap'

const EditUserDialog = props => {
  return (
    <div>
      <h1>{props.staff.name}</h1>

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
                  <label htmlFor="sourceMarket">sourceMarket</label>
                  <Field className="form-control" type="text" name="sourceMarket" />
                  <ErrorMessage name="sourceMarket" component="div" />
                </FormGroup>
              </Col>

              <Col xl="4" lg="6" md="12" sm="12" xs="12">
                <FormGroup>
                  <label htmlFor="id">Role</label>
                  <Field className="form-control" type="text" name="role" />
                  <ErrorMessage name="role" component="div" />
                </FormGroup>
              </Col>

              <Col xl="4" lg="6" md="12" sm="12" xs="12">
                <FormGroup>
                  <label htmlFor="id">Destination</label>
                  <Field className="form-control" type="text" name="destination" />
                  <ErrorMessage name="destination" component="div" />
                </FormGroup>
              </Col>

              <Col xl="4" lg="6" md="12" sm="12" xs="12">
                <FormGroup>
                  <label htmlFor="id">Gender</label>
                  <Field className="form-control" type="text" name="gender" />
                  <ErrorMessage name="gender" component="div" />
                </FormGroup>
              </Col>

              <Col xl="4" lg="6" md="12" sm="12" xs="12">
                <FormGroup>
                  <label htmlFor="id">Phone</label>
                  <Field className="form-control" type="text" name="phone" />
                  <ErrorMessage name="phone" component="div" />
                </FormGroup>
              </Col>

              <Col xl="4" lg="6" md="12" sm="12" xs="12">
                <FormGroup>
                  <label htmlFor="id">Departure Airport</label>
                  <Field name={'departureAirport'} component={MultiSelect} options={props.airports} />
                  <ErrorMessage name="departureAirport" component="div" />
                </FormGroup>
              </Col>

              <Col xl="4" lg="6" md="12" sm="12" xs="12">
                <FormGroup>
                  <label htmlFor="id">Arrival Airport</label>
                  <Field name={'arrivalAirport'} component={MultiSelect} options={props.airports} />
                  <ErrorMessage name="arrivalAirport" component="div" />
                </FormGroup>
              </Col>

              <Col xl="4" lg="6" md="12" sm="12" xs="12">
                <FormGroup>
                  <label htmlFor="id">Type Of Flight</label>
                  <Field name={'typeOfFlight'} component={Select} options={props.flights} />
                  <ErrorMessage name="typeOfFlight" component="div" />
                </FormGroup>
              </Col>

              <Col xs="12">
                <Button type="submit" color="success" disabled={isSubmitting}>
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
