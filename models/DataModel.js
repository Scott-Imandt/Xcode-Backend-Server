const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DSTSchema = new Schema({
    value: {
        type: Number
    },

    timestamp: {
        type: Date
    }
}, { _id: false })

const SpeedSchema = new Schema({
    value: {
        type: Number
    },

    timestamp: {
        type: Date
    }
}, { _id: false  })

const AsymetrySchema = new Schema({
    value: {
        type: Number
    },

    timestamp:{
        type: Date
    }
}, { _id: false  })

const StrideSchema = new Schema({
    value: {
        type: Number
    },

    timestamp:{
        type: Date
    }
}, { _id: false  })

const dailyDataSchema = new Schema({

    date: {
        type: Date,
        required: true
    },

    DST: [
        { type: DSTSchema }
    ],

    Speed: [
        { type: SpeedSchema }
    ],

    Asymetry: [
        { type: AsymetrySchema }
    ],

    Stride: [
        { type: StrideSchema }
    ]
}, { _id: false })


const dataSchema = new Schema({

    patient_id: {
        type: String,
        required: true,
        unique: true
    },

    iPhone_id: {
        type: String,
        require: true
    },

    dailyData: [
        { type: dailyDataSchema }
    ]

}, { timestamps: { createdAt: true } })

module.exports = mongoose.model("Patient", dataSchema)

