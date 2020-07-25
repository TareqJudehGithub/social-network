import React, { Component } from 'react';
import { isAuthenticated, signOut } from "../auth/index";
import { remove } from '../user/apiUser';
import { Redirect } from 'react-router-dom';

class DeleteUser extends Component {

     state = {
          redirect: false
     }

     confirmDeleteHandler = () => {
          let answer = window.confirm("Delete Account?");
          if(answer) {
               this.deleteAccount()
          }
     }
     deleteAccount = () => {
          const token = isAuthenticated().token;
          const userId = this.props.userId;
          remove(userId, token)
          .then(data => {
               // signout user
                    signOut(() => console.log(`User was deleted!`));
               // redirect
               this.setState({ redirect: true })
          })
          .catch(error => console.log(error));
     }

     render() {
          if(this.state.redirect) {
               return <Redirect to = ""/>
          }
          return (
               <button 
                    className="btn btn-raised btn-danger"
                    onClick={this.confirmDeleteHandler}
               >
                    Delete
               </button>
          )
     }
}
export default DeleteUser;
