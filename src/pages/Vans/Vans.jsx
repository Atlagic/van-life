import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../../api.js"

export default function Vans() {
    const [vansData, setVansData ] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const typeFilter = searchParams.get('type');

    useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const data = await getVans();
                setVansData(data);
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadVans();
    }, []);

    const displayedVanElements = typeFilter ? vansData.filter(van => van.type === typeFilter ) : vansData;

    const vanElements = displayedVanElements.map(van => (
        <div key={van.id} className="van-tile">
            {/* save the *history state of filters ( search params ) so filters are still there when going back to this page */}
            <Link to={`/vans/${van.id}`} state={{ search: `?${searchParams.toString()}`, type: typeFilter }}>
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

    // function generateNewSearchParamStr(key, value) {
    //     const sp = new URLSearchParams(searchParams);
    //
    //     if (value === null) {
    //         sp.delete('type')
    //     } else {
    //         sp.append(key, value);
    //     }
    //
    //     return `?${sp.toString()}`;
    // }

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            value === null ? prevParams.delete(key) : prevParams.set(key, value )

            return prevParams
        })
    }

    if (loading) return <h1 aria-live="polite" style={{padding: 20 + 'px'}}>Loading...</h1>
    if (error)   return <h1 aria-live="assertive" style={{padding: 20 + 'px'}}>There was an error: { error.message }</h1>

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                {/*<Link className="van-type simple" to="?type=simple">Simple</Link>*/}
                {/*<Link className="van-type luxury" to="?type=luxury">Luxury</Link>*/}
                {/*<Link className="van-type rugged" to="?type=rugged">Rugged</Link>*/}
                {/*{ typeFilter && <Link className="van-type clear-filters" to=".">Clear filter</Link> }*/}

                <button className={`van-type simple ${typeFilter === 'simple' ? 'selected' : null }`} onClick={() => handleFilterChange('type', 'simple')}>Simple</button>
                <button className={`van-type luxury ${typeFilter === 'luxury' ? 'selected' : null }`}  onClick={() => handleFilterChange('type', 'luxury')}>Luxury</button>
                <button className={`van-type rugged ${typeFilter === 'rugged' ? 'selected' : null }`} onClick={() => handleFilterChange('type', 'rugged')}>Rugged</button>
                { typeFilter && <button className="van-type clear-filters" onClick={() => handleFilterChange('type', null) }>Clear filter</button> }
            </div>
            <div className="van-list">
                { vanElements }
            </div>
        </div>
    )
}

//TODO add pagination
//TODO saerch params where you can select multiple filters, like van that is either luxury or simple ( there's answer in gpt )
//TODO loading spinner instead of loading text
//TODO throw different error message if there's no van with id like /vans/12313212, same for the host/vans/123123
