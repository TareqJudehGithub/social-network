import React, { Component } from 'react'
import { list } from "./apiUser";

class Users extends Component {
    state = {
         users: []
    }
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

                    <div className="card">
                    {  
                          users.map(user => {
                             return (
                              <div key={user._id}>
                                   {user.name}
                              </div>
                             )
                         })
                    }
                    </div>
               </div>
          )
     }
}

export default Users;
