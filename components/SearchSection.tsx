import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { TMDBPerson } from '../lib/tmdbTypes';
import SearchBox, { SearchBoxOption } from './SearchBox';
import { usePersonSearch } from '../lib/usePersonSearch';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
	let timer: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	};
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
	const {
		options: person1OptionsRaw,
		loading: person1Loading,
		error: person1Error,
		handleInputChange: handlePerson1InputChange,
	} = usePersonSearch();
	const {
		options: person2OptionsRaw,
		loading: person2Loading,
		error: person2Error,
		handleInputChange: handlePerson2InputChange,
	} = usePersonSearch();

	const [person1, setPerson1] = useState<SearchBoxOption | undefined>(
		undefined
	);
	const [person2, setPerson2] = useState<SearchBoxOption | undefined>(
		undefined
	);

	useEffect(() => {
		onPeopleSelected(person1, person2);
	}, [person1, person2, onPeopleSelected]);

	// Map TMDBPerson to SearchBoxOption
	const person1Options: SearchBoxOption[] = person1OptionsRaw.map(
		(person: TMDBPerson) => ({
			...person,
			label: person.name,
			value: person.id,
		})
	);
	const person2Options: SearchBoxOption[] = person2OptionsRaw.map(
		(person: TMDBPerson) => ({
			...person,
			label: person.name,
			value: person.id,
		})
	);

	return (
		<Grid container spacing={3} mt={4}>
			<Grid size={{ xs: 12, md: 6 }}>
				<SearchBox
					label='Search for Person 1'
					options={person1Options}
					loading={person1Loading}
					handleChange={setPerson1}
					handleInputChange={handlePerson1InputChange}
				/>
				{person1Error && (
					<Alert severity='error' sx={{ mt: 1 }}>
						{person1Error}
					</Alert>
				)}
			</Grid>
			<Grid size={{ xs: 12, md: 6 }}>
				<SearchBox
					label='Search for Person 2'
					options={person2Options}
					loading={person2Loading}
					handleChange={setPerson2}
					handleInputChange={handlePerson2InputChange}
				/>
				{person2Error && (
					<Alert severity='error' sx={{ mt: 1 }}>
						{person2Error}
					</Alert>
				)}
			</Grid>
		</Grid>
	);
}
