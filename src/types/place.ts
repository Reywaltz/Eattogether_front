
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

export interface PlaceVote {
    name: string;
    count: number;
}

export interface PlaceVotes {
    items: PlaceVote[]
}