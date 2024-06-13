import * as express from 'express';
import * as cors from 'cors';
import { Request, Response } from 'express';


const app = express();


app.use(cors());
app.use(express.json());


interface Notificacion {
  id: number;
  cuerpo: string;
}


const notificaciones: Notificacion[] = [
  {id: 1, cuerpo: "tienes una nueva notificacion"},
  {id: 2, cuerpo: "Migue comento tu notificacion"}
];


app.get('/notificaciones', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    notificaciones
  });
});


app.post('/notificaciones', (req: Request, res: Response) => {
  const idNotificacion = notificaciones.length > 0 ?
  notificaciones[notificaciones.length -1].id + 1 : 1;

  const notificacion: Notificacion = {
    id: idNotificacion,
    cuerpo: req.body.cuerpo
  };

  notificaciones.push(notificacion);

  res.json({
    success: true,
    notificacion
  });
});


app.get('/notificaciones-nuevas', (req: Request, res: Response) => {
  const idLastNoti = parseInt(req.query.idLastNoti as string, 10);
  const nuevasNotificaciones = notificaciones.filter(notificacion => {
    return notificacion.id > idLastNoti;
  });

  res.status(200).json({
    success: true,
    notificaciones: nuevasNotificaciones
  });
});


app.listen(3000, () => console.log('server started on port 3000'));
