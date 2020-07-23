import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
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
         
     }
     render() {
          const redirectToSignIn = this.state.redirectToSignIn;
          if(redirectToSignIn){
               return <Redirect to="/signin"/>
          }
          return (
               <div className="container m-2">
                    <h2 className="mt-5 mb-5">Profile Page</h2>
                    <p>{`Name: ${isAuthenticated().user.name}`}</p>
                    <p>{`Email Address: ${isAuthenticated().user.email}`}</p>
                    <p>{`Joined: ${new Date(this.state.user.created).toDateString()}`}</p>
                    
               </div>
          )
     }
}
export default Profile;
