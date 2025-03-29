// export type Sex = 'male' | 'female' | 'transexual' | 'other';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

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
export type NonSensitivePatientEntry = Omit<Patient, "ssn"|"entries">;