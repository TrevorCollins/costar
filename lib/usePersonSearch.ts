import { useState, useCallback } from 'react';
import { TMDBPerson } from './tmdbTypes';
import { fetchPersonSuggestions } from './fetchUtils';

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
	let timer: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	};
}

export function usePersonSearch() {
	const [options, setOptions] = useState<TMDBPerson[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const debouncedSearch = useCallback(
		debounce(async (input: string) => {
			setError(null);
			if (!input) {
				setOptions([]);
				setLoading(false);
				return;
			}
			setLoading(true);
			try {
				const results = await fetchPersonSuggestions(input);
				const uniqueResults = results.filter(
					(curr, i, arr) =>
						arr.findIndex(
							obj => `${obj.id}_${obj.name}` === `${curr.id}_${curr.name}`
						) === i
				);
				setOptions(uniqueResults);
			} catch (e: any) {
				setError(e.message || 'An unknown error occurred.');
				setOptions([]);
			} finally {
				setLoading(false);
			}
		}, 400),
		[]
	);

	const handleInputChange = (input: string) => {
		debouncedSearch(input);
	};

	return {
		options,
		loading,
		error,
		handleInputChange,
	};
}
