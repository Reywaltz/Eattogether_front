import { API_URL } from "$env/static/private";
import type { PlaceList } from "../../../types/place";
import type { Room } from "../../../types/rooms";
import type { VotedPlaces } from "../../../types/vote";

export async function load({fetch, cookies, params}) {
    const [roomInfo, placesInfo, voted_places] = await Promise.all([
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
        }),
        //TODO get voted items
        fetch(API_URL + `/votes/${params.slug}`, {
            credentials: "include",
            headers: {
               "Content-type": "application/json",
               "Cookies": `X-Auth-Token:${cookies.get('X-Auth-Token')}`
            }
        })
    ])


    if (roomInfo.ok && placesInfo.ok && voted_places.ok) {
        const room: Room = await roomInfo.json();
        const places: PlaceList = await placesInfo.json();
        const votes: VotedPlaces = await voted_places.json();

        return { "room": room, "places": places.items, "votes": votes.items }
    } 
}