import {useParams} from "react-router-dom";
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
        <div className="host-van-detail-container">
            { hostVanDetail ? (
                <div className="host-van-detail">
                    <img src={hostVanDetail.imageUrl} />
                    <i className={`van-type ${hostVanDetail.type} selected`}>{hostVanDetail.type}</i>
                    <h2>{hostVanDetail.name}</h2>
                    <p className="van-price"><span>${hostVanDetail.price}</span>/day</p>
                </div>
            ) : <h2>Loading...</h2> }
        </div>
    )
}
