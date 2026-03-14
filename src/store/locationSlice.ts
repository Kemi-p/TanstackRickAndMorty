import {create} from 'zustand'
import { devtools } from 'zustand/middleware'

interface LocationStore{
    locationUrl: string,
    setLocationUrl:(url:string)=>void
}

export const useLocationStore = create <LocationStore>()(devtools(
    (set)=> ({
        locationUrl:'',
        setLocationUrl:(url) => set({locationUrl:url},false, 'location/setUrl')
    }),
    {name:'LocationStore'}
))