import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { read } from "./apiUser";
import avatar from "../assets/images/user-avatar.jpg";
import DeleteUser from "./DeleteUser";


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
     /* Fetch back logged in user profile from the backend, whenever the user
      access his profile page in the frontend: */
     
     // componentWillReceiveProps(props) {
     //      const userId = props.match.params.userId;
     //      this.init(userId);
     // };

     render() {
          const { user, redirectToSignIn } = this.state;
          
          if(redirectToSignIn){
               return <Redirect to="/signin"/>
          }
          // if(!isAuthenticated.token){
          //      signOut();
          //      return <Redirect to="/signin" />
          // }
          return (
               <div className="container text-center">
                    <h2 className="mt-5 mb-5">Profile Page</h2>

                    <div className="row">                  
                         <div className="col-md-6">
                              <img className="card-img-top" 
                                        src={avatar} alt="avatar"
                                        style={{width: "50%"}}
                              />
                              <div className="lead mt-5">
                                   <p>{`Name: ${user.name}`}</p>
                              </div>             
                         </div>
                         <div className="col-md-6 text-left">
                         <div className="lead">
                              <p>{`Email Address: ${user.email}`}</p>
                              <p>{`Joined: ${new Date(user.created).toDateString()}`}</p> 
                         </div>  
                              { /* Only authenticated users get to edit and delete: */}
                              {
                              isAuthenticated().user && isAuthenticated().user._id === user._id 
                              &&
                              (
                                   <div className="d-inline-block mt-5">
                                        <Link 
                                             to={`/users/update/${user._id}`}
                                             //  to={`/users/update/${user._id}`}
                                             className="btn btn-raised btn-primary mr-2"
                                            
                                        >
                                             Edit
                                        </Link>
                                        <DeleteUser userId={user._id}/>       
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
