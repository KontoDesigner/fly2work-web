import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import New from '../views/new/new'
import NewEdit from '../views/new/edit'
import Confirmed from '../views/confirmed/confirmed'
import ConfirmedEdit from '../views/confirmed/edit'
import Overview from '../views/overview/overview'
import OverviewEdit from '../views/overview/edit'
import Pending from '../views/pending/pending'
import PendingEdit from '../views/pending/edit'
import Submitted from '../views/submitted/submitted'
import SubmittedEdit from '../views/submitted/edit'
import NotFound from '../views/notFound/notFound'

const Routes = props => (
    <Switch>
        <Route path="/" exact component={() => <Redirect to="/new" />} />

        <Route exact path="/new" component={New} staffs={props.staffs} />
        <Route exact path="/new/:id" render={props => <NewEdit {...props} ignoreThis={true} />} />

        <Route exact path="/confirmed" component={Confirmed} />
        <Route exact path="/confirmed/:id" render={props => <ConfirmedEdit {...props} ignoreThis={true} />} />

        <Route exact path="/overview" component={Overview} />
        <Route exact path="/overview/:id" render={props => <OverviewEdit {...props} ignoreThis={true} />} />

        <Route exact path="/pending" component={Pending} />
        <Route exact path="/pending/:id" render={props => <PendingEdit {...props} ignoreThis={true} />} />

        <Route exact path="/submitted" component={Submitted} />
        <Route exact path="/submitted/:id" render={props => <SubmittedEdit {...props} ignoreThis={true} />} />

        <Route component={NotFound} />
    </Switch>
)

export default Routes
