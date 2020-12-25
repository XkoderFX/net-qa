import classes from "*.module.css";
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

interface PostListProps {
    items: TreeItem[];
}

interface TreeItem {
    category: string;
    posts: { name: string }[];
}

const PostList: React.FC<PostListProps> = ({ items }) => {
    const [collapsed, setCollapsed] = React.useState<{
        [index: number]: boolean;
    }>({});
    const handleCollapse = (index: number) => {
        setCollapsed((collapsed) => ({
            ...collapsed,
            [index]: !collapsed[index],
        }));
    };

    return (
        <Paper>
                <List component="nav">
                    {items.map((item, index) => (
                        <>
                            <ListItem
                                button
                                onClick={() => handleCollapse(index)}
                            >
                                <ListItemText primary={item.category} />
                                {collapsed[index] ? (
                                    <ExpandLess />
                                ) : (
                                    <ExpandMore />
                                )}
                            </ListItem>

                            <Collapse
                                in={collapsed[index]}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List disablePadding>
                                    {item.posts.map((subject) => (
                                        <ListItem button>
                                            <ListItemText
                                                primary={subject.name}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </>
                    ))}
                </List>
        </Paper>
    );
};

export default PostList;
