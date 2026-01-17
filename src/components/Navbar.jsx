import {Link, NavLink, useNavigate } from "react-router-dom";
import avatarIcon from "../assets/images/avatar.svg";
export default function Navbar() {
    const navigate = useNavigate()

    function handleAvatarClick() {
        const isLoggedIn = localStorage.getItem("loggedin") === "true"
        navigate( isLoggedIn ? "host" : "login" )
    }

    return (
        <nav>
            <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="/vans">Vans</NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="/about">About</NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="/host">Host</NavLink>
            <button className="login-link" onClick={handleAvatarClick}>
                <img src={avatarIcon} className="login-icon" />
            </button>
        </nav>
    )
}
