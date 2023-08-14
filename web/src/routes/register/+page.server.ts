import { generateUsername } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { Actions, PageServerLoad } from './$types';

export type OutputType = {
	authProviderRedirect: string;
	authProviderState: string;
};

export const load: PageServerLoad<OutputType> = async ({ locals, url }) => {
	const authMethods = await locals.pb.collection('users').listAuthMethods();
	if (!authMethods) {
		return {
			authProviderState: '',
			authProviderRedirect: ''
		};
	}
	const redirectUrl = `${url.origin}/oauth`;
	const [authProvider] = authMethods.authProviders.filter((item) => item.name === 'discord');
	const authProviderRedirect = `${authProvider.authUrl}${redirectUrl}`;
	const state = authProvider.state;

	return {
		authProviderState: state,
		authProviderRedirect
	};
};

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const body: RegisterUserFormData = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
			passwordConfirm: string;
			name: string;
			username: string;
		};

		const username = generateUsername(body.name);
		body.username = username;

		try {
			await locals.pb.collection('users').create(body);
			await locals.pb.collection('users').requestVerification(body.email);
		} catch (err: unknown) {
			const clientResponseErr = err as ClientResponseError;
			console.error('Registration Error:');
			console.table(clientResponseErr.data);
			throw error(clientResponseErr.status, clientResponseErr.response.message);
		}

		throw redirect(303, '/login');
	},
	OAuthDiscord: async ({ locals, url, cookies }) => {
		let authProviderRedirect: string = '';
		try {
			const authMethods = await locals.pb.collection('users').listAuthMethods();
			if (!authMethods) {
				return {
					authProviders: ''
				};
			}
			const redirectUrl = `${url.origin}/oauth`;
			const [authProvider] = authMethods.authProviders.filter((item) => item.name === 'discord');
			if (!authProvider) return { authProviders: '' };
			authProviderRedirect = `${authProvider.authUrl}${redirectUrl}`;

			const { state, codeVerifier } = authProvider;
			console.log(authProvider);
			console.log(authProviderRedirect);
			cookies.set('state', state);
			cookies.set('codeVerifier', codeVerifier);
		} catch (err: any) {
			const clientResponseErr = err as ClientResponseError;
			if (err satisfies ClientResponseError) {
				console.error('Registration Via Discord Error:');
				console.table(structuredClone(clientResponseErr));
				throw error(clientResponseErr.status, err.message);
			}
			throw error(500, 'An Error has occured');
		}
		throw redirect(302, authProviderRedirect);
	}
};
