import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductFormValues, ProductResponse } from "../../interface/interface";

const environment = import.meta.env;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.VITE_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Product"],
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
  }),
});

export const {
  useGetProductDataQuery,
  useAddProductDataMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = api;
