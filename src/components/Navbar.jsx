import {Link, Route} from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <Link to="/about">About</Link>
            <Link to="/vans">Vans</Link>
        </nav>
    )
}
