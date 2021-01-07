import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Modal,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  makeStyles,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: '5px',
    height: '300px',
    fontFamily: 'Roboto',
  },
  mrTop: {
    marginTop: '5px',
  },
}));

interface State {
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
  showPassword: boolean;
  showPasswordConfirm: boolean;
}

const ModalPop: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}> = ({ open, setOpen, type }) => {
  const classes = useStyles();

  const [values, setValues] = useState<State>({
    name: '',
    password: '',
    email: '',
    passwordConfirm: '',
    showPassword: false,
    showPasswordConfirm: false,
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowPasswordConfirm = () => {
    setValues({ ...values, showPasswordConfirm: !values.showPasswordConfirm });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const signup = async () => {
    return await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT!}/users/signup`,
      {
        name: values.name,
        email: values.email,
        password: values.password,
      }
    );
  };

  const login = async () => {
    return await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT!}/users/login`,
      {
        email: values.email,
        password: values.password,
      }
    );
  };

  const saveToLocalStorage = (user: { name: string; email: string }) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const hanldeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'login') {
      try {
        login()
          .then(res => {
            saveToLocalStorage({
              name: res.data.user.name,
              email: values.email,
            });
            // console.log(res);
            values.email = '';
            values.password = '';
            alert(
              `Thank you for coming back to our website ${res.data.user.name} `
            );
            setOpen(false);
          })
          .catch(err => {
            alert(err.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      if (values.password !== values.passwordConfirm) {
        alert('Passwords are not the same');
      } else {
        try {
          signup()
            .then(res => {
              // console.log(res);
              saveToLocalStorage({ name: values.name, email: values.email });
              values.email = '';
              values.name = '';
              values.password = '';
              values.passwordConfirm = '';
              values.showPasswordConfirm = false;
              alert(`Hello ${res.data.user.name} `);
              setOpen(false);
            })
            .catch(err => {
              alert(err.response.data.message);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <Modal className={classes.modal} open={open} onClose={() => setOpen(false)}>
      <>
        <Container className={classes.container} maxWidth="sm">
          <br />
          <h1>{process.env.API}</h1>

          <Typography variant="h6">{type.toUpperCase()}</Typography>
          <form onSubmit={hanldeSubmit}>
            {type === 'signup' ? (
              <>
                {' '}
                <TextField
                  fullWidth
                  placeholder="Full Name"
                  label="Full Name"
                  required
                  value={values.name}
                  error={!values.name}
                  onChange={handleChange('name')}
                />
                <TextField
                  type="email"
                  fullWidth
                  placeholder="email"
                  label="email"
                  required
                  value={values.email}
                  error={!values.email || !values.email.includes('@')}
                  helperText={!values.email ? 'email is required' : ''}
                  onChange={handleChange('email')}
                />
                <FormControl className={classes.mrTop}>
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    required
                    error={!values.password}
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label="toggle password visibility"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl
                  className={classes.mrTop}
                  style={{ marginLeft: '35px' }}
                >
                  <InputLabel htmlFor="standard-adornment-passwordConfirm">
                    Password Confirm
                  </InputLabel>
                  <Input
                    required
                    error={!values.passwordConfirm}
                    id="standard-adornment-passwordConfirm"
                    type={values.showPasswordConfirm ? 'text' : 'password'}
                    value={values.passwordConfirm}
                    onChange={handleChange('passwordConfirm')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPasswordConfirm}
                          onMouseDown={handleMouseDownPassword}
                          aria-label="toggle password visibility"
                        >
                          {values.showPasswordConfirm ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>{' '}
              </>
            ) : (
              <>
                {' '}
                <TextField
                  type="email"
                  fullWidth
                  placeholder="email"
                  label="email"
                  required
                  value={values.email}
                  error={!values.email || !values.email.includes('@')}
                  helperText={!values.email ? 'email is required' : ''}
                  onChange={handleChange('email')}
                />
                <FormControl className={classes.mrTop}>
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    required
                    error={!values.password}
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label="toggle password visibility"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>{' '}
              </>
            )}

            <Box style={{ marginTop: '6px' }}>
              <Button type="submit" variant="outlined">
                Submit
              </Button>
            </Box>
          </form>
        </Container>
      </>
    </Modal>
  );
};

export default ModalPop;
