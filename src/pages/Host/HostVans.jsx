import { Link, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../../api.js";
import { requireAuth } from "../../../utils.js";

export async function loader({ request }) {
    const auth = await requireAuth(request);
    if (auth) return auth;

    return getHostVans();
}

export default function HostVans() {
    const hostVans = useLoaderData()

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


    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                <section>
                    { hostVansElements }
                </section>
            </div>
        </section>
    )
}
