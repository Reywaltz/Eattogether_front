import { API_URL } from "$env/static/private";
import type { PlaceList } from "../../../types/place";
import type { Room } from "../../../types/rooms";
import type { Participant } from "../../../types/user";
import type { VotedPlaces } from "../../../types/vote";

export async function load({fetch, cookies, params, locals}) {
    const [roomInfo, placesInfo, voted_places, participants_list] = await Promise.all([
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
        }),
        fetch(API_URL + `/users?room_id=${params.slug}`, {
            credentials: "include",
            headers: {
               "Content-type": "application/json",
               "Cookies": `X-Auth-Token:${cookies.get('X-Auth-Token')}`
            }
        })
    ])


    if (roomInfo.ok && placesInfo.ok && voted_places.ok && participants_list.ok) {
        const [room, places, votes, participants]: [Room, PlaceList, VotedPlaces, Participant[]]  = await Promise.all([
            roomInfo.json(),
            placesInfo.json(),
            voted_places.json(),
            participants_list.json(),
        ])

        console.log(participants);
        

        return { 
            "room": room,
            "places": places.items,
            "votes": votes.items,
            "user": locals.user,
            "participants": participants
        }
    } 
}