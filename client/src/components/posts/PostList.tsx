// import classes from '*.module.css';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Collapse,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from "@material-ui/core";
import { ExpandLess } from "@material-ui/icons";
import ExpandMore from "@material-ui/icons/ExpandMore";

import React from "react";
import { useDispatch } from "react-redux";
import Post from "../../redux/Post";
import { changeCurrentPost } from "../../redux/posts/postActions";

interface PostListProps {
    searchKey: string;
    items: Post[];
}

const PostList: React.FC<PostListProps> = ({ items, searchKey }) => {
    const dispatch = useDispatch();

    const [collapsed, setCollapsed] = React.useState<{
        [index: string]: boolean;
    }>({});
    const handleCollapse = (index: string) => {
        setCollapsed((collapsed) => ({
            ...collapsed,
            [index]: !collapsed[index],
        }));
    };

    const handleListClick = (categoryId: string, postId: string) => {
        dispatch(changeCurrentPost(categoryId, postId));
    };

    return (
        <Paper>
            <List component="nav">
                {items?.map((item, i) => {
                    if (item.category.includes(searchKey)) {
                        return (
                            <Box key={item._id}>
                                <ListItem
                                    button
                                    onClick={() => handleCollapse(item._id)}
                                    key={item._id}
                                >
                                    <ListItemText primary={item.category} />
                                    {collapsed[item._id] ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </ListItem>

                                <Collapse
                                    key={item._id + i}
                                    in={collapsed[item._id]}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List disablePadding key={Date.now() + i}>
                                        {item.articles.map((post) => {
                                            if (post.name.includes(searchKey)) {
                                                return (
                                                    <ListItem
                                                        onClick={() =>
                                                            handleListClick(
                                                                item._id,
                                                                post._id
                                                            )
                                                        }
                                                        key={post._id}
                                                        button
                                                    >
                                                        <ListItemText
                                                            primary={post.name}
                                                        />
                                                    </ListItem>
                                                );
                                            }
                                        })}
                                    </List>
                                </Collapse>
                            </Box>
                        );
                    }
                })}
            </List>
        </Paper>
    );
};

export default PostList;
