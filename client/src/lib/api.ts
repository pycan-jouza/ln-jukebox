import { axiosClient } from './axiosClient';

export type CurrentSong = {
	id: string;
	name: string;
	durationInSeconds: number;
	currentSecond: number;
};

export type QueueItem = {
	id: string;
	durationInSeconds: number;
	name: string;
	satsAmount: number;
};

export type SearchItem = {
	videoId: string;
	title: string;
};

export const QUERY_CACHE_KEYS = {
	QUEUE: 'queue',
	CURRENT_SONG: 'currentSong',
	SEARCH: 'search'
};

export const validateLink = async (link: string) =>
	(await axiosClient.post('/validate-link', { link })).data;

export const generatePaymentRequest = async (body: { link: string; satsAmount: number }) =>
	(
		await axiosClient.post<{ queueItemId: string; paymentRequest: string }>(
			'/payment-request',
			body
		)
	).data;

export const searchAudio = async (q: string) =>
	(await axiosClient.get<SearchItem[]>('/search', { params: { q } })).data;

export const getCurrentSong = async () => (await axiosClient.get<CurrentSong | null>('/')).data;

export const getQueue = async () => (await axiosClient.get<QueueItem[]>('/queue')).data;
