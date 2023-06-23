import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetCheckoutData,
  LoginCredentials,
  LoginResponse,
  ProductFormValues,
  ProductResponse,
  RefreshCredentials,
  RefreshResponse,
} from "../../interface/interface";
import { setLoggedIn, setLoggedOut } from "../authSlice/authSlice";
import { RootState } from "../store";

const environment = import.meta.env;

const baseQuery = fetchBaseQuery({
  baseUrl: environment.VITE_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Content-type", "application/json");
      headers.set("Accept", "application/json");
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // send refresh token to get new access token

    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult?.data) {
      // store the new token
      const { accessToken } = refreshResult.data as LoginResponse;
      api.dispatch(setLoggedIn(accessToken));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setLoggedOut());
    }
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product", "Checkout"],
  endpoints: (builder) => ({}),
});

export const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductData: builder.query<ProductResponse, void>({
      query: () => "/product",
      providesTags: ["Product"],
    }),
    addProductData: builder.mutation<void, ProductFormValues>({
      query: (productData) => ({
        url: "/product",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<void, Partial<ProductFormValues>>({
      query: (product) => ({
        url: `product/${product._id}`,
        method: "PATCH",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    getCheckout: builder.query<GetCheckoutData[], void>({
      query: () => "/user-checkout/admin/checkouts",
      providesTags: ["Checkout"],
    }),
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
    refresh: builder.mutation<RefreshResponse, RefreshCredentials>({
      query: (credentials) => ({
        url: "/auth/refresh",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetProductDataQuery,
  useAddProductDataMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCheckoutQuery,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
} = api;
