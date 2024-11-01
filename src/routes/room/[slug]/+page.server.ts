import { API_URL } from "$env/static/private";
import type { PlaceList } from "../../../types/place";
import type { Room } from "../../../types/rooms";

export async function load({fetch, cookies, params}) {
    const [roomInfo, placesInfo] = await Promise.all([
        fetch(API_URL + `/rooms/${params.slug}`, {
            credentials: "include",
            headers: {
               "Content-type": "application/json",
               "Cookies": `X-Auth-Token:${cookies.get('X-Auth-Token')}`
            }
        }),
        fetch(API_URL + "/places", {
            credentials: "include",
            headers: {
                "Content-type": "application/json",
                "Cookies": `X-Auth-Token:${cookies.get('X-Auth-Token')}`
            }
        })
    ])


    if (roomInfo.ok && placesInfo.ok) {
        const room: Room = await roomInfo.json();
        const places: PlaceList = await placesInfo.json();

        console.log(room, places);
        

        return { "room": room, "places": places.items }
    } 
}