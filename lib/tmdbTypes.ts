export enum TMDBMediaType {
	Movie = 'movie',
	TV = 'tv',
}

// TMDB person search result
export interface TMDBPerson {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	known_for?: TMDBKnownFor[];
	total_pages: number;
	total_results: number;
}

// TMDB combined credit (movie or TV)
export interface TMDBCredit {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date?: string; // movie
	first_air_date?: string; // tv
	title?: string; // movie
	video: boolean;
	vote_average: number;
	vote_count: number;
	character?: string;
	name?: string; // tv
	job?: string;
	department?: string;
	credit_id: string;
	order: number;
	media_type: TMDBMediaType;
}

interface TMDBKnownFor {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title?: string; // movie
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string | null;
	media_type: TMDBMediaType;
	genre_ids: number[];
	popularity: number;
	release_date?: string; // movie
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface TMDBPersonSearchResult {
	page: number;
	results: TMDBPerson[];
	total_pages: number;
	total_results: number;
}

export interface TMDBPersonCreditsResult {
	cast: TMDBCredit[];
	crew: TMDBCredit[];
	id: number;
}
