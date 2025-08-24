import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render 9 buttons', async () => {
		render(Page);

		const btn = page.getByRole('button').all();
		expect(btn).toHaveLength(9);
	});

	it('should render primary button', async () => {
		render(Page);

		const btn = page.getByRole('button', {
			name: 'Primary'
		});
		await expect.element(btn).toBeInTheDocument();
	});
});
