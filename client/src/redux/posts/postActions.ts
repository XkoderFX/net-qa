import Post, { Article } from "../Post";
import { postTypes } from "./postTypes";
import { uuid } from "uuidv4";
import { PostState } from "./postReducer";
import { Dispatch } from "redux";
import axios from "axios";

export interface PostFetchAction {
    type: postTypes;
    payload?: Post[];
}

export interface PostChangeAction {
    type: postTypes;
    payload?: Article;
}

export interface PostCreateAction {
    type: postTypes;
    payload?: Post;
}

export const fetchPosts = () => async (dispatch: Dispatch<PostFetchAction>) => {
    dispatch(fetchPostsRequest());
    const { data } = await axios.get("http://localhost:3000/api/categories");
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

    const subject = posts.find((post) => post._id === categoryId);
    const post = subject?.articles.find((articles) => articles._id === postId);
    console.log(post);

    dispatch({ type: postTypes.CHANGE_CURRENT_POST, payload: post });
};

export const createArticle = ({
    name,
    body,
    category,
}: Omit<Article, "_id">) => async (dispatch: Dispatch<PostCreateAction>) => {

    const article: Omit<Article, "_id"> = { name, body, category };

    try {
        const { data } = await axios.post(
            `http://localhost:3000/api/categories/${category}`,
            article
        );
        dispatch({ type: postTypes.CREATE_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: postTypes.CREATE_POST_FAILURE, payload: error });
    }
};

export const resetCurrentPost = () => ({
    type: postTypes.RESET_CURRENT_POST,
});
