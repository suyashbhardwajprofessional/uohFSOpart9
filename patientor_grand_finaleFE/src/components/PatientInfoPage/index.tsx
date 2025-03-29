import React from 'react'
import { useParams } from 'react-router-dom'
import FemaleIcon from "@mui/icons-material/Female"
import MaleIcon from "@mui/icons-material/Male"

const index = ({ patients }) => {
	const patientId = useParams().id
	const thePatient = patients.find(p=>p.id===patientId)
	return (
		<div>
			<div style={{display: 'flex'}}>
				<h3>{thePatient.name}</h3>
				{thePatient.gender==='male' ? <MaleIcon /> : <FemaleIcon />}
			</div>
			<p>occupation: {thePatient.occupation}</p>
		</div>
	)
}

export default index