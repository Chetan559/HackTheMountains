import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PatientTable = ({ patients }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleShowDetails = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{patient.patientName}</TableCell>
                <TableCell>{patient.patientAge}</TableCell>
                <TableCell>{patient.patientGender}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleShowDetails(patient)}>
                    Show Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedPatient && (
        <Card className='card-context' style={{ marginTop: '20px' }}>
          <CardContent>
            <Typography variant="h5">Patient Details</Typography>
          
            <Typography><strong>Name:</strong> {selectedPatient.patientName}</Typography>
            <Typography><strong>Number:</strong> {selectedPatient.patientNumber}</Typography>
            <Typography><strong>Age:</strong> {selectedPatient.patientAge}</Typography>
            <Typography><strong>Gender:</strong> {selectedPatient.patientGender}</Typography>
            <Typography><strong>Medical History:</strong> {selectedPatient.medicalHistory}</Typography>
            <Typography><strong>Current Symptoms:</strong> {selectedPatient.currentSymptoms}</Typography>
            <Typography><strong>Medications:</strong> {selectedPatient.medications}</Typography>
            <Typography><strong>Allergies:</strong> {selectedPatient.allergies}</Typography>
            <Typography><strong>Vital Signs:</strong> {selectedPatient.vitalSigns}</Typography>
            <Typography><strong>Lab Results:</strong> {selectedPatient.labResults}</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientTable;
