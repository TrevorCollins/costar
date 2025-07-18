import axios from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

if (!TMDB_API_KEY) {
	throw new Error('TMDB_API_KEY is not set in environment variables');
}

// Simple in-memory cache
const personSearchCache = new Map<string, any>();

export async function searchPeople(query: string) {
	if (!query) return [];
	const cacheKey = query.toLowerCase();
	if (personSearchCache.has(cacheKey)) {
		return personSearchCache.get(cacheKey);
	}
	const url = `${TMDB_BASE_URL}/search/person`;
	const params = {
		api_key: TMDB_API_KEY,
		query,
		include_adult: false,
	};
	const response = await axios.get(url, { params });
	const results = (response.data as any).results || [];
	personSearchCache.set(cacheKey, results);
	return results;
}
