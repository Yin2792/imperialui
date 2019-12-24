import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import DashboardNavbar  from './features/admin/components/dashboardnavbar';
import {withCookies} from 'react-cookie';
import { readCookie } from './helper/cookieUser'
import * as RoutePath from "./config/routeConfig";
import Home from "./features/home/container/homeContainer";
import LoginContainer from "./features/admin/container/loginContainer";
import AdminDashboardContainer from "./features/admin/container/dashboardContainer"
import {RegisterContainer} from './features/admin/container/registerContainer'

const App =props => {
    
  return (
    <Router>
      {/* {window.location.pathname == "/dashboard" ? <div><DashboardNavbar></DashboardNavbar></div> : null} */}
      {/* {window.location.pathname !== '/login' && window.location.pathname !== '/dashboard' ? null : <div><DashboardNavbar></DashboardNavbar></div>} */}
      <Switch>
        <Route path={`${RoutePath.Login}`} component={LoginContainer} />
        <Route path={`${RoutePath.AdminDashboard}`} component={AdminDashboardContainer}  />
        <Route path={`${RoutePath.Home}`} exact component={Home} />
        <Route path={`${RoutePath.Admin_Register}`} component={RegisterContainer}/>
        <Redirect to={`${RoutePath.Home}`}/>
      </Switch>
    </Router>

  );
};

export default App;
