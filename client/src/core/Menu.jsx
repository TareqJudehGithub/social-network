import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signOut} from "../auth/index";

const isActive = (history, path) => {
     if(history.location.pathname === path){
          return {color: "#ff9900"}
     }
     else{
          return {color: "#ffffff"}
     }
};


const Menu = ({ history }) => {

     if(isAuthenticated){ 
          console.log(isAuthenticated().user._id); 
     }
     return (
          <ul className="nav nav-tabs bg-primary">     

               <li className="nav-item">
                    <Link className="nav-link"to="/"
                         style={ isActive(history, "/")}
                    >
                    Home
                    </Link>
               </li>
               {
                    !isAuthenticated()
                    ?
                    <React.Fragment>
                          <li className="nav-item">
                              <Link className="nav-link" to="/signup"
                                   style={ isActive(history, "/signup")}>
                                   Signup
                              </Link>
                                   </li>
                         <li className="nav-item">
                              <Link className="nav-link" to="/signin"
                                   style={ isActive(history, "/signin") }>
                                   Signin
                              </Link>
                         </li>  
                    </React.Fragment>
                    :
                    <React.Fragment>
                         <li className="nav-item">
                              <a className="nav-link" href="#!"
                                   style={ isActive(history, "/signout") }
                                   onClick={() => signOut(() => history.push("/"))}
                              >
                                   Sign Out
                              </a>
                         </li>
                         <li className="nav-item"> 
                                   <Link className="nav-link" 
                                        to={`/users/${isAuthenticated().user._id}`}
                                        style={ isActive(history, 
                                             `/users/${isAuthenticated().user._id}`)}
                                   >
                                        {`Hello, ${isAuthenticated().user.name}!`}  
                                        
                                   </Link> 
                         </li>
                    </React.Fragment>
               }
          </ul>
     )
}

export default withRouter(Menu);
