import React from 'react';
import { signUp } from "../auth/index";

class Signup extends React.Component {
     constructor(){
          super()
          this.state = {
               name: "",
               email: "",
               password: "",
               password2: "",
               error: "",
               open: false
          }
     };
     
     onchangeHandler = event => {
          const { name, value } = event.target;
          this.setState({
               [name]: value,
               error: ""
          });
     };

     onSubmitHandler = async event => {
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
                    password: password
               };
               
               signUp(user)
               .then(error => {
                    if(error.msg){
                         
                         return this.setState({ error: error.msg });
                    }      
                    else {                 
                         this.setState({
                              name: "",
                              email: "",
                              password: "",
                              password2: "",
                              error: "",
                              open: true
                         });
                    }
               })
          }
     };

     render() {
          
          const { name, email, password, password2, error, open } = this.state;
          return (
               <div className="container">
                    <h2 className="mt-5 mb-5">Sign up</h2>

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
                                   placeholder="" autoComplete="password2"
                                   onChange={this.onchangeHandler}
                         />
                         <small id="password" className="form-text text-muted">
                              Your password must be 7-15 characters long, contain letters and numbers, 
                              and special characters.
                         </small>
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
                              Signup
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
                              <h6>User Signed up successfully!</h6>
                         </div>

                    </form>
               </div>
          )
     }
}
export default Signup;
