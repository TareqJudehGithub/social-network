
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
               console.log(response);
               return response.json() 
          })
          .catch(error => {
               console.log(error);
          });
     };