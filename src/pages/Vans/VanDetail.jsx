import React, { useEffect, useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom";
import { getVan } from "../../../api.js";

export default function VanDetail() {
    const params = useParams()
    // const { id } = useParams() and use id instead of params.id

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const location = useLocation()
    const [van, setVan] = useState(null)

    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVan(params.id)
                setVan(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        loadVans()
    }, [params.id])

    if (loading) return <h1 aria-live="polite" style={{padding: 20 + 'px'}}>Loading...</h1>
    if (error)   return <h1 aria-live="assertive" style={{padding: 20 + 'px'}}>There was an error: {error.message}</h1>

    const search = location.state?.search || '';
    const type = location.state?.type || 'all'

    return (
        <div className="van-detail-container">
            {/* chaining location state of filters ( search params ) to return link */}
            <Link to={`..${search}`} relative="path" className='back-button'>
                &larr; <span>Back to {type} vans</span>
            </Link>

            { van &&
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            }
        </div>
    )
}

//TODO instead of doing fetch request every time save data in local storage / cache
//TODO grab th piece of data that we have baced on url instead of making whole fetch request on van detail page
