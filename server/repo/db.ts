import mongoose from 'mongoose';
import 'dotenv/config';

export const db = () => {
  mongoose
    .connect(process.env.DB_URL || "")
    .then(() => console.log(`Connected to MongoDB...`))
    .catch(ex => console.error(ex));
};

