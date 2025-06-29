import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', //This ensures that cookies are sent with every request and is essential for protected routes that require authentication.
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','Tests','Leaderboard'],
  endpoints: () => ({}),
});