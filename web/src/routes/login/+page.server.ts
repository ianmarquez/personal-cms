import { loginUserSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { error, fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const { formData, errors } = await validateData<LoginFormData>(
			await request.formData(),
			loginUserSchema
		);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			const { email, password } = formData;
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
			throw error(
				clientResponseErr.status || 400,
				clientResponseErr.response.message || 'An Error has occurred while logging in'
			);
		}

		throw redirect(303, '/');
	}
};
