import { API_URL } from "$env/static/private";
import type { RoomList } from "../../types/rooms";


export async function load({fetch, cookies}) {
    const r = await fetch(API_URL + `/rooms`, {
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
    const result: RoomList = await r.json();

    return { "items": result.items } as RoomList

}