import { error, type Actions, redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export const actions: Actions = {
	updatePassword: async ({ request, locals }) => {
		if (!locals.user) throw redirect(303, '/login');
		const data = Object.fromEntries(await request.formData()) as {
			password: string;
			passwordConfirm: string;
			oldPassword: string;
		};

		if (data.password !== data.passwordConfirm) throw error(400, 'Passwords do not match');
		if (data.password === data.oldPassword)
			throw error(400, 'New password cannot be the same as the old password');

		try {
			await locals.pb.collection('users').update(locals.user.id, data);
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
