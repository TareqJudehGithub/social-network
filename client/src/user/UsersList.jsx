import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { list } from "./apiUser";
import avatar from "../assets/images/user-avatar.jpg";



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
               <div className="container text-center">
                    <h2 className="mt-5 mb-5">Users</h2>

                    <div className="row">
                    {  
                          users.map(user => {
                             return ( 
                                   <div className="card-group col-md-4 
                                        shadow p-3 mb-5 bg-white rounded" 
                                   key={user._id}
                                   >
                                        <div className="card">
                                             <img className="card-img-top mx-auto" 
                                                  src={avatar} alt="user avatar"
                                                  style={{width: "50%"}}
                                             />
                                             <div className="card-body">
                                                  <h5 className="card-title">{user.name}</h5>
                                                  <p className="card-text">{user.email}</p>
                                                  <Link className="btn btn-primary"
                                                       to={`/users/${user._id}`}
                                                  >
                                                       View Profile
                                                  </Link>
                                             </div>
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
