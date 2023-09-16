import type { ProjectsResponse } from '$lib/types/pocketbase-types';
import { error } from 'console';
import { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals, params }) => {
	const getProject = async (projectId: string) => {
		try {
			const project = structuredClone(
				await locals.pb.collection('projects').getOne<ProjectsResponse>(projectId)
			);
			return structuredClone(project);
		} catch (err: unknown) {
			console.log(err);
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(400, 'An error has occurred fethching project with id:' + projectId);
		}
	};
	return {
		project: getProject(params.projectId)
	};
};
