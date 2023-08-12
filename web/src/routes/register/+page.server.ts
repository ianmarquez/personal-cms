import { generateUsername } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const body: RegisterUserFormData = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
			passwordConfirm: string;
			name: string;
		};

		const username = generateUsername(body.name);

		try {
			await locals.pb.collection('users').create({ username, ...body });
			await locals.pb.collection('users').requestVerification(body.email);
		} catch (err) {
			console.error('Registration Error:', err);
			throw error(500, 'Something went wrong');
		}

		throw redirect(303, '/login');
	}
};
