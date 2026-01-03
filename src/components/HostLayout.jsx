import { NavLink, Outlet } from 'react-router-dom';

export default function HostLayout() {
    return (
        <>
            <nav className="host-nav">
                <NavLink className={({isActive}) => isActive ? 'active-link' : null } end to="/host">Dashboard</NavLink>
                <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="/host/income">Income</NavLink>
                <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="/host/reviews">Reviews</NavLink>
            </nav>
            <Outlet />
        </>
    )
}
