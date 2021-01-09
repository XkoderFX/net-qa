import {
  AppBar,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Input,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Toolbar,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetCurrentPost } from '../redux/posts/postActions';
import ModalPop from './ModalPop';

const Navbar: React.FC<{ options: string[] }> = ({ options }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      console.log(localStorage.getItem('user'));
    }
  }, []);

  const handleSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    setCategories(e.target.value as string[]);
  };

  const handleAdd = () => {
    dispatch(resetCurrentPost());
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const type: string = (target.closest('[data-type]') as HTMLButtonElement)!
      .dataset.type!;
    setType(type);
    setOpen(true);
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenMenu(e.currentTarget);
  };

  const deleteUser = async () => {
    return await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT!}/users/delete`,
      {
        email: JSON.parse(localStorage.getItem('user')!).email,
      }
    );
  };

  const handleClose = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-label]')) {
      const elem = target.closest('[data-label]') as HTMLElement;
      if (elem.dataset.label === 'logout') {
        localStorage.removeItem('user');
        setOpenMenu(null);
      } else if (elem.dataset.label === 'delete') {
        if (window.confirm('Are you sure you want to delete')) {
          deleteUser().then(res => {
            localStorage.removeItem('user');
            console.log(res.data);
            setOpenMenu(null);
            alert(`Goodbye`);
          });
        } else {
          setOpenMenu(null);
        }
      }
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <AppBar color="inherit" position="static">
          <Toolbar>
            <Grid style={{ alignItems: 'center' }} spacing={4} container>
              <Grid item xs={1}>
                <Button
                  onClick={handleAdd}
                  fullWidth
                  variant="contained"
                  color="inherit"
                >
                  add
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Select
                  fullWidth
                  label="categories"
                  multiple
                  onChange={handleSelect}
                  value={categories}
                  input={<Input />}
                  renderValue={(selected: unknown) =>
                    (selected as string[]).join(', ')
                  }
                >
                  {options.map((value, index) => (
                    <MenuItem key={Date.now() + index} value={value}>
                      <Checkbox checked={categories.includes(value)} />
                      <ListItemText primary={value} />
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs>
                <Input fullWidth placeholder="Search…"></Input>
              </Grid>

              {localStorage.getItem('user') ? (
                <>
                  <Grid item xs={1}>
                    <Button onClick={handleMenuClick} aria-controls="menu">
                      <Box display="flex" justifyContent="flex-end">
                        <Avatar>
                          {JSON.parse(
                            localStorage.getItem('user')!
                          ).name[0].toUpperCase()}
                        </Avatar>
                      </Box>
                    </Button>

                    <Menu
                      onClose={handleClose}
                      anchorEl={openMenu}
                      open={Boolean(openMenu)}
                      keepMounted
                      id="menu"
                      style={{ transform: 'translateY(40px)' }}
                    >
                      <MenuItem data-label="logout" onClick={handleClose}>
                        Logout
                      </MenuItem>
                      <MenuItem data-label="delete" onClick={handleClose}>
                        Delete User
                      </MenuItem>
                    </Menu>
                  </Grid>
                </>
              ) : (
                <Grid item xs={2}>
                  <Button
                    onClick={handleClick}
                    style={{ margin: '2px' }}
                    variant="contained"
                    data-type="signup"
                  >
                    Signup
                  </Button>
                  <Button
                    onClick={handleClick}
                    style={{ margin: '2px' }}
                    variant="contained"
                    data-type="login"
                  >
                    Login
                  </Button>
                </Grid>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </Container>
      <ModalPop open={open} type={type} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
