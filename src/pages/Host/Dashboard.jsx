import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    function logOut() {
        localStorage.removeItem('loggedin')
        navigate('/login')
    }
    return (
        <>
            <h1 style={{paddingInline: 26 + 'px'}}>This is your Dashboard</h1>
            <button className="log-out" onClick={logOut}>Log out</button>
        </>
    )
}
