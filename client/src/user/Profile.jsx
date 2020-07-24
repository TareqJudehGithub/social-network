import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { read } from "./apiUser";

class Profile extends Component {
     state = {
          user: "",
          redirectToSignIn: false
     };

    

     init = userId => {
          const token = isAuthenticated().token;

          read(userId, token)
          .then(data => {
              this.setState({user: (data)});
          })
          .catch(error => {
               console.log(error);
               this.setState({ redirectToSignIn: true});
          });
     };

     componentDidMount() {
          const userId = this.props.match.params.id;
          this.init(userId);
     };

     render() {
          const { user, redirectToSignIn } = this.state;
          
          if(redirectToSignIn){
               return <Redirect to="/signin"/>
          }
         
          return (
               <div className="container m-2">
                    <div className="row">
                              
                         <div className="col-md-6">
                              <h2 className="mt-5 mb-5">Profile Page</h2>
                              <p>{`Name: ${isAuthenticated().user.name}`}</p>
                              <p>{`Email Address: ${isAuthenticated().user.email}`}</p>
                              <p>{`Joined: ${new Date(user.created).toDateString()}`}</p>              
                         </div>
                         <div className="col-md-6">
                              {
                              isAuthenticated().user && isAuthenticated().user._id === user._id 
                              &&
                              (
                                   <div className="d-inline-block mt-5">
                                        <Link className="btn btn-raised btn-success mr-5"
                                             to ={`/api/users/update/${user._id}`}
                                        >
                                             Edit
                                        </Link>
                                        <button className="btn btn-raised btn-danger">Delete</button>
                                   </div>

                              )
                              }
                              
                         </div>
                    </div>
               </div>
          )
     }
}
export default Profile;
