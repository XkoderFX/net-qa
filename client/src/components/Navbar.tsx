import {
    AppBar,
    Button,
    Checkbox,
    Container,
    Grid,
    Input,
    InputBase,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Toolbar,
} from "@material-ui/core";
import React from "react";

const Navbar: React.FC<{ options: string[] }> = ({ options }) => {
    const [categories, setCategories] = React.useState<string[]>([]);

    const handleSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
        setCategories(e.target.value as string[]);
    };

    return (
        <Container maxWidth="xl">
            <AppBar color="inherit" position="static">
                <Toolbar>
                    <Grid spacing={3} container>
                        <Grid item xs={1}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="inherit"
                            >
                                add
                            </Button>
                        </Grid>

                        <Grid item xs={7}>
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
                                            checked={categories.includes(value)}
                                        />
                                        <ListItemText primary={value} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={4}>
                            <Input fullWidth placeholder="Search…"></Input>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Container>
    );
};

export default Navbar;
