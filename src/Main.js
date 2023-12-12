import { Companies } from './components/Companies.js';
import { CompanyAdd } from './components/CompanyAdd.js';
import { CompanyEdit } from './components/CompanyEdit.js';
import { Home } from "./components/Home.js";
import { About } from "./components/About.js";

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
        <Routes>
          {/* This route is for about component 
          with exact path "/home", in component 
          props we passes the imported component*/}
          <Route
            path="/"
            element={<Home />}
          />

          {/* This route is for about component 
          with exact path "/companies", in component 
          props we passes the imported component*/}
          <Route
            path="/companies"
            element={<Companies />}
          />

          {/* This route is for about component 
          with exact path "/companies/new", in component 
          props we passes the imported component*/}
          <Route
            path="/companies/new"
            element={<CompanyAdd />}
          />

          {/* This route is for about component 
          with exact path "/companies/:id", in component 
          props we passes the imported component*/}
          <Route
            path="/companies/:id"
            element={<CompanyEdit />}
          />



          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route
            path="/about"
            element={<About />}
          />

          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          {/* <Redirect to="/" /> */}
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </Router>
    </>
  );
}
