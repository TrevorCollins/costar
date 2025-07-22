import Grid from '@mui/material/Grid';
import ProjectCard from './ProjectCard';
import { TMDBCredit } from '../lib/tmdbTypes';
import Skeleton from '@mui/material/Skeleton';

interface OverlapsGridProps {
	overlaps: TMDBCredit[];
	loading?: boolean;
}

export default function OverlapsGrid({ overlaps, loading }: OverlapsGridProps) {
	// Show 3 skeleton cards if loading and no overlaps yet
	if (loading && overlaps.length === 0) {
		return (
			<Grid container spacing={2}>
				{[1, 2, 3].map(i => (
					<Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
						<Skeleton
							variant='rectangular'
							height={400}
							sx={{ borderRadius: 2 }}
						/>
					</Grid>
				))}
			</Grid>
		);
	}
	return (
		<Grid container spacing={2}>
			{overlaps.map(project => (
				<Grid
					size={{ xs: 12, sm: 6, md: 4 }}
					key={`${project.id}_${project.media_type}`}
				>
					<ProjectCard project={project} />
				</Grid>
			))}
		</Grid>
	);
}
