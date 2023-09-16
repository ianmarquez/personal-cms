import { updatePasswordSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	updatePassword: async ({ request, locals }) => {
		if (!locals.user) throw redirect(303, '/login');

		const { formData, errors } = await validateData<{
			password: string;
			passwordConfirm: string;
			oldPassword: string;
		}>(await request.formData(), updatePasswordSchema);

		if (errors) {
			return fail(400, {
				errors: errors.fieldErrors
			});
		}

		if (formData.password !== formData.passwordConfirm) throw error(400, 'Passwords do not match');
		if (formData.password === formData.oldPassword)
			throw error(400, 'New password cannot be the same as the old password');

		try {
			await locals.pb.collection('users').update(locals.user.id, formData);
			locals.pb.authStore.clear();
		} catch (err: unknown) {
			console.log(err);
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(400, 'Something went wrong changing your password');
		}

		throw redirect(303, '/login');
	}
};
