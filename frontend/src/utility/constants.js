const PORT = 8000;
const BASE = `http://localhost:${PORT}/api`;

export const API_ROUTES = {
  PORT: PORT,
  BASE: BASE,
  PDF: {
    GENERATE: `${BASE}/pdf/generate`,
    CREATE: `${BASE}/pdf/create`,
    GET_ALL: `${BASE}/pdf/user-codebooks`,
    DELETE: `${BASE}/pdf/delete-codebook`,
    FETCH: `${BASE}/pdf/fetch`,
    MODIFY: `${BASE}/pdf/modify`,
  },

  GITHUB: {
    FETCH_ALL: `${BASE}/github/fetch-all`,
  },
};