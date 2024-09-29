import {Box, Stack, Typography} from "@mui/material";
import ToDoCard, {ToDoItem} from "./ToDoCard.tsx";


type ToDoColumnProps = {
    title: string,
    data: ToDoItem[]
    status: "OPEN" | "IN_PROGRESS" | "DONE",
    update: () => void
}

export default function ToDoColumn(props: ToDoColumnProps) {


    return (
        <>
            <Box sx={{
                flexBasis: "33%",
                flexGrow: 1,
                maxWidth: "33%",
            }}>
                <Typography variant="h3"> {props.title}</Typography>
                <Box>
                    <Stack>
                        {props.data
                            .filter(item => item.status === props.status)
                            .map(item => <ToDoCard content={item} key={item.id} update={props.update}/>)}
                    </Stack>
                </Box>
            </Box>
        </>
    )
}