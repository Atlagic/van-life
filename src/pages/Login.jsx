import { Form, redirect, useLoaderData, useActionData, useNavigation } from "react-router-dom"
import { loginUser } from "../../api"
import { sleep } from "../../utils.js"

export async function loader({ request }) {
    const params = new URL(request.url).searchParams
    return params.get('message')
}

export async function action({ request }) {
    await sleep(1000);

    const loginFormData = await request.formData()
    const email = loginFormData.get("email")
    const password = loginFormData.get("password")
    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/host"

    try {
        const userData = await loginUser({ email, password })
        localStorage.setItem("loggedin", true)
        const response = redirect(pathname);
        response.body = true
        return response;

    } catch(err) {
        return err.message
    }
    //how to do this with then
}

export default function Login() {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const navigation = useNavigation()

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h3 className="login-first">{message}</h3>}
            {errorMessage && <h3 className="red">{errorMessage}</h3>}

            <Form
                method="post"
                className="login-form"
                replace
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </Form>
        </div>
    )
}
//TODO add real authentication
