import { useState, useCallback, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import SearchBox, { SearchBoxOption } from './SearchBox';

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
	let timer: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	};
}

async function fetchPersonSuggestions(query: string) {
	if (!query) return [];
	const res = await fetch(
		`/api/tmdb/search-person?query=${encodeURIComponent(query)}`
	);
	if (!res.ok) return [];
	const data = await res.json();
	// Sort by popularity descending and filter out invalid ids
	const sorted = (data.results || [])
		.filter(
			(person: any) =>
				person.id !== null && person.id !== undefined && person.id !== 0
		)
		.sort((a: any, b: any) => (b.popularity || 0) - (a.popularity || 0));
	return sorted;
}

interface SearchSectionProps {
	onPeopleSelected: (
		person1: SearchBoxOption | undefined,
		person2: SearchBoxOption | undefined
	) => void;
}

export default function SearchSection({
	onPeopleSelected,
}: SearchSectionProps) {
	const [person1, setPerson1] = useState<SearchBoxOption | undefined>(
		undefined
	);
	const [person1Input, setPerson1Input] = useState('');
	const [person1Options, setPerson1Options] = useState<SearchBoxOption[]>([]);
	const [person1Loading, setPerson1Loading] = useState(false);

	const [person2, setPerson2] = useState<SearchBoxOption | undefined>(
		undefined
	);
	const [person2Input, setPerson2Input] = useState('');
	const [person2Options, setPerson2Options] = useState<SearchBoxOption[]>([]);
	const [person2Loading, setPerson2Loading] = useState(false);

	// Notify parent when both people are selected
	useEffect(() => {
		onPeopleSelected(person1, person2);
	}, [person1, person2, onPeopleSelected]);

	// Debounced search for person 1
	const debouncedSearch1 = useCallback(
		debounce(async (input: string) => {
			if (!input) {
				setPerson1Options([]);
				setPerson1Loading(false);
				return;
			}
			setPerson1Loading(true);
			try {
				const results = await fetchPersonSuggestions(input);
				setPerson1Options(
					results.map((person: any) => ({
						label: person.name,
						value: person.id,
						...person,
					}))
				);
			} finally {
				setPerson1Loading(false);
			}
		}, 400),
		[]
	);

	// Debounced search for person 2
	const debouncedSearch2 = useCallback(
		debounce(async (input: string) => {
			if (!input) {
				setPerson2Options([]);
				setPerson2Loading(false);
				return;
			}
			setPerson2Loading(true);
			try {
				const results = await fetchPersonSuggestions(input);
				setPerson2Options(
					results.map((person: any) => ({
						label: person.name,
						value: person.id,
						...person,
					}))
				);
			} finally {
				setPerson2Loading(false);
			}
		}, 400),
		[]
	);

	const handlePerson1InputChange = (input: string) => {
		setPerson1Input(input);
		debouncedSearch1(input);
	};
	const handlePerson2InputChange = (input: string) => {
		setPerson2Input(input);
		debouncedSearch2(input);
	};

	return (
		<Stack spacing={3} mt={4}>
			<SearchBox
				label='Search for Person 1'
				value={person1}
				options={person1Options}
				loading={person1Loading}
				handleChange={setPerson1}
				handleInputChange={handlePerson1InputChange}
			/>
			<SearchBox
				label='Search for Person 2'
				value={person2}
				options={person2Options}
				loading={person2Loading}
				handleChange={setPerson2}
				handleInputChange={handlePerson2InputChange}
			/>
		</Stack>
	);
}
