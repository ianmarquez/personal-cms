import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../settings/$types';
import { ClientResponseError } from 'pocketbase';
import type { ProjectsResponse } from '$lib/types/pocketbase-types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.pb.authStore.isValid === false || !locals.user) {
		throw redirect(303, '/login');
	}

	const getUsersProjects = async (userId: string) => {
		try {
			const projects = await locals.pb
				.collection('projects')
				.getFullList<ProjectsResponse>(undefined, {
					filter: `user="${userId}"`
				});
			return structuredClone(projects);
		} catch (err: any) {
			console.log(err);
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(err.status || 400, err.message || 'An error has occurred fetching projects');
		}
	};

	return {
		projects: getUsersProjects(locals.user.id)
	};
};

export const actions: Actions = {
	deleteProject: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());

		try {
			if (!id) throw error(400, 'Project ID is required');
			await locals.pb.collection('projects').delete(id.toString());
		} catch (err: any) {
			console.log(err);
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(err.status || 400, err.message || 'An error has occurred deleting project');
		}
	}
};
