import {Link, NavLink} from "react-router-dom";
import avatarIcon from "../assets/images/avatar.svg";
export default function Navbar() {
    return (
        <nav>
            <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="/host">Host</NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="/about">About</NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="/vans">Vans</NavLink>
            <Link to="login" className="login-link">
                <img
                    src={avatarIcon}
                    className="login-icon"
                />
            </Link>
        </nav>
    )
}
