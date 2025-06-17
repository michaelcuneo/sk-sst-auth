import type { Actions } from './$types';
import { Resource } from 'sst';

export const actions = {
	async magicLinks({ request }: { request: Request }) {
		// Extract the form data from the request
		const formData = await request.formData();
		// Get the email from the form data
		const email = formData.get('email')?.toString();

		// If email is not provided, return an error response
		if (!email) {
			return { success: false, error: 'Email is required' };
		}

		// Fetch the user using the email
		const userResponse = await fetch(`${Resource.api.url}/user/getUserByEmail/${email}`);
		// Parse the response to JSON
		const user = await userResponse.json();

		// If user does not exist, return an error response
		if (!user) {
			return { success: false, error: 'User does not exist' };
		}

		// Send a POST request to the magic link endpoint
		const magicLinkResponse = await fetch(
			`${Resource.api.url}/auth/magicLink/authorize?email=${email}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' }
			}
		);

		// If the request was not successful, return an error response
		if (!magicLinkResponse.ok) {
			return { success: false, error: 'Failed to send magic link' };
		}

		// Return a success response
		return { success: true, error: null };
	}
} satisfies Actions;
