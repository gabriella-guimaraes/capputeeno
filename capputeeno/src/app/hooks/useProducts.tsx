import { ProductsFetchResponse } from "@/types/products_response";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

//TODO: API response undefined? - the function only works when the URL is defined on this archive?? 1h29

//const API_URL = process.env.NEXT_PUBLIC_API_URL_ as string;
const API_URL = "http://localhost:3333"
console.log(API_URL);

const fetcher = (): AxiosPromise<ProductsFetchResponse> => {
  return axios.post(API_URL, {
    query: `
            query {
                allProducts {
                id
                name
                price_in_cents
                }
            }
        `
  })
};


export function useProducts() {
  const { data } = useQuery({
    queryFn: fetcher,
    queryKey: ['products']
  });

  return {
    data: data?.data?.data?.allProducts
  };
}


