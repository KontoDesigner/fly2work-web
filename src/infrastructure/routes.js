import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import New from '../views/new/new'
import Edit from '../views/new/edit/edit'
import Confirmed from '../views/confirmed/confirmed'
import Overview from '../views/overview/overview'
import Pending from '../views/pending/pending'
import Submitted from '../views/submitted/submitted'
import NotFound from '../views/notFound/notFound'

const Routes = props => (
  <div className="container">
    <Switch>
      <Route path="/" exact component={() => <Redirect to="/new" />} />
      <Route exact path="/new" component={New} staffs={props.staffs} />
      <Route exact path="/new/:id" render={props => <Edit {...props} ignoreThis={true} />} />
      <Route exact path="/confirmed" component={Confirmed} />
      <Route exact path="/overview" component={Overview} />
      <Route exact path="/pending" component={Pending} />
      <Route exact path="/submitted" component={Submitted} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default Routes
