import dotenv from 'dotenv';

dotenv.config();
export default {
  PORT: process.env.PORT || 4000,
  DB: process.env.DB,
  SECRET: process.env.SECRET,
};