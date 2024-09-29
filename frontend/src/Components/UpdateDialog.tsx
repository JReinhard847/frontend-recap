import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {ToDoItem} from "./ToDoCard.tsx";
import axios from "axios";
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
import {useNavigate, useParams} from "react-router-dom";


type UpdateDialogProps = {
    callback: () => void
}

export default function UpdateDialog(props: UpdateDialogProps) {

    const [itemToUpdate, setItemToUpdate] = useState<ToDoItem>({
        id: "",
        description: "",
        status: "OPEN"
    })
    const params = useParams()
    const navigate = useNavigate()

    async function fetchItemInformation() {
        await axios.get<ToDoItem>("api/todo/" + params.id)
            .then(response => setItemToUpdate(response.data))
            .catch(err => console.log(err))
    }


    useEffect(() => {
        fetchItemInformation()
    }, []);


    const handleClose = () => {
        navigate("/")
        props.callback()
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.put("api/todo/" + itemToUpdate.id + "/update", itemToUpdate);
        } catch (err) {
            console.error(err);
        } finally {
            handleClose();
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        setItemToUpdate(
            {
                ...itemToUpdate,
                status: event.target.value as "OPEN" | "IN_PROGRESS" | "DONE"
            }
        )
    };

    const handleTextChange = (event:ChangeEvent<HTMLInputElement>) => {
        setItemToUpdate(
            {
                ...itemToUpdate,
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
                    variant="filled"
                    multiline={true}
                    minRows={3}
                    maxRows={6}
                    defaultValue={itemToUpdate.description}
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
                    value={itemToUpdate.status}
                    label="Age"
                    onChange={handleChange}
                    variant='filled'
                    defaultValue={itemToUpdate.status}
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