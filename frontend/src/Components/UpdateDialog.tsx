import {FormEvent, useEffect, useState} from "react";
import {ToDoItem} from "./ToDoCard.tsx";
import axios from "axios";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";


type UpdateDialogProps = {
    callback: () => void
}

export default function UpdateDialog(props: UpdateDialogProps) {

    const [item, setItem] = useState<ToDoItem>({
        id: "",
        description: "",
        status: "OPEN"
    })
    const params = useParams()
    const navigate = useNavigate()

    async function getData() {
        await axios.get<ToDoItem>("api/todo/" + params.id)
            .then(response => setItem(response.data))
            .catch(err => console.log(err))
    }


    useEffect(() => {
        getData()
    }, []);


    const handleClose = () => {
        navigate("/")
        props.callback()
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.put("api/todo/" + item.id + "/update", item);
        } catch (err) {
            console.error(err);
        } finally {
            handleClose();
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        setItem(
            {
                ...item,
                status: event.target.value as "OPEN" | "IN_PROGRESS" | "DONE"
            }
        )
    };

    const handleTextChange = (event) => {
        setItem(
            {
                ...item,
                description: event.target.value
            }
        )
    };


    return (
        <Dialog
            open={true}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Add a new ToDO</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Update the ToDO item by changing it's description or status and pressing Update.
                    Press Cancel to revert all changes.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    multiline={true}
                    minRows={3}
                    maxRows={6}
                    defaultValue={item.description}
                    onChange={handleTextChange}
                />
                <Select
                    sx={{
                        mt: 2,
                        pt: 2,
                        height: '20x',
                        '.MuiSelect-select': {
                            py: '4px',
                            my: '1px'
                        }
                    }}
                    labelId="status"
                    id="status"
                    value={item.status}
                    label="Age"
                    onChange={handleChange}
                    variant='filled'
                    defaultValue={item.status}
                >
                    <MenuItem value={"OPEN"}>Open</MenuItem>
                    <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                    <MenuItem value={"DONE"}>Done</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Update ToDo</Button>
            </DialogActions>
        </Dialog>
    )
}