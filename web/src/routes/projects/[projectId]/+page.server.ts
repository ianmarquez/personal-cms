import { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';
import { error } from 'console';

export const load: PageServerLoad = ({ locals, params }) => {
	const getProject = async (projectId: string) => {
		try {
			const project = structuredClone(await locals.pb.collection('projects').getOne(projectId));
			return project;
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
