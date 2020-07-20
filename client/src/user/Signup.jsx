import React from 'react'

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

              // return alert(`Password and Confirm Password must match!`);
               return(
                    <div class="alert alert-danger" role="alert">
                         {
                              alert(`Password and Confirm Password must match!`)
                         }
                    </div>
               )
          }
          else{
               const user = {
                    name: name,
                    email: email,
                    password: password
               };
             
               this.signUp(user)
               .then(data => {
                    if(data.msg){
                         console.log(`Error: `, this.state.error);
                         return this.setState({ error: data.msg });
                         
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
     
     signUp = async(user) => {
          return await fetch(`http://localhost:8080/api/signup`, {
               method: "POST",
               headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
               },
               body: JSON.stringify(user)
          })
          .then(response => {
               return response.json();
          })
          .catch(err => {
               return console.log(err);
          })
     }

     render() {
          const { name, email, password, password2, error, open } = this.state;
          return (
               <div className="container">
                    <h2 className="mt-5 mb-5">Sign up</h2>



                    <form className="m-5" onSubmit={this.onSubmitHandler}>

                         <div className="form-group">
                              <label className="text-muted" htmlFor="name">Name</label>
                              <input className="form-control form-control"
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
{/*                          
                         {
                              error
                              ?
                              <div className="alert alert-danger" role="alert"  
                              >
                                   {error}
                              </div>
                              :
                              null

                         } */}
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
