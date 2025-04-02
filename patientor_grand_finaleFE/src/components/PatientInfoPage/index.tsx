import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import FemaleIcon from "@mui/icons-material/Female"
import MaleIcon from "@mui/icons-material/Male"
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnosis";

const DescriptiveCode = ({code}) => {
	const [descDiagnose, setDescDiagnose] = useState('')
	useEffect(()=>{
		const fetchDiagnose = async () => {
	      const diagnose = await diagnoseService.getDiagnoseByCode(code)
	      if(diagnose) setDescDiagnose(`${diagnose.code}: ${diagnose.name}`)
	    };
		void fetchDiagnose();
	},[])

	return (<li>{descDiagnose}</li>)
}

const index = ({ patients }) => {
	const [thePatient, setThePatient] = useState<Patient>({});
	const patientId = useParams().id
	// const thePatient = patients.find(p=>p.id===patientId)
	// const patients = await patientService.getById(patientId);

	Array.isArray(thePatient.entries) && console.log(thePatient.entries.map(entry=>entry.date))
	useEffect(() => {
	    const fetchPatient = async () => {
	      const patient = await patientService.getById(patientId);
	      setThePatient(patient);
	    };
	    void fetchPatient();
	  }, []);

	return (
		<div>
			<div style={{display: 'flex'}}>
				<h2>{thePatient.name}</h2>
				{thePatient.gender==='male' ? <MaleIcon /> : <FemaleIcon />}
			</div>
			<p>ssn: {thePatient.ssn}</p>
			<p>occupation: {thePatient.occupation}</p>

			<h3>entries</h3>
			{Array.isArray(thePatient.entries) && thePatient.entries.map(entry => 
				<div>
					<p>{entry.date} <i>{entry.description}</i></p>
					<ul>{Array.isArray(entry.diagnosisCodes) && entry.diagnosisCodes.map(onecode=><DescriptiveCode code={onecode}/>)} </ul>
				</div>
				)}
		</div>
	)
}

export default index