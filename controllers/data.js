const PatientData = require('../models/DataModel');

//Post One Patient
const postPatient = async (req, res) => {

    const { patient_id, iPhone_id, dailyData } = req.body;

    if (patient_id > 0) {
        // Add Doc to DB
        try {
            const patientData = await PatientData.create({ patient_id, iPhone_id, dailyData })

            //properly formatted legal request
            res.status(200).json(patientData)
        }
        catch (error) {
            //improperly formatted request
            res.status(400).json({ error: error.message })
        }
    }

    else {
        res.status(400).json({ error: "Patient ID Cannot be Negative" })
    }


}


// Patch One Patient
const patchPatient = async (req, res) => {
    const { patient_id } = req.params

    try {
        // sort while adding ??
        const patient = await PatientData.findOneAndUpdate({ patient_id: patient_id }, { $push: { dailyData: req.body } })
        if (!patient) {
            return res.status(404).json({ error: "Patient Not Found" })
        }

        res.status(200).json({ patient_id: patient['patient_id'] })

    }
    catch (error) {
        res.status(400).json({ error: error })
    }
}


// Get All Patients All Dailys
const getPatientsAllDaily = async (req, res) => {
    try {
        const patients = await PatientData.find({})
        
        for (let patient of patients) {

            //sort patients data in date order
            patient['dailyData'] = patient['dailyData'].sort(function(a,b){
                let adate = new Date(a.date);
                let bdate = new Date(b.date);
        
                return bdate - adate
            })

        }

        res.status(200).json(patients)
    }
    catch (error) {
        //improperly formatted request
        res.status(400).json({ error: error.message })
    }
}


//Get All Patients Range Dailys
const getPatientsRangeDaily = async (req, res) => {

    const { rangeStart, rangeEnd } = req.body

    try {
        const patients = await PatientData.find({})

        //console.log(patients)
        const rangeStartDate = new Date(rangeStart);
        const rangeEndDate = new Date(rangeEnd);
        //console.log(patient[0]['dailyData'][1]['date'] <= rangeEndDate);

        for (let patient of patients) {

            const filteredArray = patient['dailyData'].filter(pData => pData['date'] >= rangeStartDate && pData['date'] <= rangeEndDate);

            patient['dailyData'] = filteredArray;

            //sort patients data in date order
            patient['dailyData'] = patient['dailyData'].sort(function(a,b){
                let adate = new Date(a.date);
                let bdate = new Date(b.date);
        
                return bdate - adate
            })

        }


        // return the original object with the filterd Array
        res.status(200).json({ patients });

    }
    catch (error) {
        //improperly formatted request
        res.status(400).json({ error: error.message })
    }


}


//Get One Patient All Dailys
const getOnePatientAllDaily = async (req, res) => {
    const { patient_id } = req.params

    const patient = await PatientData.find({ patient_id: patient_id })

    //Add bad Request 400  Error

    if (patient.length == 0) {
        return res.status(404).json({ error: 'Patient Not Found' })
    }

    //patient[0]['dailyData'] = patient[0]['dailyData'].sort(function(a,b){return b.date - a.date})
    patient[0]['dailyData'] = patient[0]['dailyData'].sort(function (a, b) {
        let adate = new Date(a.date);
        let bdate = new Date(b.date);

        return bdate - adate
    })


    res.status(200).json({ patient })
}


//Get One Patient Range Dailys
const getOnePatientRangeDaily = async (req, res) => {

    const { patient_id } = req.params
    const { rangeStart, rangeEnd } = req.body

    const patient = await PatientData.find({ patient_id: patient_id })

    //Add bad Request 400  Error

    if (patient.length == 0) {
        return res.status(404).json({ error: 'Patient Not Found' })
    }

    //Filter Array for return

    const rangeStartDate = new Date(rangeStart);
    const rangeEndDate = new Date(rangeEnd);

    const filteredArray = patient[0]['dailyData'].filter(pData => pData['date'] >= rangeStartDate && pData['date'] <= rangeEndDate);

    //console.log(filteredArray)

    patient[0]['dailyData'] = filteredArray;

    //Sort Filtered array for a date ordered return
    patient[0]['dailyData'] = patient[0]['dailyData'].sort(function (a, b) {
        let adate = new Date(a.date);
        let bdate = new Date(b.date);

        return bdate - adate
    })

    // return the original object with the filterd Array
    res.status(200).json({ patient });

}




module.exports = {
    postPatient,
    patchPatient,
    getPatientsAllDaily,
    getPatientsRangeDaily,
    getOnePatientAllDaily,
    getOnePatientRangeDaily
}