import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="/host">Host</NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="/about">About</NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="/vans">Vans</NavLink>
        </nav>
    )
}
