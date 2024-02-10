import { useState } from "react";

function Login() {
    const [login, setLogin] = useState({})


    function res(){
    e.preventDefault()
    console.log(login)
    axios
      .post("http://localhost:8080/users/login", login, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }


    return (
        <div>
            <form action="submit">
                <input type="email" name="email" id="1" placeholder="email" onChange={(e) => setLogin({...login, email: e.target.value})} />
                <input type="password" name="password" id="2" placeholder="password" onChange={(e) => setLogin({...login, password: e.target.value})} />
                <input type="submit" value="Login" onClick={res} />
            </form>
        </div>
    )
}

export default Login;