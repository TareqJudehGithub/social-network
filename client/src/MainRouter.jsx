import React from 'react';
import {Route, Switch} from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import SignIn from "./user/SignIn";
import Profile from "./user/Profile";
import UsersList from "./user/UsersList";
import EditProfile from "./user/EditProfile";


const MainRouter = () => {
     return (
          <div>
               <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/users" component={UsersList} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/signin" component={SignIn} />        
                    <Route exact path="/users/update/:id" component={EditProfile} />
                    <Route exact path="/users/:id" component={Profile} />
                    
               </Switch>
          </div>
     )
}

export default MainRouter;

