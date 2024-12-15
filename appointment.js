const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, date, time, service } = req.body;
        const appointment = new Appointment({ userId, date, time, service });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.params.userId });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
