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
} from '@material-ui/core';
import { ExpandLess } from '@material-ui/icons';
import ExpandMore from '@material-ui/icons/ExpandMore';

import React from 'react';
import { useDispatch } from 'react-redux';
import Post from '../../redux/Post';
import { changeCurrentPost } from '../../redux/posts/postActions';

interface PostListProps {
  items: Post[];
}

const PostList: React.FC<PostListProps> = ({ items }) => {
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = React.useState<{
    [index: string]: boolean;
  }>({});
  const handleCollapse = (index: string) => {
    setCollapsed(collapsed => ({
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
        {items.map((item, i) => (
          <Box key={item.id}>
            <ListItem
              button
              onClick={() => handleCollapse(item.id)}
              key={item.id}
            >
              <ListItemText primary={item.category} />
              {collapsed[item.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse
              key={item.id + i}
              in={collapsed[item.id]}
              timeout="auto"
              unmountOnExit
            >
              <List disablePadding key={Date.now() + i}>
                {item.posts.map(post => (
                  <ListItem
                    onClick={() => handleListClick(item.id, post.id)}
                    key={post.id}
                    button
                  >
                    <ListItemText primary={post.name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default PostList;
