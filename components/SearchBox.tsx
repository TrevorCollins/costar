import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

export interface SearchBoxOption {
	label: string;
	value: string | number;
	[key: string]: any;
}

interface SearchBoxProps {
	label: string;
	value: SearchBoxOption | undefined;
	options: SearchBoxOption[];
	loading?: boolean;
	onChange: (value: SearchBoxOption | undefined) => void;
	onInputChange: (input: string) => void;
	onClear: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
	label,
	value,
	options,
	loading = false,
	onChange,
	onInputChange,
	onClear,
}) => {
	return (
		<Autocomplete
			value={value}
			options={options}
			loading={loading}
			getOptionLabel={option => option.label}
			onChange={(_, newValue) => onChange(newValue)}
			onInputChange={(_, newInput) => {
				// Only trigger search if input is at least 3 characters
				if (newInput.length >= 3 || newInput.length === 0) {
					onInputChange(newInput);
				} else {
					onInputChange('');
				}
			}}
			isOptionEqualToValue={(option, val) => option.value === val.value}
			renderOption={(props, option) => (
				<li {...props} key={option.value}>
					{option.label}
				</li>
			)}
			renderInput={params => (
				<TextField
					{...params}
					label={label}
					variant='outlined'
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<InputAdornment position='end'>
								{value ? (
									<IconButton
										aria-label='clear search'
										onClick={onClear}
										edge='end'
										size='small'
									>
										<ClearIcon />
									</IconButton>
								) : null}
								{params.InputProps.endAdornment && null}
							</InputAdornment>
						),
					}}
				/>
			)}
			fullWidth
			clearOnEscape
			disableClearable
		/>
	);
};

export default SearchBox;
