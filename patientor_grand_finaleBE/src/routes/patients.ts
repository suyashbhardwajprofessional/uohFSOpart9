import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patientsService';
import { newPatientEntrySchema } from '../utils';
import { z } from 'zod';
import { NewPatientEntry, Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatientsEntries());
});

router.get('/:id', (req, res) => {
  const idkey = req.params.id;
  res.send(patientsService.getPatientEntry(idkey));
});

// router.post('/', (req, res) => {
//     try {
//     const newPatientEntry = newPatientEntrySchema.parse(req.body);;
//     const addedEntry = patientsService.addPatientEntry(newPatientEntry)
//     res.json(addedEntry)
//     }catch (error: unknown) {
//       if (error instanceof z.ZodError) {
//         res.status(400).send({ error: error.issues });
//       } else {
//         res.status(400).send({ error: 'unknown error' });
//       }
//     }
// });

// OR

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    newPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = patientsService.addPatientEntry(req.body)
    res.json(addedEntry)
});

router.use(errorMiddleware);

export default router;