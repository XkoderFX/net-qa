import { Box, Button, makeStyles, Paper, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/darcula.css";
import "./styles/editor.css";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
    },
}));

const PostView = () => {
    const [value, setValue] = useState("");
    const [categories, setCategories] = useState([
        { title: "web" },
        { title: "math" },
        { title: "english" },
    ]);
    const classes = useStyles();

    useEffect(() => {
        console.log(value);
    }, [value]);

    return (
        <>
            <ReactQuill
                modules={{
                    syntax: true,
                    toolbar: [
                        ["bold", "italic", "underline", "strike"], // toggled buttons
                        ["blockquote"],
                        ["image", "code-block"],

                        [{ header: 1 }, { header: 2 }], // custom button values
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ script: "sub" }, { script: "super" }], // superscript/subscript
                        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                        [{ direction: "rtl" }], // text direction

                        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],

                        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                        [{ font: ["roboto", "Times New Roman"] }],
                        [{ align: [] }],

                        ["clean"], // remove formatting button
                    ],
                }}
                theme="snow"
                value={value}
                onChange={setValue}
            />
            <Box my={2}>
                <Autocomplete
                    options={categories}
                    getOptionLabel={(option: { title: string }) => option.title}
                    style={{ width: 300 }}
                    renderInput={(params: any) => (
                        <TextField
                            {...params}
                            label="Category"
                            variant="filled"
                        />
                    )}
                />
            </Box>

            <Box display="flex" my={2}>
                <Button
                    variant="contained"
                    className={classes.button}
                    color="primary"
                >
                    save
                </Button>
                <Button variant="contained" color="primary">
                    cancel
                </Button>
            </Box>
        </>
    );
};

export default PostView;
