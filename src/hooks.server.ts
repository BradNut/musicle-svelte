import type { Handle, ServerInit } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
import { sequence } from '@sveltejs/kit/hooks';
import { startServer } from '$lib/server/api';

const handleParaglide: Handle = i18n.handle();

export const init: ServerInit = async () => {
	await startServer();
};

export const handle: Handle = sequence(handleParaglide);
