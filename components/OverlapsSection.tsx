import { useOverlappingCredits } from '../lib/useOverlappingCredits';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SearchBoxOption } from './SearchBox';
import OverlapsGrid from './OverlapsGrid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';

interface OverlapsSectionProps {
	person1: SearchBoxOption | undefined;
	person2: SearchBoxOption | undefined;
}

export default function OverlapsSection({
	person1,
	person2,
}: OverlapsSectionProps) {
	const { overlaps, loading, error, sort, setSort } = useOverlappingCredits(
		person1?.id,
		person2?.id,
		'popularity'
	);

	return (
		<Box mt={6}>
			{loading && (
				<Box display='flex' justifyContent='center' my={4}>
					<CircularProgress />
				</Box>
			)}
			{error && (
				<Typography variant='body1' mt={4} color='error' aria-live='polite'>
					{error}
				</Typography>
			)}
			{!loading && !error && overlaps.length > 0 && (
				<>
					<Box display='flex' alignItems='center' mb={2} gap={2}>
						<Typography variant='h5' mt={4} mb={0} fontWeight={600}>
							{overlaps.length} Overlapping Projects
						</Typography>
						<FormControl size='small' sx={{ minWidth: 160, mt: 4 }}>
							<InputLabel id='sort-label'>Sort By</InputLabel>
							<Select
								labelId='sort-label'
								value={sort}
								label='Sort By'
								onChange={e => setSort(e.target.value as any)}
							>
								<MenuItem value='popularity'>Popularity</MenuItem>
								<MenuItem value='year_desc'>Year (Newest)</MenuItem>
								<MenuItem value='year_asc'>Year (Oldest)</MenuItem>
								<MenuItem value='title'>Title (A-Z)</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<OverlapsGrid overlaps={overlaps} loading={loading} />
				</>
			)}
			{!loading && !error && person1 && person2 && overlaps.length === 0 && (
				<Typography
					variant='body1'
					mt={4}
					color='text.secondary'
					aria-live='polite'
				>
					No overlapping projects found.
				</Typography>
			)}
		</Box>
	);
}
