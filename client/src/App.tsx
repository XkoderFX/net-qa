import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Navbar from "./components/Navbar";
import Main from "./layout/Main";

const useStyles = makeStyles({
    app: {
        fontFamily: "Roboto",
    },
});

function App() {
    const classes = useStyles();

    return (
        <div className={classes.app}>
            <Navbar options={["my", "nodeJS", "geometry"]}></Navbar>
            <Main></Main>
        </div>
    );
}

export default App;
