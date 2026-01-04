import React, { useEffect, useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom";

export default function VanDetail() {
    const params = useParams()
    // const { id } = useParams() and use id instead of params.id

    const location = useLocation()
    const [van, setVan] = useState(null)

    useEffect(() => {
        fetch(`/api/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [params.id])

    const search = location.state?.search || '';
    const type = location.state?.type || 'all'

    return (
        <div className="van-detail-container">
            {/* chaining location state of filters ( search params ) to return link */}
            <Link to={`..${search}`} relative="path" className='back-button'>
                &larr; <span>Back to {type} vans</span>
            </Link>

            { van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2> }
        </div>
    )
}

//TODO instead of doing fetch request every time save data in local storage / cache
//TODO grab th piece of data that we have baced on url instead of making whole fetch request on van detail page
