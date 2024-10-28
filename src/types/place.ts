
export interface Place {
    id: string;
    name: string;
    image: string;
}

export interface PlaceJSON {
    id: number;
    name: string;
    image: string;
}

export interface PlaceList {
    items: Place[];
}

export interface PlaceListJSON {
    items: PlaceJSON[];
}
