
export interface Room {
    external_id: string;
    name: string;
    created_at: Date
    owner_id: number
}

export interface RoomList {
    items: Room[]
}
