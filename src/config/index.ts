import Airtable from "airtable";

// Load env variables
const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

export const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);
