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
               console.log(`List: `, response)
               return response.json();
          })
          .catch(error => {
               console.log(error);
          });
     }