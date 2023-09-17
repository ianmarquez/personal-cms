import { registerUserSchema } from '$lib/schemas';
import { generateUsername, validateData } from '$lib/utils';
import { error, fail, redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { Actions, PageServerLoad } from './$types';

export type OutputType = {
	authProviderRedirect: string;
	authProviderState: string;
};

export const load: PageServerLoad<OutputType> = async ({ locals, url }) => {
	throw redirect(303, '/');
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
		const { formData, errors } = await validateData<RegisterUserFormData>(
			await request.formData(),
			registerUserSchema
		);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		const username = generateUsername(formData.name);
		formData.body.username = username;

		try {
			await locals.pb.collection('users').create(formData);
			await locals.pb.collection('users').requestVerification(formData.email);
		} catch (err: any) {
			console.log(err);
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(err.status || 400, err.message || 'An error has occurred registering user');
		}
		throw redirect(303, '/login');
	}
};
