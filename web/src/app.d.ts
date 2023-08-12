// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: import('pocketbase').default;
			user: import('pocketbase').default['authStore']['model'];
		}
		// interface PageData {}
		// interface Platform {}
	}
	declare class LayoutData {
		user: import('pocketbase').default['authStore']['model'];
	}
	declare class RegisterUserFormData {
		email: string;
		password: string;
		passwordConfirm: string;
		name: string;
	}
}

export {};
