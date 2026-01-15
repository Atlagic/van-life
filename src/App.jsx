import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom"
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Login, { loader as loginLoader, action as loginAction } from "./pages/Login.jsx";
//import AuthRequired from "./components/AuthRequired.jsx";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans.jsx";
import Error from "./components/Error.jsx";
import VanDetail, { loader as vanLoader } from "./pages/Vans/VanDetail.jsx";
import Layout from "./components/Layout.jsx";
import Reviews from "./pages/Host/Reviews.jsx";
import Dashboard from "./pages/Host/Dashboard.jsx";
import Income from "./pages/Host/Income.jsx";
import HostLayout from "./components/HostLayout.jsx";
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans.jsx";
import HostVanDetail, { loader as hostVanLoader } from "./pages/Host/HostVanDetail.jsx";
import HostVanInfo from "./pages/Host/HostVanInfo.jsx";
import HostVanPricing from "./pages/Host/HostVanPricing.jsx";
import HostVanPhotos from "./pages/Host/HostVanPhotos.jsx";
import NotFound from "./pages/NotFound.jsx";

import "../server.js";
import { requireAuth } from "../utils.js";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} >
        <Route index element={<Home/>} />
        <Route path="about" element={<About/>} />
        <Route path="vans" element={<Vans />} errorElement={<Error />}  loader={vansLoader}/>
        <Route path="vans/:id" element={<VanDetail />} errorElement={<Error />} loader={vanLoader}/>
        <Route path="login" element={<Login />} loader={loginLoader} action={loginAction} />
        <Route path="host" element={<HostLayout />} errorElement={<Error />} >
            <Route index element={<Dashboard />} loader={async ({ request }) => await requireAuth(request)} />
            <Route path="vans" element={<HostVans /> } errorElement={<Error />} loader={hostVansLoader} />
            <Route path="vans/:id" element={<HostVanDetail />} errorElement={<Error />} loader={hostVanLoader}>
                <Route index element={<HostVanInfo />} loader={async ({ request }) => await requireAuth(request)} />
                <Route path="pricing" element={<HostVanPricing />} loader={async ({ request }) => await requireAuth(request)} />
                <Route path="photos" element={<HostVanPhotos />} loader={async ({ request }) => await requireAuth(request)} />
            </Route>

            <Route path="income" element={<Income />} loader={async ({ request }) => await requireAuth(request)}/>
            <Route path="reviews" element={<Reviews />} loader={async ({ request }) => await requireAuth(request)} />
        </Route>

        <Route path="*" element={<NotFound/>} />
    </Route>
))
function App() {
    return (
      <RouterProvider router={router} />
    )
}

export default App

//TODO investigate how to use middleware instead of writing every single loader
