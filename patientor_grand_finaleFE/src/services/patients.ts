import axios from "axios";
import { Patient, PatientFormValues, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id) => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const createEntry = async (patientId: string, object: EntryWithoutId) => {
  const { data } = await axios.post<EntryWithoutId>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );
  return data;
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export default {
  getAll, create, getById, createEntry
};

