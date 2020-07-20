import React from 'react';
import {Redirect} from "react-router-dom";

export class SignIn extends React.Component {
     constructor(){
          super()
          this.state= {
               email: "",
               password: "",
               error: "",
               redirectToRefer: false
          }
     }
     onChangeHandler = event =>{
          const { name, value } = event.target;
          this.setState({
               [name]: value,
               error: ""
          });
     };

     onSubmitHandler = event => {
          const { email, password } = this.state;

          event.preventDefault();

          const user = {
               email: email,
               password: password
          };

          this.signIn(user)
          .then(data => {
               if(data.msg){
                    this.setState({ error: data.msg });
               }
               else{
                    this.authenticate(data, () => {
                         this.setState({
                              email: "",
                              password: "",
                              error: "",
                              redirectToRefer: true
                         })
                    })
               }
          })
     };

     signIn = user => {
          return fetch("http://localhost:8080/api/signin", {
               method: "POST",
               headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
               },
               body: JSON.stringify(user)
          })
          .then(response => response.json())
          .catch(error => console.log(error));
     };

     authenticate = (token, next) => {
          if(typeof window!== "undefined") {
               localStorage.setItem("token", JSON.stringify(token));
               next();
          }
     };

     render() {
          const { email, password, error, redirectToRefer } = this.state;
          if(redirectToRefer) {
               return <Redirect to="/"/>
          }
          return (
               
               <div className="container">
                    <h2 className="mt-5 mb-5">Sign In</h2>

                    <form className="m-5" onSubmit={this.onSubmitHandler}>

                         <div className="form-group">
                              <label className="text-muted" htmlFor="email" >
                                   Email Address
                              </label>
                              <input className="form-control"
                                   type="email" name="email" value={email} autoFocus
                                   onChange={this.onChangeHandler} required
                              />
                         </div>
                         <div className="form-group">
                              <label className="text-muted" htmlFor="password" >
                                   Password
                              </label>
                              <input className="form-control"
                                   type="password" name="password" value={password}
                                   onChange={this.onChangeHandler} autoComplete="password"
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
                    </form>
               </div>
          )
     }
}

export default SignIn;
