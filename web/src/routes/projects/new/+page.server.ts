import { projectSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
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
		const body = await request.formData();

		const thumb = body.get('thumbnail') as File;
		if (thumb.size === 0) {
			body.delete('thumbnail');
		}
		body.append('user', locals.user.id);

		const { formData, errors } = await validateData<ProjectFormData>(body, projectSchema);
		if (errors) {
			delete formData.thumbnail;
			if (errors.fieldErrors.user) {
				throw redirect(303, '/login');
			}
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

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
