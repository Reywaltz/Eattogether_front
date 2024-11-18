interface ValueType {
    [place_id: string]: { "place_id": string, "selected_date": Date};
}

interface RootObject {
    value: ValueType
}

export const selected_places = $state<RootObject>({value: {}})