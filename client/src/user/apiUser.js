export const read = (userId, token) => {
     
     return fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, {
          method: "GET", 
          headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: `${token}`
          }
     })
     .then(response => { 
          return response.json() 
     })
     .catch(error => {
          console.log(error);
     });
};

export const list = () => {
     return fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
          method: "GET"
     })
     .then(response => {
          return response.json();
     })
     .catch(error => {
          console.log(error);
     });
};
export const updateUser = (userId, token, user ) => {
     return fetch(`${process.env.REACT_APP_API_URL}/api/users/update/${userId}`,{
          method: "PUT",
          headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: `${token}`
          },
          body: JSON.stringify(user)
     })
     .then(response => {
          return response.json()  //response will be in the //updateUser() in EditProfile.jsx
     })
     .catch(error => console.log(error))

}

export const remove = (userId, token) => {
     
     return fetch(`${process.env.REACT_APP_API_URL}/api/users/del/${userId}`, {
          method: "Delete", 
          headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: `${token}`
          }
     })
     .then(response => { 
          return response.json() 
     })
     .catch(error => {
          console.log(error);
     });
};