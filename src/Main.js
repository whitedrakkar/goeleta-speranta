import { Companies } from './components/Companies.js';
import { Home } from "./components/Home.js";
import { About } from "./components/About.js";
import { Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

export default function Main() {

  return (
    <>

      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>

        <nav>
          <Link to="/home">Home</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/about">About</Link>
        </nav>

        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/companies/*" element={<Companies />} />
          <Route path="/about" element={<About />} />
          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          {/* <Redirect to="/" /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>

    </>
  );
}
