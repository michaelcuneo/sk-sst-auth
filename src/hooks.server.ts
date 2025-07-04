import { type Handle } from '@sveltejs/kit';
import { createAuthClient, setTokens } from '$lib/auth.server.js';
import { subjects } from '../auth/subjects.js';

export const handle: Handle = async ({ event, resolve }) => {
	const client = createAuthClient(event);
	const theme = event.cookies.get('theme');
	const themes = ['light', 'dark', 'system'];

	if (!theme || !themes.includes(theme)) {
		return await resolve(event);
	}

	try {
		const accessToken = event.cookies.get('access_token');
		if (accessToken) {
			const refreshToken = event.cookies.get('refresh_token');
			const verified = await client.verify(subjects, accessToken, {
				refresh: refreshToken
			});
			if (!verified.err) {
				if (verified.tokens) setTokens(event, verified.tokens.access, verified.tokens.refresh);
				event.locals.session = verified.subject.properties;
			}
		} else {
			event.locals.session = undefined;
		}
	} catch (e) {
		console.error('Error verifying token:', e);
	}

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('data-theme=""', `data-theme="${theme}"`);
		}
	});
	return response;
};
