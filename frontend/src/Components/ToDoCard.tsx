import axios from "axios";
import {Box, Fab, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';


export type ToDoItem = {
    id: string,
    description: string,
    status: "OPEN" | "IN_PROGRESS" | "DONE"
}

type ToDoCardProps = {
    content: ToDoItem,
    update: () => void
}

function ToDoCard(props: ToDoCardProps) {


    const navigate = useNavigate()


    async function deleteThisTodo() {
        await axios.delete("api/todo/" + props.content.id)
            .catch(err => console.log(err))
        props.update()
    }

    async function nextStatus() {
        const updatedToDo = {
            id: props.content.id,
            description: props.content.description,
            status: props.content.status === "OPEN" ? "IN_PROGRESS" : "DONE"
        }
        await axios.put("api/todo/" + props.content.id + "/update", updatedToDo)
            .catch(err => console.log(err))
        props.update()
    }

    async function prevStatus() {
        const updatedToDo = {
            id: props.content.id,
            description: props.content.description,
            status: props.content.status === "DONE" ? "IN_PROGRESS" : "OPEN"
        }
        await axios.put("api/todo/" + props.content.id + "/update", updatedToDo)
            .catch(err => console.log(err))
        props.update()
    }

    function edit() {
        navigate("/" + props.content.id)
    }

    const getBackgroundColor = (status: string) => {
        switch (status) {
            case "OPEN":
                return "#FBC02D";
            case "IN_PROGRESS":
                return "#2196F3";
            case "DONE":
                return "#4CAF50";
            default:
                return "inherit";
        }
    };

    return (
        <Paper elevation={3} sx={{borderRadius: 4, mt: 1}}>
            <Box
                sx={{
                    backgroundColor: getBackgroundColor(props.content.status),
                    p: 2,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                }}
            >
                <Typography align="center">Status: {props.content.status.replace("_", " ")}</Typography>
            </Box>
            <Box sx={{p: 2}}>
                <Typography variant="h6">{props.content.description}</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    p: 2,
                    mx: 5,
                    pt: 0
                }}
            >
                <Fab
                    size="small"
                    disabled={props.content.status === "OPEN"}
                    onClick={prevStatus}
                >
                    <NavigateBeforeRoundedIcon/>
                </Fab>
                <Fab onClick={edit} size="small" sx={{
                    backgroundColor: 'primary.main',
                    color: 'white'
                }}>
                    <EditIcon/>
                </Fab>
                <Fab size="small" onClick={deleteThisTodo} sx={
                    {
                        backgroundColor: 'error.main',
                        color: 'white'
                    }
                }>
                    <DeleteRoundedIcon/>
                </Fab>
                <Fab
                    size="small"
                    disabled={props.content.status === "DONE"}
                    onClick={nextStatus}
                >
                    <NavigateNextRoundedIcon/>
                </Fab>
            </Box>
        </Paper>
    )
}

export default ToDoCard