import { error, type Actions, redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export const actions: Actions = {
	updateEmail: async ({ request, locals }) => {
		if (!locals.user || !locals.pb.authStore.isValid) throw redirect(303, '/login');
		const data = Object.fromEntries(await request.formData()) as { email: string };
		try {
			await locals.pb.collection('users').requestEmailChange(data.email);
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
		const data = Object.fromEntries(await request.formData()) as { username: string };

		let userWithUserNameExists: boolean = false;

		try {
			await locals.pb.collection('users').getFirstListItem(`username = "${data.username}"`);
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
			throw error(400, `User with username:${data.username} already exists!`);

		try {
			const { username } = await locals.pb
				.collection('users')
				.update(locals.user.id, { username: data.username });
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
