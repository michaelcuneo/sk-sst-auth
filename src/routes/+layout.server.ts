import type { LayoutServerLoad } from './$types';
// import { Resource } from 'sst';

export const load = (async ({ locals }) => {
	return {
		authenticated: locals.session !== undefined
	};
}) satisfies LayoutServerLoad;
