import { config } from 'dotenv'

config({ path : '.env' });

export const { PORT, DB_URI , JWT_SECRET , JWT_EXPIRE } = process.env;