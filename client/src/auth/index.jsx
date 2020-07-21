// SignUp component method:
export const signUp = user => {
          return fetch(`http://localhost:8080/api/signup`, {
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
};
// SignIn component methods:
export const signIn = user => {
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

export const authenticate = (token, next) => {
     if(typeof window!== "undefined") {
          localStorage.setItem("token", JSON.stringify(token));
          next();
     }
};

// Menu components methods: 
export const signOut = next => {
     // in the client side, when a user logs out, remove the token:
     if(typeof window !== "undefined") localStorage.removeItem("token");
     next();
     // server side: 
     return fetch("http://localhost:8080/api/signout", {
          method: "GET"
     })
     .then(response => {
          return response.json();
     })
     .catch(error => console.log(error));
};

export const isAuthenticated = () => {
     if(typeof window === "undefined") {
          return false;
     }
     if(localStorage.getItem("token")){
          return JSON.parse(localStorage.getItem("token"));
     }
     else{
          return false;
     }
};