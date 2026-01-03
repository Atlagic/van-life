import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Vans from "./pages/Vans.jsx";
import VanDetail from "./pages/VanDetail.jsx";
import Header from "./components/Header.jsx";
import "../server.js";

function App() {

    return (
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/vans" element={<Vans />} />
              <Route path="/vans/:id" element={<VanDetail />} />
          </Routes>
      </BrowserRouter>
    )
}

export default App
