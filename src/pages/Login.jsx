import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { loginUser } from "../../api"

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const fromPath = location.state?.fromPath || '/host' // fromPath is either location.pathname from AuthRequired or '/host'

    function handleSubmit(e) {
        e.preventDefault()
        setStatus('submitting');
        setError(null);

        const userData = loginUser(loginFormData)
        userData
            .then(data => {
                console.log(data);
                localStorage.setItem('loggedin', true)
                setError(null);
                navigate(fromPath, {replace: true})
                // replace: after successfully logging in, when hitting back button, preventing from going back to login
                // fromPath: purpose is to navigate us back to the page where we wanted to navigate before being forced to log in
            })
            .catch(err => setError(err.message))
            .finally(() => {
                setStatus('idle')
            })

        //or with async func
        // async function userData() {
        //     try {
        //         const data = await loginUser(loginFormData)
        //         console.log(data);
        //     } catch (err) {
        //         console.log(err)
        //     }
        // }
        // userData();

    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            { location.state?.message && <h3 className="login-first"> { location.state?.message }</h3> }
            <h1>Sign in to your account</h1>
            { error && <h3 className="login-first">{error}</h3> }
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button disabled={status === 'submitting'}>
                    { status === 'submitting' ? 'Logging in...' : 'Log in' }
                </button>
            </form>
        </div>
    )

}
