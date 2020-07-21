import React from 'react';
import {Route, Switch} from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import SignIn from "./user/SignIn";

const MainRouter = () => {
     return (
          <div>
               <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/signin" component={SignIn} />
               </Switch>
          </div>
     )
}

export default MainRouter;
