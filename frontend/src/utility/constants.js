const PORT = 8000;
const BASE = `http://localhost:${PORT}/api`;

export const API_ROUTES = {
  PORT: PORT,
  BASE: BASE,
  PDF: {
    GENERATE: `${BASE}/pdf/generate`,
  },
};