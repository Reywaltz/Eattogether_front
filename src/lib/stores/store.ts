import { derived, writable } from "svelte/store";

export const selected_place = writable([])
export const all_places = writable([])
export const socket_messages = writable([])

export const selected_place_data = derived(
    [all_places, selected_place],
    ([$all_places, $selected_place]) => {
        console.log(`SELECTED ${JSON.stringify([$all_places, $selected_place])}`);
        return $all_places.find(item => String(item.id) === $selected_place)
    })

