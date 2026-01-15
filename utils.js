import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem("loggedin") === 'true';
    console.log(isLoggedIn)
    if (!isLoggedIn) {
        const response = redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        )

        response.body = true
        return response
    }
}

// export async function requireAuth({ request }) {
//     const isLoggedIn = localStorage.getItem("loggedin")
//
//     if (!isLoggedIn) {
//         const pathname = new URL(request.url).pathname
//         const params = new URLSearchParams({
//             message: "You must be logged in first",
//             fromPath: pathname
//         })
//         throw redirect(`/login?${params.toString()}`)  // THROW instead of return
//     }
//
//     return null
// }

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
