import { Box, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import PostEdit from "../components/PostEdit";
import PostList from "../components/PostList";
import PostView from "../components/PostView";
import Post from "../redux/Post";
import { createArticle, fetchPosts } from "../redux/posts/postActions";
import { PostState } from "../redux/posts/postReducer";
import { useSelector, useDispatch } from "react-redux";

const Main = () => {
    const dispatch = useDispatch();
    const postData = useSelector(
        (state: { postsReducer: PostState }) => state.postsReducer.posts
    );
    const currentPost = useSelector(
        (state: { postsReducer: PostState }) => state.postsReducer.currentPost
    );

    const handlePostSave = (
        category: string,
        name: string,
        content: string
    ) => {
        dispatch(createArticle({ name, body: content, category }));
    };

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    console.log(postData);

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
                        {currentPost ? (
                            <PostView
                                category={currentPost.category}
                                article={currentPost}
                            ></PostView>
                        ) : (
                            <>
                                <Typography paragraph variant="h4">
                                    Create a post
                                </Typography>
                                <PostEdit
                                    onSave={(category, name, content) => {
                                        console.log(
                                            `${category} ${name} ${content}`
                                        );
                                        handlePostSave(category, name, content);
                                    }}
                                ></PostEdit>
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Main;
