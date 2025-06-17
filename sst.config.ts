// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'sk-sst-auth',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			protect: ['production'].includes(input?.stage),
			home: 'aws'
		};
	},
	async run() {
		const auth = new sst.aws.Auth('MyAuth', {
			issuer: 'auth/index.handler'
		});
		const web = new sst.aws.SvelteKit('MyWeb', {
			link: [auth]
		});

		return {
			MyWeb: web.url
		};
	}
});
