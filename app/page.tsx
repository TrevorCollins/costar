'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchSection from '../components/SearchSection';
import OverlapsSection from '../components/OverlapsSection';
import { useState } from 'react';
import { SearchBoxOption } from '../components/SearchBox';

export default function Home() {
	const [person1, setPerson1] = useState<SearchBoxOption | undefined>(
		undefined
	);
	const [person2, setPerson2] = useState<SearchBoxOption | undefined>(
		undefined
	);

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
				<SearchSection
					onPeopleSelected={(p1, p2) => {
						setPerson1(p1);
						setPerson2(p2);
					}}
				/>
				<OverlapsSection person1={person1} person2={person2} />
			</Box>
		</Container>
	);
}
