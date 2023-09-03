import { error, redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user) throw redirect(303, '/login');
		const formData = await request.formData();

		const thumbnail = formData.get('thumbnail') as File;
		if (thumbnail.size === 0) {
			formData.delete('thumbnail');
		}

		formData.append('user', locals.user.id);

		try {
			await locals.pb.collection('projects').create(formData);
		} catch (err: unknown) {
			console.error(err);
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(400, 'An Error has occured creating your project');
		}

		throw redirect(303, '/my/projects');
	}
};
