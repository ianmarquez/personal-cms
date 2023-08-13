import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { generateUsername } from '$lib/utils';

export const GET: RequestHandler = async ({ locals, url, cookies }) => {
	const redirectUrl = `${url.origin}/oauth`;
	const expectedState = cookies.get('state');
	const expectedVerifier = cookies.get('codeVerifier');

	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	const authMethods = await locals.pb.collection('users').listAuthMethods();
	if (!authMethods?.authProviders) {
		console.log('No valid auth providers set up');
		throw redirect(303, '/register');
	}

	const [authProvider] = authMethods.authProviders.filter(
		(provider) => provider.name === 'discord'
	);

	if (!authProvider) {
		console.log('Provider not found');
		throw redirect(303, '/register');
	}

	if (expectedState !== state) {
		console.log('Returned State Does not Match Expected', expectedState, state);
		throw redirect(303, '/register');
	}

	console.log(url.searchParams.toString());

	try {
		await locals.pb
			.collection('users')
			.authWithOAuth2Code(authProvider.name, code || '', expectedVerifier || '', redirectUrl, {
				username: generateUsername('new_user')
			});
	} catch (err) {
		console.log(err);
	}

	throw redirect(303, '/');
};
