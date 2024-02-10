import { Link } from "react-router-dom"


function Nav(){

    return (
        <div style={{display:"flex", gap:"10px"}} >
            <Link to="/">Home</Link>
            <Link to="/login">login</Link>
            <Link to="/register">register</Link>
            <Link to="/posts">posts</Link>
        </div>
    )
}

export default Nav