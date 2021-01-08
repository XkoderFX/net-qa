import Post, { Article } from "../Post";
import {
    PostChangeAction,
    PostCreateAction,
    PostFetchAction,
    UpdateSearch,
} from "./postActions";
import { postTypes } from "./postTypes";

export const initialState: PostState = {
    loading: false,
    posts: [],
    currentPost: null,
    error: null,
    searchKey: "",
};

export interface PostState {
    loading: boolean;
    posts: Post[];
    error: Error | null;
    currentPost: Article | null;
    searchKey: string;
}

type Action =
    | PostFetchAction
    | PostChangeAction
    | PostCreateAction
    | UpdateSearch;

const postReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case postTypes.UPDATE_SEARCH:
            return { ...state, searchKey: action.payload };
        case postTypes.RESET_CURRENT_POST:
            return { ...state, currentPost: null };
        case postTypes.CREATE_POST_SUCCESS:
            const newPost: Post = (action as PostCreateAction).payload!;
            const posts = [...state.posts].map((post) =>
                post.category === newPost.category ? newPost : post
            );
            return { ...state, posts: [...posts] };
        case postTypes.CHANGE_CURRENT_POST:
            return { ...state, currentPost: action.payload };
        case postTypes.FETCH_POSTS_REQUEST:
            return { loading: true };
        case postTypes.FETCH_POSTS_SUCCESS:
            return { loading: false, posts: action.payload };
        case postTypes.FETCH_POSTS_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return { ...state };
    }
};

export default postReducer;
