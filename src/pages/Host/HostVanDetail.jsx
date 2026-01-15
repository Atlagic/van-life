import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getHostVan } from "../../../api.js";
import { requireAuth } from "../../../utils.js";

export async function loader({ params, request }) {
    await requireAuth(request)
    return getHostVan(params.id)
}

export default function HostVanDetail() {
    const hostVanDetail = useLoaderData();

    return (
        <section style={{margin: 30 + 'px'}}>
            {/*relative="path" means we go one level up based on path not route hierarchy so we can use .. instead of ../vans */}
            <Link to=".." relative="path" className="back-button">
                &larr; <span>Back to all vans</span>
            </Link>

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={hostVanDetail.imageUrl} />
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${hostVanDetail.type}`}
                        >
                            {hostVanDetail.type}
                        </i>
                        <h3>{hostVanDetail.name}</h3>
                    </div>
                </div>
                <nav className="host-van-detail-nav">
                    <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="." end >Details</NavLink>
                    <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="pricing" >Pricing</NavLink>
                    <NavLink className={({isActive}) => isActive ? 'active-link' : null } to="photos" >Photos</NavLink>
                </nav>
                <Outlet context={{hostVanDetail}}/>
            </div>
        </section>
    )
}
