import React from 'react';
import { Redirect } from "react-router-dom";
import { signIn, authenticate } from "../auth/index";

export class SignIn extends React.Component {
     constructor(){
          super()
          this.state= {
               email: "",
               password: "",
               error: "",
               redirectToRefer: false,
               loading: false
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

          this.setState({ loading: true });

          const user = {
               email: email,
               password: password
          };

          signIn(user)
          .then(data => {
               if(data.msg){
                    this.setState({ 
                         error: data.msg,
                         loading: false
                     });
                    console.log(this.state.error);
                    
               }
               else{
                    authenticate(data, () => {
                         this.setState({
                              email: "",
                              password: "",
                              error: "",
                              redirectToRefer: true,
                              loading: false
                         })
                    })
               }
          })
     };

     render() {
          const { email, password, error, redirectToRefer, loading } = this.state;
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
                                   onChange={this.onChangeHandler} 
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
                         {
                              error
                              && 
                              <div className="alert alert-danger" role="alert">
                                   {error}
                              </div>
                         }
                         {
                              loading
                              && 
                              <div className="alert alert-info" role="alert">
                                   Loading please wait...
                              </div>
                         }

                    </form>
               </div>
          )
     }
}

export default SignIn;
