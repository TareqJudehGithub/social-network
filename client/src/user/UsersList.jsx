import React, { Component } from 'react'
import { list } from "./apiUser";

class UsersList extends Component {
    state = {
         users: []
    };
    
    componentDidMount = () => {
         // list all users method: 
         list()
          .then(data => {
              this.setState({ users: data })
          })
          .catch(error => console.log(error))
    }

     render() {

          const { users } = this.state;

          return (
               <div className="container">
                    <h2 className="mt-5 mb-5">Users</h2>

                    <div className="row">
                    {  
                          users.map(user => {
                             return (
                              <div className="card col-md-4" key={user._id}>
                                   <img className="card-img-top" src="" alt="user" />
                                   <div className="card-body">
                                   <h5 className="card-title">{user.name}</h5>
                                   <p className="card-text">{user.email}</p>
                                   <a href="#!" className="btn btn-primary">View Profile</a>
                                   </div>
                              </div>
                             )
                         })
                    }
                    </div>
               </div>
          )
     }
}

export default UsersList;
