import { derived, writable } from "svelte/store";
import type { Place } from "../../types/place";
import type { SocketMessage } from "../../types/message";

export const selected_place = writable<number | null>(null)
export const all_places = writable<Place[]>([])
export const socket_messages = writable<SocketMessage[]>([])

export const selected_place_data = derived(
    [all_places, selected_place],
    ([$all_places, $selected_place]) => {
        console.log(`SELECTED ${JSON.stringify([$all_places, $selected_place])}`);
        return $all_places.find(item => item.id === $selected_place?.toString())
    })

