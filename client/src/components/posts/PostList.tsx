// import classes from '*.module.css';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip,
    Collapse,
    List,
    ListItem,
    ListItemIcon,
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
import { includesIn } from "../../util/stringCompare";

interface PostListProps {
    searchKey: string;
    items: Post[];
}

const PostList: React.FC<PostListProps> = ({ items, searchKey = "" }) => {
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
                {items
                    ?.map((item) => {
                        const items = item.articles.filter((post) => {
                            return (
                                includesIn(post.name, searchKey) ||
                                includesIn(post.body, searchKey)
                            );
                        });

                        if (items.length > 0) {
                            return { ...item, articles: items };
                        }
                    })
                    .filter(Boolean) // clear all not defined items
                    .map((filtered, i) => {
                        const item = filtered!; // mark the item as absolutely not nullable
                        return (
                            <Box key={item._id}>
                                <ListItem
                                    button
                                    onClick={() => handleCollapse(item._id)}
                                    key={item._id}
                                >
                                    <ListItemText primary={item.category} />
                                    {searchKey && (
                                        <Chip
                                            size="small"
                                            label={item.articles.length}
                                            clickable
                                            color="primary"
                                        />
                                    )}

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
                                            if (
                                                includesIn(
                                                    post.name,
                                                    searchKey
                                                ) ||
                                                includesIn(post.body, searchKey)
                                            ) {
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
                    })}
            </List>
        </Paper>
    );
};

export default PostList;
