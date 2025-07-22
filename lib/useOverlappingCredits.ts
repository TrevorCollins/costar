import { useEffect, useState } from 'react';
import { TMDBCredit } from './tmdbTypes';

export function useOverlappingCredits(person1Id?: number, person2Id?: number) {
	const [overlaps, setOverlaps] = useState<TMDBCredit[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOverlaps = async () => {
			setError(null);
			if (!person1Id || !person2Id) {
				setOverlaps([]);
				return;
			}
			setLoading(true);
			try {
				const [res1, res2] = await Promise.all([
					fetch(`/api/tmdb/person-credits?personId=${person1Id}`),
					fetch(`/api/tmdb/person-credits?personId=${person2Id}`),
				]);
				if (!res1.ok || !res2.ok) {
					throw new Error('Failed to fetch credits from TMDB.');
				}
				const data1 = await res1.json();
				const data2 = await res2.json();
				const credits1: TMDBCredit[] = data1.results || [];
				const credits2: TMDBCredit[] = data2.results || [];
				const map1 = new Map(credits1.map(c => [`${c.id}_${c.media_type}`, c]));
				const overlapsArr = credits2.filter(c =>
					map1.has(`${c.id}_${c.media_type}`)
				);
				const uniqueOverlaps = overlapsArr.filter(
					(curr, i, arr) => arr.findIndex(obj => obj.id === curr.id) === i
				);
				setOverlaps(uniqueOverlaps);
			} catch (e: any) {
				setError(e.message || 'An unknown error occurred.');
				setOverlaps([]);
			} finally {
				setLoading(false);
			}
		};
		fetchOverlaps();
	}, [person1Id, person2Id]);

	return { overlaps, loading, error };
}
