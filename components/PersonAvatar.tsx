import Avatar from '@mui/material/Avatar';
import { TMDBPerson } from '../lib/tmdbTypes';

interface PersonAvatarProps {
	person: TMDBPerson;
	size?: number;
}

export default function PersonAvatar({ person, size = 40 }: PersonAvatarProps) {
	const src = person.profile_path
		? `https://image.tmdb.org/t/p/w185${person.profile_path}`
		: undefined;
	return (
		<Avatar src={src} alt={person.name} sx={{ width: size, height: size }}>
			{!src && person.name.charAt(0)}
		</Avatar>
	);
}
