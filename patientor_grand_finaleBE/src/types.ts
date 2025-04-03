// export type Sex = 'male' | 'female' | 'transexual' | 'other';
export interface Discharge {
    date: string,
    criteria: string
}

export interface SickLeaveExp {
    startDate: string,
    endDate: string
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeaveExp;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum Sex {
    Male = 'male',
    Female = 'female',
    Transexual = 'transexual',
    Other = 'other',
  }

export interface Diagnosis {
    code: string
    name: string
    latin?: string
}

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Sex
    occupation: string
    entries: Entry[]
}

export type NewPatientEntry = Omit<Patient, "id">;
/*export type NonSensitivePatientEntry = Omit<Patient, "ssn"|"entries">;*/
export type NonSensitivePatientEntry = Omit<Patient, "entries">;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;