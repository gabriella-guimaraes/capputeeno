import { FilterContext } from "@/app/contexts/filter-context";
import { useContext } from "react";

export function useFilter(){
    return useContext(FilterContext)
}