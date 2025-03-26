import patients from '../../data/patientsEntries';
import { NonSensitivePatientEntry } from '../types';

const getPatientsEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }));
};

export default {
  getPatientsEntries,
};