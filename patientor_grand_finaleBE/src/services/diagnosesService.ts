import diagnoses from '../../data/diagnosesEntries';
import { Diagnosis } from '../types';
// import { NonSensitiveDiaryEntry, DiaryEntry } from '../types';

const getDiagnosesEntries = (): Diagnosis[] => {
  return diagnoses;
};

const getDiagnoseEntry = (codeKey: string): Diagnosis | undefined => {
  return diagnoses.find((diagnose) => diagnose.code===codeKey)
};


// const getNonSensitiveEntries = (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
//     return diaries;
//   }
// const getNonSensitiveEntries = (): Omit<DiaryEntry, 'comment'>[] => {
//     return diaries;
// }
// const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {  
//     return diaries;
// };

// const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
//     return diaries.map(({ id, date, weather, visibility }) => ({
//       id,
//       date,
//       weather,
//       visibility,
//     }));
//   };

// const addDiary = () => {
//   return null;
// };

export default {
  getDiagnosesEntries,
  getDiagnoseEntry
//   addDiary,
//   getNonSensitiveEntries
};