import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'


import {ThemeProvider, createTheme, Theme} from '@mui/material/'
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter} from "react-router-dom";
import App from "./App.tsx";


const theme: Theme = createTheme({
    palette: {
        mode: "dark"
    },
})


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
)
