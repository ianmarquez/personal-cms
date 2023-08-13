import { error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const { email }: ResetPasswordFormData = Object.fromEntries(await request.formData()) as {
			email: string;
		};

		try {
			await locals.pb.collection('users').requestPasswordReset(email);
			return {
				success: true
			};
		} catch (err: unknown) {
			const clientResponseErr = err as ClientResponseError;
			console.error('Reset Password Error');
			console.table(structuredClone(clientResponseErr.data));
			throw error(clientResponseErr.status, clientResponseErr.response.message);
		}
	}
};
