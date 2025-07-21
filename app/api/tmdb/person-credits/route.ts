import { NextRequest, NextResponse } from 'next/server';
import { getPersonCombinedCredits } from '../../../../lib/tmdb';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const personId = Number(searchParams.get('personId'));
	if (!personId) {
		return NextResponse.json(
			{ error: 'Missing or invalid personId' },
			{ status: 400 }
		);
	}
	try {
		const results = await getPersonCombinedCredits(personId);
		return NextResponse.json({ results });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
