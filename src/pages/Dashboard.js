import Button from "@mui/material/Button";
import DemoPaper from "@mui/material/Paper";
import Event from "@mui/icons-material/Event";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { toast } from "react-toastify";
import ErrorService from "../services/errorService";

function Dashboard() {
    
  const handleSomeAction = async () => {
    const error = {
      response: {
        status: 500,
        data: {
          message: "Erro interno do servidor",
        },
      },
    };
    ErrorService.handleError(error);
  };

  return (
    <>
      <a href="/eventos">
        <Button>
          <DemoPaper square={false}>
            <Event />
            <p>Eventos</p>
          </DemoPaper>
        </Button>
      </a>

      <a href="/metricas">
        <Button>
          <DemoPaper square={false}>
            <FormatListNumberedIcon />
            <p>Métricas</p>
          </DemoPaper>
        </Button>
      </a>

      <button onClick={handleSomeAction}>Clique para acionar erro</button>
    </>
  );
}

export default Dashboard;
