import Post, { Article } from "../Post";
import { postTypes } from "./postTypes";
import { uuid } from "uuidv4";
import { PostState } from "./postReducer";
import { Dispatch } from "redux";

export interface PostFetchAction {
    type: postTypes;
    payload?: Post[];
}

export interface PostChangeAction {
    type: postTypes;
    payload?: Article;
}

const data: Post[] = [
    {
        id: uuid(),
        category: "web",
        posts: [
            {
                id: uuid(),
                name: "html",
                body: `<h1>react + ts</h1><p>paragraph</p>`,
                category: "web",
            },
            { id: uuid(), name: "css", body: "CSS", category: "web" },
            {
                id: uuid(),
                name: "javascript",
                body: "JavaScript",
                category: "web",
            },
        ],
    },
    {
        id: uuid(),
        category: "math",
        posts: [
            {
                id: uuid(),
                name: "calculus",
                body: "CALCULUS",
                category: "math",
            },
            {
                id: uuid(),
                name: "equations",
                body: "EQUATIONS",
                category: "math",
            },
            {
                id: uuid(),
                name: "geometry",
                body: "GEOMETRY",
                category: "math",
            },
        ],
    },

    {
        id: uuid(),
        category: "english",
        posts: [
            {
                id: uuid(),
                name: "vocabulary",
                body: "VOCABULARY",
                category: "english",
            },
            {
                id: uuid(),
                name: "grammar",
                body: "GRAMMAR",
                category: "english",
            },
            {
                id: uuid(),
                name: "practice",
                body: "PRACTICE",
                category: "english",
            },
        ],
    },
];

export const fetchPosts = () => (dispatch: Dispatch<PostFetchAction>) => {
    dispatch(fetchPostsRequest());
    //TODO fetching logic should be here
    dispatch(fetchPostsSuccess(data));
};

export const fetchPostsRequest = () => ({
    type: postTypes.FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts: Post[]) => ({
    type: postTypes.FETCH_POSTS_SUCCESS,
    payload: posts,
});

export const fetchPostsFailure = (error: string) => ({
    type: postTypes.FETCH_POSTS_FAILURE,
    payload: error,
});

export const changeCurrentPost = (categoryId: string, postId: string) => (
    dispatch: Dispatch<PostChangeAction>,
    getState: () => { postsReducer: PostState }
) => {
    const {
        postsReducer: { posts },
    } = getState();

    const subject = posts.find((post) => post.id === categoryId);
    const post = subject?.posts.find((post) => post.id === postId);
    console.log(post);

    dispatch({ type: postTypes.CHANGE_CURRENT_POST, payload: post });
};
