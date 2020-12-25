import { Box, Container, Grid } from "@material-ui/core";
import React from "react";
import PostEdit from "../components/PostEdit";
import PostList from "../components/PostList";
import PostView from "../components/PostView";

const Main = () => {
    const [mode, setMode] = React.useState<"editing" | "creating">();
    const [postData, setPostData] = React.useState([
        {
            category: "web",
            posts: [{ name: "html" }, { name: "css" }, { name: "javascript" }],
        },
        {
            category: "math",
            posts: [
                { name: "calculus" },
                { name: "equations" },
                { name: "geometry" },
            ],
        },

        {
            category: "english",
            posts: [
                { name: "vocabulary" },
                { name: "grammar" },
                { name: "practice" },
            ],
        },
    ]);

    return (
        <Container maxWidth="xl">
            <Grid spacing={2} container>
                <Grid item xs={4}>
                    <Box my={3}>
                        <PostList items={postData}></PostList>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box my={3}>
                        <PostEdit></PostEdit>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Main;
