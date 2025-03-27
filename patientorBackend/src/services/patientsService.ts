import patients from '../../data/patientsEntries';
import { NewPatientEntry, NonSensitivePatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid'

const getPatientsEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }));
};

const addPatientEntry = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  }
  patients.push(newPatientEntry)
  return newPatientEntry
}

export default {
  getPatientsEntries,
  addPatientEntry
};