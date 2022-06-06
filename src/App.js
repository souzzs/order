import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Playlist from "./Pages/Playlist";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/playlist/:id" element={<Playlist />} />
      </Routes>
    </>
  );
}

export default App;
