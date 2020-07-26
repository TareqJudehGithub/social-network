import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { read, updateUser } from "./apiUser";

class EditProfile extends Component {

     state = {
          id: "",
          name: "",
          email: "",
          password: "",
          password2: "",
          error: "",
          open: false,
          redirectToProfile: false
          
     };
     componentDidMount() {
          const userId = this.props.match.params.id;
          this.init(userId);
     };

     init = userId => {
          const token = isAuthenticated().token;
          read(userId, token)
          .then(data => {
               this.setState({ 
                    id: data._id,
                    name: data.name,
                    email: data.email
               });
          })
          .catch(error => console.log(error));

     };

     onchangeHandler = event => {
          const { name, value } = event.target;
          this.setState({
               [name]: value ,
               error: ""
          });
     };

     onSubmitHandler = event => {
          event.preventDefault();
          const { name, email, password, password2 } = this.state;

          if(password2 !== password){
               return this.setState({
                    error: `Password and Confirm Password must match!`
               })
           }
           else{
               const user = {
                    name: name,
                    email: email,
                    password: password || undefined
               };
               console.log(password);
               // save updated user details in the db:
               const userId = this.props.match.params.id;
               const token = isAuthenticated().token;
               
               updateUser(userId, token, user)
               .then(data => {
                    if(data.msg){
                         return this.setState({ error: data.msg });
                    }
                    else{
                         setTimeout(() => {
                              this.setState({ redirectToProfile: true })
                         }, 2500);
                         console.log(`Password:`, password);
                         
                         this.setState({
                              name: "",
                              email: "",
                              password: "",
                              password2: "",
                              error: "",
                              open: true,      
                         })
                    }
                   
               })
               .catch(data => {
                    console.log(this.state.error);
                    if(data.msg){
                         return this.setState({ error: data.msg });
                    }
                    
               })
           }
     };

     render() {
          const { id, name, email, password, password2, error, open, redirectToProfile } = this.state;
          if(redirectToProfile){
               return <Redirect to={`/users/${id}`}/>
          }
          return (
               <div className="container">
               <h2 className="mt-5 mb-5">Update User Details</h2>

               <form className="m-5" onSubmit={this.onSubmitHandler}>

                    <div className="form-group">
                         <label className="text-muted" htmlFor="name">Name</label>
                         <input className="form-control"
                              type="text" name="name" value={name}
                              placeholder="" autoFocus
                              onChange={this.onchangeHandler}
                    />
                    </div>
                    <div className="form-group">
                         <label className="text-muted" htmlFor="email" >Email Address</label>
                         <input className="form-control" 
                              type="email" name="email" value={email} 
                              placeholder=""
                              onChange={this.onchangeHandler}
                    />
                    </div>
                    <div className="form-group">
                         <label className="text-muted" htmlFor="password">Password</label>
                         <input id="password" className="form-control" aria-describedby="password"
                              type="password" name="password" value={password}
                              placeholder="" autoComplete="password"
                              onChange={this.onchangeHandler}
                    />
                    </div>
                    <div className="form-group">
                              <label className="text-muted" htmlFor="password2">Confirm Password</label>
                              <input className="form-control"
                                   type="password" name="password2" value={password2}
                                   placeholder="" autoComplete="password2"
                                   onChange={this.onchangeHandler}
                         />
                    </div>
                    
                    <button className="btn btn-primary" type="submit">
                         Update
                    </button>
                    
                    <div className="alert alert-danger" role="alert"
                         style={{
                              display: error ? "" : "none"
                         }}     
                    >
                         {error}
                    </div>
                    <div className="alert alert-info" role="alert"
                         style={{
                              display: open ? "" : "none"
                         }}     
                    >
                         <span>Update successful!   Redirecting to Profile page..</span>
                         

                    </div>

               </form>
          </div>
          )
     }
};
export default EditProfile;
