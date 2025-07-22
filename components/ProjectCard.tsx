import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { TMDBCredit, TMDBMediaType } from '../lib/tmdbTypes';

interface ProjectCardProps {
	project: TMDBCredit;
}

function getYear(dateString?: string) {
	if (!dateString) return '';
	const d = new Date(dateString);
	return isNaN(d.getTime()) ? '' : d.getFullYear().toString();
}

export default function ProjectCard({ project }: ProjectCardProps) {
	const year = getYear(project.release_date || project.first_air_date);
	return (
		<Card
			sx={{ height: 400, display: 'flex', flexDirection: 'column' }}
			tabIndex={0}
			role='group'
			aria-label={`Project: ${project.title || project.name}`}
		>
			{project.poster_path && (
				<CardMedia
					component='img'
					height='260'
					image={`https://image.tmdb.org/t/p/w300${project.poster_path}`}
					alt={project.title || project.name}
					sx={{ objectFit: 'contain', height: '260px' }}
				/>
			)}
			<CardContent
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
				}}
			>
				<Typography variant='subtitle1' fontWeight={500}>
					{project.title || project.name}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{year}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{project.media_type === TMDBMediaType.Movie ? 'Movie' : 'TV'}
				</Typography>
			</CardContent>
		</Card>
	);
}
