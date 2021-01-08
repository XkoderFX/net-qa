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
    MenuItem,
    Select,
    Toolbar,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetCurrentPost, updateSearch } from "../redux/posts/postActions";
import ModalPop from "./ModalPop";

const Navbar: React.FC<{ options: string[] }> = ({ options }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("user")) {
            console.log(localStorage.getItem("user"));
        }
    }, []);

    const handleSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
        setCategories(e.target.value as string[]);
    };

    const handleAdd = () => {
        dispatch(resetCurrentPost());
    };

    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const target = e.target as HTMLElement;
        const type: string = (target.closest(
            "[data-type]"
        ) as HTMLButtonElement)!.dataset.type!;
        setType(type);
        setOpen(true);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSearch(e.target.value));
    };

    return (
        <>
            <Container maxWidth="xl">
                <AppBar color="inherit" position="static">
                    <Toolbar>
                        <Grid
                            style={{ alignItems: "center" }}
                            spacing={4}
                            container
                        >
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
                                        (selected as string[]).join(", ")
                                    }
                                >
                                    {options.map((value, index) => (
                                        <MenuItem
                                            key={Date.now() + index}
                                            value={value}
                                        >
                                            <Checkbox
                                                checked={categories.includes(
                                                    value
                                                )}
                                            />
                                            <ListItemText primary={value} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>

                            <Grid item xs>
                                <Input
                                    fullWidth
                                    onChange={handleSearch}
                                    placeholder="Search…"
                                ></Input>
                            </Grid>

                            {localStorage.getItem("user") ? (
                                <Grid item xs={1}>
                                    <Box
                                        display="flex"
                                        justifyContent="flex-end"
                                    >
                                        <Avatar>
                                            {JSON.parse(
                                                localStorage.getItem("user")!
                                            ).name[0].toUpperCase()}
                                        </Avatar>
                                    </Box>
                                </Grid>
                            ) : (
                                <Grid item xs={2}>
                                    <Button
                                        onClick={handleClick}
                                        style={{ margin: "2px" }}
                                        variant="contained"
                                        data-type="signup"
                                    >
                                        Signup
                                    </Button>
                                    <Button
                                        onClick={handleClick}
                                        style={{ margin: "2px" }}
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
