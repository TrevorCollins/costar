'use client';
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme/theme';
import ErrorBoundary from '../components/ErrorBoundary';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<ErrorBoundary>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						{children}
					</ThemeProvider>
				</ErrorBoundary>
			</body>
		</html>
	);
}
