import { useOverlappingCredits } from '../lib/useOverlappingCredits';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SearchBoxOption } from './SearchBox';
import OverlapsGrid from './OverlapsGrid';

interface OverlapsSectionProps {
	person1: SearchBoxOption | undefined;
	person2: SearchBoxOption | undefined;
}

export default function OverlapsSection({
	person1,
	person2,
}: OverlapsSectionProps) {
	const { overlaps, loading, error } = useOverlappingCredits(
		person1?.id,
		person2?.id
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
					<Typography variant='h5' mt={4} mb={2} fontWeight={600}>
						Overlapping Projects
					</Typography>
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
