import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import React from "react";
import parse from "html-react-parser";
import { Article } from "../redux/Post";

interface PostViewProps {
    category: string;
    article: Article;
}

const PostView: React.FC<PostViewProps> = ({ category, article }) => {
    const htmlInput = article.body;
    console.log(htmlInput);

    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link>{category}</Link>
                <Link color="inherit">{article.name}</Link>
            </Breadcrumbs>
            {parse(htmlInput)}
        </div>
    );
};

export default PostView;
