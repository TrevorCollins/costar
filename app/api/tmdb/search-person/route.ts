import { NextRequest, NextResponse } from 'next/server';
import { searchPeople } from '../../../../lib/tmdb';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const query = searchParams.get('query') || '';
	try {
		const results = await searchPeople(query);
		return NextResponse.json({ results });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
