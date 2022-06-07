import { useState } from "react"

import { Home } from "./Home"
import { Login } from "./Login"
import { Signup } from "./Signup"

export function App(){
//roteamento//troca de pag

  const [user,setUser] = useState()

  //se tiver user 
  if(user){
    return <Home loggedinUser={user}/> 
  }
   // carregamento das pag login e de cadastro na url
  return window.location.pathname === '/signup' ?  <Signup signInUser={setUser} /> : <Login signInUser={setUser}/>
   
}

