import { Container, Grid } from "@material-ui/core";
import React from "react";
import PostList from "../components/PostList";

const Main = () => {
    const [postData, setPostData] = React.useState([
        {
            category: "web",
            posts: [{ name: "html" }, { name: "css" }, { name: "javascript" }],
        },
        {
            category: "math",
            posts: [
                { name: "calculs" },
                { name: "equations" },
                { name: "geometry" },
            ],
        },
   
    ]);

    return (
        <Container maxWidth="xl">
            <Grid spacing={2} container>
                <Grid item xs={4}>
                    <PostList items={postData}></PostList>
                </Grid>
                <Grid item xs={8}>
                    Fe
                </Grid>
            </Grid>
        </Container>
    );
};

export default Main;
