import { NavLink, Outlet } from 'react-router-dom';
import {requireAuth} from "../../utils.js";

export async function loader({ request }) {
    await requireAuth(request)
    return null
}
export default function HostLayout() {
    return (
        <>
            <nav className="host-nav">
                <NavLink className={({isActive}) => isActive ? 'active-link' : null } end to=".">Dashboard</NavLink>
                <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="vans">Vans</NavLink>
                <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="income">Income</NavLink>
                <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="reviews">Reviews</NavLink>
            </nav>
            <Outlet />
        </>
    )
}
