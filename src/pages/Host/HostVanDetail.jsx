import {Link, NavLink, Outlet, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getHostVan} from "../../../api.js";

export default function HostVanDetail() {
    const { id } = useParams();
    const [ hostVanDetail, setHostVanDetail ] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadVanDetail() {
            setLoading(true)
            try {
                const data = await getHostVan(id)
                setHostVanDetail(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadVanDetail()
    }, [id]);

    if (loading) return <h1 aria-live="polite" style={{padding: 20 + 'px'}}>Loading...</h1>
    if (error)   return <h1 aria-live="assertive" style={{padding: 20 + 'px'}}>There was an error: {error.message}</h1>

    return (
        <section style={{margin: 30 + 'px'}}>
            {/*relative="path" means we go one level up based on path not route hierarchy so we can use .. instead of ../vans */}
            <Link to=".." relative="path" className="back-button">
                &larr; <span>Back to all vans</span>
            </Link>

            { hostVanDetail &&
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
            }
        </section>
    )
}
