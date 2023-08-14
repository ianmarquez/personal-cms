import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { generateUsername } from '$lib/utils';

export const GET: RequestHandler = async ({ locals, url, cookies }) => {
	const redirectUrl = `${url.origin}/oauth`;
	const expectedState = cookies.get('state');
	const expectedVerifier = cookies.get('codeVerifier');

	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (expectedState !== state || expectedVerifier !== code) {
		expectedState !== state &&
			console.log('Returned State Does not Match Expected', expectedState, state);
		expectedVerifier !== code &&
			console.log('Returned code does not match expected', expectedVerifier, code);
		throw redirect(303, '/register');
	}

	try {
		await locals.pb
			.collection('users')
			.authWithOAuth2Code('discord', code || '', expectedVerifier || '', redirectUrl, {
				username: generateUsername('new_user')
			});
	} catch (err) {
		console.log(err);
	}

	throw redirect(303, '/');
};
