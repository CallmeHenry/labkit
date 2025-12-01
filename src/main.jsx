import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import App from './App.jsx'

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
            <App/>
        </BrowserRouter>
    </StrictMode>
)
