import express from 'express';
import generateOTP from '../helpers/generateOTP.js';

const generateOTProuter = express.Router();

generateOTProuter.get('/', (req, res) => {
  const otp = generateOTP();
  res.json({ otp });
});

export default generateOTProuter;