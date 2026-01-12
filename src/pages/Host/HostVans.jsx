import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getHostVans} from "../../../api.js";

export default function HostVans() {
    const [ hostVans, setHostVans ] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadHostVan() {
            setLoading(true)
            try {
                const data = await getHostVans()
                setHostVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
                setError(null)
            }
        }

        loadHostVan()
    }, []);

    const hostVansElements = hostVans.map(van => (
        <Link
            to={`/host/vans/${van.id}`}
            key={van.id}
            className="host-van-link-wrapper"
        >
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ))

    if (loading) return <h1 aria-live="polite" style={{padding: 20 + 'px'}}>Loading...</h1>
    if (error)   return <h1 aria-live="assertive" style={{padding: 20 + 'px'}}>There was an error: {error.message}</h1>

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {
                    hostVans.length > 0 ? (
                        <section>
                            {hostVansElements}
                        </section>

                    ) : (
                        <h2>Loading...</h2>
                    )
                }
            </div>
        </section>
    )
}
