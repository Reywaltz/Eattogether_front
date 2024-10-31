import type {Place, PlaceList, PlaceListJSON} from "../types/place"
import { API_URL } from "$env/static/private";

export async function load({fetch, cookies}) {
    const r = await fetch(API_URL + "/places", {
        credentials: "include",
        headers: {
            "Content-type": "application/json",
            "Cookies": `X-Auth-Token:${cookies.get('X-Auth-Token')}`
        }
    })
    
    if (r.status > 201) {
        console.log("error");
        console.log(r.status);
        console.log(r.body);
    }
    const result: PlaceListJSON = await r.json();

    const items: Place[] = result.items.map(place => ({
        ...place,
        id: place.id.toString()
    }))

    return { "items": items } as PlaceList
}