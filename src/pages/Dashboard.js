import { BrowserRouter as Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DemoPaper from '@mui/material/Paper'

function Dashboard(){
    return(
        <>
        <a href="/eventos">
            <Button>
                <DemoPaper square={false}>
                    <p>Clica aí</p>
                </DemoPaper>
            </Button>
        </a>

        
        </>
    )
}

export default Dashboard