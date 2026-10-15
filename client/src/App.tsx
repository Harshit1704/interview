import { useState, useEffect } from "react";
import ComponentA from "./components/componentA";
import {getUsers, type User} from "./services/userService";


function App (){
  const [user, setUser] = useState<User[]>([]);

  useEffect(()=>{
    getUsers().then((users) => {
      if (users) {
        setUser(users);
      }
    });
  },[]);


  return (
    <> 
        <ComponentA setUserData={setUser}/>
        {user && user.map((user:any, index:number) => (
          <div key={index}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        ))}
      
    </>

  );

}

export default App;