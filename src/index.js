import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Batches from "./components/batches";
import Windrows from "./components/windrows";
import Footer from "./components/footer";
import Feedstock from "./components/feedstock";
import WindrowDetails from "./components/windrowDetail";

ReactDOM.render(<BrowserRouter>
    <NavBar/>
    <Route exact path="/" component={Dashboard}/>
    <Route exact path="/windrowDetails/:id" component={WindrowDetails}/>
    <Route exact path="/batches" component={Batches}/>
    <Route exact path="/windrows" component={Windrows}/>
    <Route exact path="/feedstock" component={Feedstock}/>
    
    {/* <Footer/> */}
    </BrowserRouter>,document.getElementById("root"));