import patients from '../../data/patientsEntries';
import { NewPatientEntry, NonSensitivePatientEntry, Patient, EntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid'

const getPatientsEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
    id, 
    name, 
    dateOfBirth,
    ssn,
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

const addEntry = (idkey: string, entry: EntryWithoutId): Entry | undefined => {
  const newEntry = {
    id: uuid(),
    ...entry
  }
  
  patients.find(patient=>patient.id===idkey)?.entries.push(newEntry)
  return newEntry;
}

export default {
  getPatientsEntries,
  getPatientEntry,
  addPatientEntry,
  addEntry
};