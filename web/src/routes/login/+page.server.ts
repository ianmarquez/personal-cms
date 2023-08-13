import { error, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const { email, password }: LoginFormData = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
		};

		try {
			await locals.pb.collection('users').authWithPassword(email, password);
			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err: unknown) {
			const clientResponseErr = err as ClientResponseError;
			console.error('Login Error:');
			console.table(structuredClone(clientResponseErr.data));
			throw error(clientResponseErr.status, clientResponseErr.response.message);
		}

		throw redirect(303, '/');
	}
};
