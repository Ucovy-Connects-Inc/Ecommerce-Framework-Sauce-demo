// utils/waitUtils.ts
import { Page, Locator } from '@playwright/test';

export class WaitUtils {
    // Wait time constants (ms)
    static SHORT = 150000;
    static MEDIUM = 110000;
    static LONG = 130000;
    static PAGE_LOAD = 160000;

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url, { timeout: WaitUtils.PAGE_LOAD });
    }

    async waitForLoadState(
        state: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle',
    ) {
        await this.page.waitForLoadState(state, { timeout: WaitUtils.PAGE_LOAD });
    }

    async waitForVisible(locator: Locator, timeout: number = WaitUtils.MEDIUM) {
        await locator.waitFor({ state: 'visible', timeout });
    }

    async waitForHidden(locator: Locator, timeout: number = WaitUtils.MEDIUM) {
        await locator.waitFor({ state: 'hidden', timeout });
    }

    async clickWithWait(locator: Locator, timeout: number = WaitUtils.SHORT) {
        await locator.click({ timeout });
    }

    async fillWithWait(locator: Locator, value: string, timeout: number = WaitUtils.MEDIUM) {
        await locator.fill(value, { timeout });
    }
}
