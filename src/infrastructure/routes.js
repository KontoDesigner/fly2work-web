import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import New from '../views/new/new'
import NewEdit from '../views/new/edit'
import Confirmed from '../views/confirmed/confirmed'
import ConfirmedEdit from '../views/confirmed/edit'
import Overview from '../views/overview/overview'
import OverviewEdit from '../views/overview/edit'
import PendingBTT from '../views/pendingBTT/pendingBTT'
import PendingBTTEdit from '../views/pendingBTT/edit'
import Submitted from '../views/submitted/submitted'
import SubmittedEdit from '../views/submitted/edit'
import PendingHR from '../views/pendingHR/pendingHR'
import PendingHREdit from '../views/pendingHR/edit'
import NotFound from '../views/notFound/notFound'
import Unauthorized from '../views/unauthorized/unauthorized'
import { UserRoles as userRoles } from '../constants/userConstants'

const Routes = props => {
    const authorized = props.userRoles && (props.userRoles.includes(userRoles.BS) || props.userRoles.includes(userRoles.BTT))

    if (authorized) {
        return (
            <Switch>
                <Route path="/" exact component={() => <Redirect to="/new" />} />

                <Route exact path="/new" component={New} staffs={props.staffs} />
                <Route exact path="/new/:id" render={props => <NewEdit {...props} ignoreThis={true} />} />

                <Route exact path="/confirmed" component={Confirmed} />
                <Route exact path="/confirmed/:id" render={props => <ConfirmedEdit {...props} ignoreThis={true} />} />

                <Route exact path="/overview" component={Overview} />
                <Route exact path="/overview/:id" render={props => <OverviewEdit {...props} ignoreThis={true} />} />

                <Route exact path="/pendingbtt" component={PendingBTT} />
                <Route exact path="/pendingbtt/:id" render={props => <PendingBTTEdit {...props} ignoreThis={true} />} />

                <Route exact path="/submitted" component={Submitted} />
                <Route exact path="/submitted/:id" render={props => <SubmittedEdit {...props} ignoreThis={true} />} />

                <Route exact path="/pendinghr" component={PendingHR} />
                <Route exact path="/pendinghr/:id" render={props => <PendingHREdit {...props} ignoreThis={true} />} />

                <Route component={NotFound} />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route component={Unauthorized} />
            </Switch>
        )
    }
}

export default Routes
