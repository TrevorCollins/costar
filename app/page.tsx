'use client';

import { useState, useCallback, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SearchBox, { SearchBoxOption } from '../components/SearchBox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

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

export default function Home() {
	// State for person 1
	const [person1, setPerson1] = useState<SearchBoxOption | null>(null);
	const [person1Input, setPerson1Input] = useState('');
	const [person1Options, setPerson1Options] = useState<SearchBoxOption[]>([]);
	const [person1Loading, setPerson1Loading] = useState(false);

	// State for person 2
	const [person2, setPerson2] = useState<SearchBoxOption | null>(null);
	const [person2Input, setPerson2Input] = useState('');
	const [person2Options, setPerson2Options] = useState<SearchBoxOption[]>([]);
	const [person2Loading, setPerson2Loading] = useState(false);

	// State for overlapping projects
	const [overlaps, setOverlaps] = useState<any[]>([]);
	const [overlapLoading, setOverlapLoading] = useState(false);

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

	// Fetch and compare credits when both people are selected
	useEffect(() => {
		const fetchOverlaps = async () => {
			if (!person1 || !person2) {
				setOverlaps([]);
				return;
			}
			setOverlapLoading(true);
			try {
				const [res1, res2] = await Promise.all([
					fetch(`/api/tmdb/person-credits?personId=${person1.value}`),
					fetch(`/api/tmdb/person-credits?personId=${person2.value}`),
				]);
				const data1 = await res1.json();
				const data2 = await res2.json();
				const credits1 = data1.results || [];
				const credits2 = data2.results || [];
				// Find overlaps by id and media_type
				const map1 = new Map(
					credits1.map((c: any) => [`${c.id}_${c.media_type}`, c])
				);
				const overlapsArr = credits2.filter((c: any) =>
					map1.has(`${c.id}_${c.media_type}`)
				);
				// Optionally, enrich with both roles
				setOverlaps(overlapsArr);
			} catch (e) {
				setOverlaps([]);
			} finally {
				setOverlapLoading(false);
			}
		};
		fetchOverlaps();
	}, [person1, person2]);

	// Handlers for input change
	const handlePerson1InputChange = (input: string) => {
		setPerson1Input(input);
		debouncedSearch1(input);
	};
	const handlePerson2InputChange = (input: string) => {
		setPerson2Input(input);
		debouncedSearch2(input);
	};

	return (
		<Container
			maxWidth='md'
			sx={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Box py={4}>
				<Typography variant='h3' align='center' gutterBottom fontWeight={700}>
					Costar
				</Typography>
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
				{/* Overlapping projects */}
				<Box mt={6}>
					{overlapLoading && (
						<Box display='flex' justifyContent='center' my={4}>
							<CircularProgress />
						</Box>
					)}
					{!overlapLoading && overlaps.length > 0 && (
						<>
							<Typography variant='h5' mt={4} mb={2} fontWeight={600}>
								Overlapping Projects
							</Typography>
							<Grid container spacing={2}>
								{overlaps.map((project: any) => (
									<Grid
										size={{ xs: 12, sm: 6, md: 4 }}
										key={`${project.id}_${project.media_type}`}
									>
										<Card>
											{project.poster_path && (
												<CardMedia
													component='img'
													height='300'
													image={`https://image.tmdb.org/t/p/w300${project.poster_path}`}
													alt={project.title || project.name}
												/>
											)}
											<CardContent>
												<Typography variant='subtitle1' fontWeight={500}>
													{project.title || project.name}
												</Typography>
												<Typography variant='body2' color='text.secondary'>
													{project.release_date || project.first_air_date || ''}
												</Typography>
												<Typography variant='body2' color='text.secondary'>
													{project.media_type === 'movie' ? 'Movie' : 'TV'}
												</Typography>
											</CardContent>
										</Card>
									</Grid>
								))}
							</Grid>
						</>
					)}
					{!overlapLoading && person1 && person2 && overlaps.length === 0 && (
						<Typography variant='body1' mt={4} color='text.secondary'>
							No overlapping projects found.
						</Typography>
					)}
				</Box>
			</Box>
		</Container>
	);
}
