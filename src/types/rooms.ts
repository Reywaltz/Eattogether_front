
export interface Room {
    external_id: string;
    name: string;
    created_at: Date
}

export interface RoomList {
    items: Room[]
}
