export default interface Post {
    id: string;
    category: string;
    posts: Article[];
}

export interface Article {
    id: string;
    name: string;
    body: string;
    category: string;
}
