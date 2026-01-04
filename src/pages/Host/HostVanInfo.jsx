import {useOutletContext} from "react-router-dom";

export default function HostVanInfo() {
    const { hostVanDetail } = useOutletContext();
    return (
        <section className="host-van-detail-info">
            <h4>Name: <span>{hostVanDetail.name}</span></h4>
            <h4>Category: <span>{hostVanDetail.type}</span></h4>
            <h4>Description: <span>{hostVanDetail.description}</span></h4>
            <h4>Visibility: <span>Public</span></h4>
        </section>

    )
}
