import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { SearchBoxOption } from './SearchBox';
import ProjectCard from './ProjectCard';

interface OverlapsSectionProps {
	person1: SearchBoxOption | undefined;
	person2: SearchBoxOption | undefined;
}

export default function OverlapsSection({
	person1,
	person2,
}: OverlapsSectionProps) {
	const [overlaps, setOverlaps] = useState<any[]>([]);
	const [overlapLoading, setOverlapLoading] = useState(false);

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
				setOverlaps(overlapsArr);
			} catch (e) {
				setOverlaps([]);
			} finally {
				setOverlapLoading(false);
			}
		};
		fetchOverlaps();
	}, [person1, person2]);

	return (
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
								<ProjectCard project={project} />
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
	);
}
