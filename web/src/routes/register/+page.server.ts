import { generateUsername } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { ClientResponseError } from 'pocketbase';

export const actions: Actions = {
	default: async ({ locals, request }) => {
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
	}
};
