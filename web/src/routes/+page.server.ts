import type { ProjectsResponse } from '$lib/types/pocketbase-types';
import { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const getProjects = async () => {
		try {
			const projects = await locals.pb
				.collection('projects')
				.getFullList<ProjectsResponse>(undefined);
			return structuredClone(projects);
		} catch (error: any) {
			if (error instanceof ClientResponseError) {
				throw (error.status, error.message);
			}
			throw (error.status || 400, error.message || 'An error has occurred fetching projects');
		}
	};

	return {
		projects: getProjects()
	};
};
