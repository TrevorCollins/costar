import { TMDBPerson } from './tmdbTypes';

export async function fetchPersonSuggestions(
	query: string
): Promise<TMDBPerson[]> {
	if (!query) return [];
	const res = await fetch(
		`/api/tmdb/search-person?query=${encodeURIComponent(query)}`
	);
	if (!res.ok) return [];
	const data = await res.json();
	// Sort: people with images first, then by popularity descending
	const sorted: TMDBPerson[] = (data.results || [])
		.filter((person: TMDBPerson) => !!person.id)
		.sort((a: TMDBPerson, b: TMDBPerson) => {
			if (a.profile_path && !b.profile_path) return -1;
			if (!a.profile_path && b.profile_path) return 1;
			return (b.popularity || 0) - (a.popularity || 0);
		});
	return sorted;
}
