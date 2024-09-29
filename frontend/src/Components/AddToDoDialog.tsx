import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {FormEvent, useState} from "react";
import {ToDoItem} from "./ToDoCard.tsx";
import axios from "axios";


type AddToDoDialogProps = {
    open: boolean,
    setOpen: (value: boolean) => void
    fetchData: () => void
}

export default function AddToDoDialog(props: AddToDoDialogProps) {

    const [status, setStatus] = useState<"OPEN" | "IN_PROGRESS" | "DONE">("OPEN");


    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const newToDo: ToDoItem = {
            id: "1", // backend changes this anyway
            description: formJson.description.toString(),
            status: status,
        };
        try {
            await axios.post("api/todo", newToDo);
            props.fetchData();
        } catch (err) {
            console.error(err);
        } finally {
            handleClose();
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as "OPEN" | "IN_PROGRESS" | "DONE");
    };


    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Add a new ToDo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To add a new ToDo please enter it's description and starting status
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
                    variant="filled"
                    multiline={true}
                    minRows={3}
                    maxRows={6}
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
                    value={status}
                    label="Age"
                    onChange={handleChange}
                    variant='filled'
                    defaultValue={"OPEN"}
                >
                    <MenuItem value={"OPEN"}>Open</MenuItem>
                    <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                    <MenuItem value={"DONE"}>Done</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add ToDo</Button>
            </DialogActions>
        </Dialog>
    )
}