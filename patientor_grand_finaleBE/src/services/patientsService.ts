import patients from '../../data/patientsEntries';
import { NewPatientEntry, NonSensitivePatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid'

const getPatientsEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation,
    entries
  }));
};

const getPatientEntry = (idkey: string): NonSensitivePatientEntry | undefined => {
  return patients.find((patient) => patient.id===idkey)
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
  getPatientEntry,
  addPatientEntry
};