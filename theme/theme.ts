import { createTheme } from '@mui/material/styles';
import { deepPurple, teal, grey } from '@mui/material/colors';

const theme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#181A1B',
			paper: '#232526',
		},
		primary: {
			main: deepPurple[400],
		},
		secondary: {
			main: teal[400],
		},
		text: {
			primary: '#fff',
			secondary: grey[400],
		},
	},
	typography: {
		fontFamily: [
			'Inter',
			'Roboto',
			'Helvetica Neue',
			'Arial',
			'sans-serif',
		].join(','),
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
	shape: {
		borderRadius: 10,
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: 'none',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: 8,
				},
			},
		},
	},
});

export default theme;
