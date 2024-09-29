import axios from "axios"
import {Box, Container, Fab, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ToDoColumn from "./Components/ToDoColumn.tsx";
import {useEffect, useState} from "react";
import {ToDoItem} from "./Components/ToDoCard.tsx";
import AddToDoDialog from "./Components/AddToDoDialog.tsx";
import {Route, Routes} from "react-router-dom";
import UpdateDialog from "./Components/UpdateDialog.tsx";


function App() {


    const [toDos, setToDos] = useState<ToDoItem[]>([])
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    const handleClickAdd = () => {
        setAddDialogOpen(true);
    };

    function fetchData() {
        axios.get<ToDoItem[]>("api/todo")
            .then(response => {
                setToDos(response.data)
            })
            .catch(err => console.error(err))
    }


    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Container>
                <Typography
                    variant="h1"
                    sx={{textAlign: "center", my: 4, color: "primary.main"}}
                >
                    ToDo Application
                </Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 4,
                    mx: 2
                }}>
                    <ToDoColumn title={"Open"} data={toDos} status={"OPEN"} update={fetchData}/>
                    <ToDoColumn title={"In Progress"} data={toDos} status={"IN_PROGRESS"} update={fetchData}/>
                    <ToDoColumn title={"Done"} data={toDos} status={"DONE"} update={fetchData}/>
                </Box>
            </Container>
            <Routes>
                <Route path="/:id" element={<UpdateDialog callback={fetchData}/>}/>
            </Routes>
            <AddToDoDialog open={addDialogOpen} setOpen={setAddDialogOpen} fetchData={fetchData}/>
            <Fab sx={{
                position: "fixed",
                bottom: 50,
                right: 50
            }} onClick={handleClickAdd}> <AddIcon/></Fab>

        </>
    )
}

export default App