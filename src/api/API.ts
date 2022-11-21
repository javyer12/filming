import { Movie, MovieType, Promos } from '../types';

const API_ENDPOINT = 'https://api.jikan.moe';
const API_VERSION = 4;
const ENABLED = false;

type ImageData = {
    imageUrl: string
    smallImageUrl: string
    mediumImageUrl?: string
    largeImageURL: string
    maximumImageUrl?: string
}

export type MovieData = {
    malId: number
    aired: {
        from: string
    }
    trailer: {
        youtubeId: string
        url: string
        embedUrl: string
    }
    images: {
        jpg: ImageData
        webp: ImageData
    }
    title: string
    episodes: number
    status: string
    type: MovieType
    year: number
    score: number
    synopsis: string
    scoredBy: number
    genres: Array<{
        name: string
    }>
    streaming: Array<{
        name: string
        url: string
    }>
}

export type PromoData = {
    entry: {
        malId: number
        images: {
            jpg: ImageData
            webp: ImageData
        }
        title: string
    }
    trailer: {
        youtubeId: string
        ul: string
        embedUrl: string
        images: ImageData
    }
}

export type APIResponse<T> = {
    pagination: {
        lastVisiblePage: number
        hasNextPage: boolean
        currentPage: number
    }
    data: T
}

export const getTopMovieAnime = (page: number = 1) => {
    `${API_ENDPOINT}/v${API_VERSION}/top/anime?page=${page}`
}

export const getAnimeFullId = (id: number) => {
    `${API_ENDPOINT}/v${API_VERSION}/anime/${id}/full`
}

export const getAnimeById = (id: number) => {
    `${API_ENDPOINT}/v${API_ENDPOINT}/anime/${id}`
}

export const getRecentPromo = () => {
    `${API_ENDPOINT}/v${API_VERSION}/watch/promos`
}

export const getAnimeByName = (page: number = 1, name: string) => {
    `${API_ENDPOINT}/v${API_VERSION}/anime?page=${page}&q=${name}&${ENABLED ? 'nsfw' : 'sfw'
        }`
}

export function parseAnimeData(data: MovieData): Movie {
    return {
        ...data,
        id: data.malId,
        coverURL: data.images.webp.imageUrl,
        largeImageURL: data.images.webp.largeImageURL,
        videoURL: data.trailer.embedUrl
            ? data.trailer.embedUrl.replace('autoplay=1', 'autoplay=0')
            : " ",
        numEpisode: data.episodes,
        genres: data.genres.map(({ name }: { name: string }) => name),
        year: new Date(data.aired.from).getFullYear(),
        votes: data.scoredBy,
        status: data.status,
        synopsis: data.synopsis,
        type: data.type,
    }
}