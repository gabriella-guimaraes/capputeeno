import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { ProductFetchResponse } from "../types/product";

const API_URL = "https://api-capputeeno.vercel.app/"
//const API_URL = "http://localhost:3333"
//console.log(API_URL);

const fetcher = (productId: string): AxiosPromise<ProductFetchResponse> => {
  return axios.post(API_URL, {query: `
    query {
        Product(id:"${productId}"){
            name
            description
            category
            price_in_cents
            image_url
        }
    }
  `})
};

export function useProduct(id: string){
    const { data } = useQuery({
        queryFn: () => fetcher(id),
        queryKey: ['product', id],
        enabled:!!id,   //use the method only when the id = true
        staleTime: 1000 * 60 * 5
    })

    return{
        data: data?.data?.data?.Product
    }
}