import { resetPasswordSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { error, fail } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const { formData, errors } = await validateData<ResetPasswordFormData>(
			await request.formData(),
			resetPasswordSchema
		);

		if (errors) {
			return fail(400, {
				success: false,
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('users').requestPasswordReset(formData.email);
			return {
				success: true,
				data: formData
			};
		} catch (err: any) {
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(err.status || 400, err.message || 'Something went wrong resetting your password');
		}
	}
};
