import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({ //Using builder.mutation to define a POST request for logging in
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

/*
POST /api/users/auth
Content-Type: application/json

{
  "email": "example@example.com",
  "password": "yourpassword"
}
  */

export const { useLoginMutation } = userApiSlice;