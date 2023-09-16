import { updateEmailSchema, updateUsernameSchema } from '$lib/schemas';
import type { UsersResponse } from '$lib/types/pocketbase-types';
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
	updateEmail: async ({ request, locals }) => {
		if (!locals.user || !locals.pb.authStore.isValid) throw redirect(303, '/login');
		const { formData, errors } = await validateData<{
			email: UsersResponse['email'];
			username: UsersResponse['username'];
		}>(await request.formData(), updateEmailSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('users').requestEmailChange(formData.email);
		} catch (err: unknown) {
			console.log(err);
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(400, 'Something went wrong changing your email');
		}

		return {
			success: true
		};
	},
	updateUsername: async ({ request, locals }) => {
		if (!locals.user || !locals.pb.authStore.isValid) throw redirect(303, '/login');

		const { formData, errors } = await validateData<{
			email: UsersResponse['email'];
			username: UsersResponse['username'];
		}>(await request.formData(), updateUsernameSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		let userWithUserNameExists = false;

		try {
			await locals.pb.collection('users').getFirstListItem(`username = "${formData.username}"`);
			userWithUserNameExists = true;
		} catch (err: unknown) {
			if (err instanceof ClientResponseError && err.status === 404) {
				userWithUserNameExists = false;
			} else {
				console.error(err);
				throw error(400, `An error has occured checking if user already exists.`);
			}
		}

		if (userWithUserNameExists)
			throw error(400, `User with username:${formData.username} already exists!`);

		try {
			const { username } = await locals.pb
				.collection('users')
				.update(locals.user.id, { username: formData.username });
			locals.user.username = username;
			return { success: true };
		} catch (err: unknown) {
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(400, 'Something went wrong changing username');
		}
	}
};
