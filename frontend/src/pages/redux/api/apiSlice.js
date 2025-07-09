import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL, //sets the root API URL (e.g. http://localhost:5000/api)
  credentials: 'include', //This ensures that cookies are sent with every request and is essential for protected routes that require authentication.
});

//This creates an API slice that you can inject endpoints into.
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','Tests','Leaderboard'],
  endpoints: () => ({}), //This is where you define the actual API endpoints (GET, POST, PUT, etc.). Right now, it's empty.
});