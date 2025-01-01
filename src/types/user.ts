export interface User {
    id: number
    roles: string[]
}

export interface Participant {
    id: number
    username: string
}

export interface SearchUserInvite {
    id: number
    username: string
    name: string
    image: string
}