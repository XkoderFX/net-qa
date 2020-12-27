import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar";
import Main from "./layout/Main";
import store from "./redux/store";

const useStyles = makeStyles({
    app: {
        fontFamily: "Roboto",
    },
});

function App() {
    const classes = useStyles();

    return (
        <Provider store={store}>
            <div className={classes.app}>
                <Navbar options={["my", "nodeJS", "geometry"]}></Navbar>
                <Main></Main>
            </div>
        </Provider>
    );
}

export default App;
