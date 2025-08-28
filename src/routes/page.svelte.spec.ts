import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
    it('should render buttons', async () => {
        render(Page);
        const btns = page.getByRole('button').all();
        expect(btns).toHaveLength(21);
    })
});