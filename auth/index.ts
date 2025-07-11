import { handle } from 'hono/aws-lambda';
import { issuer } from '@openauthjs/openauth';
import { CodeUI } from '@openauthjs/openauth/ui/code';
import { CodeProvider } from '@openauthjs/openauth/provider/code';
import { MemoryStorage } from '@openauthjs/openauth/storage/memory';
import { subjects } from './subjects';

import type { Theme } from '@openauthjs/openauth/ui/theme';

const MY_THEME: Theme = {
	primary: "#4A90E2",
	title: "SK-SST-AUTH",
	radius: "none",
	favicon: "https://www.example.com/favicon.svg",
};

async function getUser(email: string) {
	// Get user from database and return user ID
	console.log('Fetching user for email:', email);
	return '123';
}

const app = issuer({
	theme: MY_THEME,
	subjects,
	storage: MemoryStorage(),
	// Remove after setting custom domain
	allow: async () => true,
	providers: {
		code: CodeProvider(
			CodeUI({
				sendCode: async (email, code) => {
					console.log(email, code);
				}
			})
		)
	},
	success: async (ctx, value) => {
		if (value.provider === 'code') {
			return ctx.subject('user', {
				id: await getUser(value.claims.email)
			});
		}
		throw new Error('Invalid provider');
	}
});

export const handler = handle(app);
