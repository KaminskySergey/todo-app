export interface IProfile {
        id: number,
        name: string,
        email: string,
        avatar: string | null,
        phone: string | null,
        createdAt: Date,
        updatedAt: Date
}