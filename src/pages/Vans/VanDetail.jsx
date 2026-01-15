import { Link, useLocation, useLoaderData } from "react-router-dom";
import { getVan } from "../../../api.js";

export function loader({params}) {
    return getVan(params.id);
}

export default function VanDetail() {
    const location = useLocation()
    // using loader instead of useEffect and setState
    const van = useLoaderData();

    const search = location.state?.search || '';
    const type = location.state?.type || 'all'

    return (
        <div className="van-detail-container">
            {/* chaining location state of filters ( search params ) to return link */}
            <Link to={`..${search}`} relative="path" className='back-button'>
                &larr; <span>Back to {type} vans</span>
            </Link>

            <div className="van-detail">
                <img src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>
        </div>
    )
}

//TODO instead of doing fetch request every time save data in local storage / cache
//TODO grab th piece of data that we have baced on url instead of making whole fetch request on van detail page
