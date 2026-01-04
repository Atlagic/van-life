import React from "react";
import {useOutletContext} from "react-router-dom";

export default function HostVanPricing() {
    const { hostVanDetail } = useOutletContext();

    return (
        <h3 className="host-van-price">${hostVanDetail.price}<span>/day</span></h3>
    )
}
