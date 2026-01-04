import {Link, NavLink, Outlet, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

export default function HostVanDetail() {
    const { id } = useParams();
    const [ hostVanDetail, setHostVanDetail ] = useState(null);

    useEffect(() => {
        fetch(`/api/host/vans/${id}`)
            .then(res => res.json())
            .then(data => setHostVanDetail(data.vans))
    }, [id]);

    return (
        <section style={{margin: 30 + 'px'}}>
            {/*relative="path" means we go one level up based on path not route hierarchy so we can use .. instead of ../vans */}
            <Link to=".." relative="path" className="back-button">
                &larr; <span>Back to all vans</span>
            </Link>

            { hostVanDetail ? (
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
            </div> ) : <h2>Loading...</h2> }
        </section>
    )
}
