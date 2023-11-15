const express = require('express');
const {
    postPatient,
    patchPatient,
    getPatientsAllDaily,
    getPatientsRangeDaily,
    getOnePatientAllDaily,
    getOnePatientRangeDaily
} = require('../controllers/data')


const router = express.Router();

router.post('/patient/', postPatient);
router.patch('/patient/:patient_id', patchPatient);
router.get('/patients-alldaily', getPatientsAllDaily);
router.get('/patients-rangedaily', getPatientsRangeDaily);
router.get('/patient-alldaily/:patient_id', getOnePatientAllDaily);
router.get('/patient-rangedaily/:patient_id', getOnePatientRangeDaily);


module.exports = router;