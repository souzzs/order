import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Login from "./Pages/Login";
import RouteProtection from "./Pages/MyPlaylists/RouteProtection";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/my-playlists/*" element={<RouteProtection />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
