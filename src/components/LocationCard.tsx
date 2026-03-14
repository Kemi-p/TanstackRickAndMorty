import { useLocationStore } from "../store/locationSlice";
import type { Location } from "../types/type";

export function LocationCard(){
    const locationUrl= useLocationStore((state) => state.locationUrl)
}

