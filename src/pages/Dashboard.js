import Button from '@mui/material/Button';
import DemoPaper from '@mui/material/Paper'
import Event from '@mui/icons-material/Event';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

function Dashboard(){
    return(
        <>
        <a href="/eventos">
            <Button>
                <DemoPaper square={false}>
                    <Event/>
                    <p>Eventos</p>
                </DemoPaper>
            </Button>
        </a>

        <a href="/papers">
            <Button>
                <DemoPaper square={false}>
                    <FormatListNumberedIcon/>
                    <p>Papers</p>
                </DemoPaper>
            </Button>
        </a>

        
        </>
    )
}

export default Dashboard