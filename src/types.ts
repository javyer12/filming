export type MovieType = 'TV' | 'Novels' | 'Serie' | 'Anime Serie'

export type Movie = {
    coverURL: string;
    numEpisode: number;
    genres: string[];
    id: number;
    largeImageURL?: string;
    score?: number;
    status?: string;
    synopsis: string;
    type: MovieType;
    year: number;
    videoURL: string;
    votes?: number;
    streaming?: Array<{
        name: string;
        url: string;
    }>
}

export type Promos = {
    id: number
    title: string
    coverURL: string
    videoURL: string
}