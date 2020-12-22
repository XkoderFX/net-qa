import { Typography } from "@material-ui/core";
import React from "react";
import Navbar from "./components/Navbar";
import Main from "./layout/Main";

function App() {
    return (
        <div className="App">
            <Navbar options={["my", "nodeJS", "geometry"]}></Navbar>
            <Main></Main>
        </div>
    );
}

export default App;
