export default interface Post {
    _id: string;
    category: string;
    articles: Article[];
}

export interface Article {
    _id: string;
    name: string;
    body: string;
    category: string;
}
