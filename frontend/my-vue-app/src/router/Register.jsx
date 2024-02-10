import { useState } from "react"
import axios from "axios"

export default function Register(){
    const [register, setRegister] = useState({})

    function res (e){
      e.preventDefault()
      axios.post("http://localhost:8080/users/register", register, {
          withCredentials: true
      })
      .then((res) => {
          console.log(res)
      })
      .catch((err) => {
          console.log(err)
      })
    }


    return(
        <div>
            <form action="submit">
                <input type="text" name="name" id="" placeholder="name" onChange={(e) => setRegister({...register, name: e.target.value})}  />
                <input type="email" name="email" id="" placeholder="email" onChange={(e) => setRegister({...register, email: e.target.value})} />
                <input type="password" name="password" id="" placeholder="password" onChange={(e) => setRegister({...register, password: e.target.value})} />
                <input type="text" name="gender" id="" placeholder="gender" onChange={(e) => setRegister({...register, gender: e.target.value})} />
                <input type="submit" value="Register" onClick={res} />
            </form>
        </div>
    )
}