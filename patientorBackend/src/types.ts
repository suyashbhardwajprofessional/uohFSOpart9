export type Sex = 'male' | 'female' | 'transexual' | 'other';

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
}

export type NonSensitivePatientEntry = Omit<Patient, "ssn">;