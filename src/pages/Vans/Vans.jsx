import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../../api.js"

export default function Vans() {
    const [vansData, setVansData ] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const VANS_PER_PAGE = 4;
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

    useEffect(() => {
        setCurrentPage(1)
    }, [typeFilter]);

    const displayedVanElements = typeFilter ? vansData.filter(van => van.type === typeFilter ) : vansData;

    const totalPages = Math.ceil(displayedVanElements.length / VANS_PER_PAGE )
    const startIndex = (currentPage - 1) * VANS_PER_PAGE
    const endIndex = startIndex + VANS_PER_PAGE
    const paginatedVans = displayedVanElements.slice(startIndex, endIndex)

    const vanElements = paginatedVans.map(van => (
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

    function handlePageChange(page) {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

            { totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="prev"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            opacity: currentPage === 1 ? 0.5 : 1
                        }}
                    >
                        &lt;
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            className="nums"
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            style={{
                                padding: '8px 12px',
                                fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
                                backgroundColor: currentPage === index + 1 ? '#FF8C38' : '#ffffff',
                                color: currentPage === index + 1 ? 'white' : 'inherit',
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        className="next"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            opacity: currentPage === totalPages ? 0.5 : 1
                        }}
                    >
                        &gt;
                    </button>
                </div>
            )}
        </div>
    )
}

//TODO saerch params where you can select multiple filters, like van that is either luxury or simple ( there's answer in gpt )
//TODO loading spinner instead of loading text
//TODO throw different error message if there's no van with id like /vans/12313212, same for the host/vans/123123
//TODO convert css to scss
