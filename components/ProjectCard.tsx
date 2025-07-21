import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface ProjectCardProps {
	project: any;
}

export default function ProjectCard({ project }: ProjectCardProps) {
	return (
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
	);
}
