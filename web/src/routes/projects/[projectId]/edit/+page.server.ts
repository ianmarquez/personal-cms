import type { ProjectsResponse } from '$lib/types/pocketbase-types';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals, params }) => {
	const projectId = params.projectId;
	const getProject = async (projectId: string) => {
		if (!locals.pb.authStore.isValid || locals.user === null) {
			throw redirect(303, '/login');
		}

		try {
			const project = structuredClone(
				await locals.pb.collection('projects').getOne<ProjectsResponse>(projectId)
			);
			if (locals.user.id === project.user) {
				return project;
			} else {
				throw error(403, 'You are not authorized to edit this project');
			}
		} catch (err: any) {
			console.log(err);
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(
				err.status || 400,
				err.message || 'An error has occurred fethching project with id:' + projectId
			);
		}
	};
	return {
		project: getProject(projectId)
	};
};

export const actions: Actions = {
	updateProject: async ({ request, locals, params }) => {
		const formData = await request.formData();
		const thumbnail = formData.get('thumbnail') as File;
		if (!params.projectId) throw error(400, 'Project ID is required');

		if (thumbnail.size === 0) {
			formData.delete('thumbnail');
		}

		try {
			await locals.pb.collection('projects').update(params.projectId, formData);
		} catch (err: any) {
			console.error(err);
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(
				err.status || 400,
				err.message || 'An error has occurred updating project with id:' + params.projectId
			);
		}

		throw redirect(303, `/projects/${params.projectId}`);
	},
	deleteThumbnail: async ({ params, locals }) => {
		if (!params.projectId) throw error(400, 'Project ID is required');
		try {
			await locals.pb.collection('projects').update(params.projectId, {
				thumbnail: null
			});
		} catch (err: any) {
			console.log(err);
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(
				err.status || 400,
				err.message || 'An error has occurred thumbnail of project with id:' + params.projectId
			);
		}
		return {
			success: true
		};
	}
};
