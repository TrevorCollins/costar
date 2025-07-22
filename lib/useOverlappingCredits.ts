import { useEffect, useState } from 'react';
import { TMDBCredit } from './tmdbTypes';

const TALKSHOW_GENRE_ID = 10767;
const NEWS_GENRE_ID = 10763;

type OverlapSort = 'popularity' | 'year_desc' | 'year_asc' | 'title';

export function useOverlappingCredits(
	person1Id?: number,
	person2Id?: number,
	defaultSort: OverlapSort = 'popularity'
) {
	const [overlaps, setOverlaps] = useState<TMDBCredit[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [sort, setSort] = useState<OverlapSort>(defaultSort);

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
				let overlapsArr = credits2.filter(c =>
					map1.has(`${c.id}_${c.media_type}`)
				);
				const uniqueOverlaps = overlapsArr.filter(
					(curr, i, arr) =>
						arr.findIndex(obj => obj.id === curr.id) === i &&
						curr.genre_ids.length > 0 &&
						!curr.genre_ids.includes(TALKSHOW_GENRE_ID) &&
						!curr.genre_ids.includes(NEWS_GENRE_ID)
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

	const sortedOverlaps = [...overlaps].sort((a, b) => {
		if (sort === 'popularity') {
			return (b.popularity || 0) - (a.popularity || 0);
		} else if (sort === 'year_desc') {
			const yearA =
				parseInt((a.release_date || a.first_air_date || '').slice(0, 4)) || 0;
			const yearB =
				parseInt((b.release_date || b.first_air_date || '').slice(0, 4)) || 0;
			return yearB - yearA;
		} else if (sort === 'year_asc') {
			const yearA =
				parseInt((a.release_date || a.first_air_date || '').slice(0, 4)) || 0;
			const yearB =
				parseInt((b.release_date || b.first_air_date || '').slice(0, 4)) || 0;
			return yearA - yearB;
		} else if (sort === 'title') {
			return (a.title || a.name || '').localeCompare(b.title || b.name || '');
		}
		return 0;
	});

	return { overlaps: sortedOverlaps, loading, error, sort, setSort };
}
