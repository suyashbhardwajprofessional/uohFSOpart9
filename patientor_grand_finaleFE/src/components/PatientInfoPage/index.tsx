import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import FemaleIcon from "@mui/icons-material/Female"
import MaleIcon from "@mui/icons-material/Male"
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnosis";
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';

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

const HospitalEntry = ({entry}) => {
	return(<div><LocalHospitalIcon/></div>)
}

const OccupationalHealthcareEntry = ({entry}) => {
	return(<div><WorkIcon/><i>{entry.employerName}</i></div>)
}

const HealthCheckEntry = ({entry}) => {
	return(<div><HealthAndSafetyIcon/></div>)
}

const EntryDetails = ({entry}) => {
	let specificComponentToLoad;
	switch(entry.type) {
		case 'Hospital': specificComponentToLoad= <HospitalEntry entry={entry} />; break;
		case 'OccupationalHealthcare': specificComponentToLoad= <OccupationalHealthcareEntry entry={entry} />; break;
		case 'HealthCheck': specificComponentToLoad= <HealthCheckEntry entry={entry} />; break;
		default: specificComponentToLoad= <p>No Type</p>
	}

	return(
		<div style = {{border:'1px solid grey', borderRadius: '20px', paddingInline:'1em', marginBlock: '1em', paddingBlock:'0.5em'}}>
			<p style = {{display:'flex', alignItems: 'center'}}>{entry.date} {specificComponentToLoad}</p>
			<i>{entry.description}</i>
			<p>{ entry.type==='HealthCheck' ? (entry.healthCheckRating < 1 ? <FavoriteIcon color='success'/> :  (entry.healthCheckRating <2 ? <FavoriteIcon color='warning'/> : <FavoriteIcon color='danger'/>)): <div></div> }</p>
			<p>diagnosed by {entry.specialist}</p>
			{/*<ul>{Array.isArray(entry.diagnosisCodes) && entry.diagnosisCodes.map(onecode=><DescriptiveCode code={onecode}/>)} </ul>*/}
		</div>
	)
}

const index = ({ patients }) => {
	const [thePatient, setThePatient] = useState<Patient>({});
	const patientId = useParams().id
	// const thePatient = patients.find(p=>p.id===patientId)
	// const patients = await patientService.getById(patientId);

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
			{ Array.isArray(thePatient.entries) && thePatient.entries.map((entry, index) =>  <div key={index}><EntryDetails entry={entry}/></div> )}
			<Button variant="contained" color="primary"> add new entry </Button>
		</div>
	)
}

export default index