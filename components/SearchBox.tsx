import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { TMDBPerson } from '../lib/tmdbTypes';
import PersonAvatar from './PersonAvatar';

export interface SearchBoxOption extends TMDBPerson {
	label: string;
	value: string | number;
}

interface SearchBoxProps {
	label: string;
	options: SearchBoxOption[];
	loading?: boolean;
	handleChange: (value: SearchBoxOption | undefined) => void;
	handleInputChange: (input: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
	label,
	options,
	loading = false,
	handleChange,
	handleInputChange,
}) => {
	return (
		<Autocomplete
			options={options.sort((a, b) =>
				a.known_for_department.localeCompare(b.known_for_department)
			)}
			loading={loading}
			groupBy={(option: SearchBoxOption) => option.known_for_department || ''}
			onChange={(_, newValue) =>
				handleChange(newValue === null ? undefined : newValue)
			}
			forcePopupIcon={false}
			onInputChange={(_, newInput) => {
				// Only trigger search if input is at least 3 characters
				if (newInput.length >= 3 || newInput.length === 0) {
					handleInputChange(newInput);
				} else {
					handleInputChange('');
				}
			}}
			isOptionEqualToValue={(option: SearchBoxOption, val: SearchBoxOption) =>
				option.value === val.value
			}
			renderOption={(props, option: SearchBoxOption) => {
				const { key, ...optionProps } = props;
				const keyLabel = `${key}_${props.id}`;
				return (
					<li
						{...optionProps}
						key={`${keyLabel}_list_item`}
						style={{ display: 'flex', alignItems: 'center', gap: 8 }}
						role='option'
						aria-label={option.label}
					>
						<PersonAvatar
							key={`${keyLabel}_avatar`}
							person={option}
							size={28}
						/>
						<span key={`${keyLabel}_label`}>{option.label}</span>
					</li>
				);
			}}
			renderInput={params => (
				<TextField label={label} variant='outlined' {...params} />
			)}
			fullWidth
			clearOnEscape
			aria-label={label}
		/>
	);
};

export default SearchBox;
