import { NewPatientEntry, Sex } from "./types";
import { z } from 'zod';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };
  
  const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
  };
  
  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

  const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
    return ssn;
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
    return occupation;
  };

  const isGender = (param: string): param is Sex => {
    return Object.values(Sex).map(v => v.toString()).includes(param);
  };

  const parseGender = (gender: unknown): Sex => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

export const toNewPatientEntry = (object:unknown) => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
        const newEntry: NewPatientEntry = {
          name: parseName(object.name),
          dateOfBirth: parseDate(object.dateOfBirth), 
          ssn: parseSSN(object.ssn),
          gender: parseGender(object.gender),
          occupation: parseOccupation(object.occupation)
        };
        return newEntry;
    }
    
    throw new Error('Incorrect data: some fields are missing');
}

export const newPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Sex),
  occupation: z.string(),
  ssn: z.string()
});