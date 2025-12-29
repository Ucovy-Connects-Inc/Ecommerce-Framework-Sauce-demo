// utils/waitUtils.ts
import { Page, Locator } from '@playwright/test';

/**
 * Timeout strategy (Playwright already auto-waits):
 * SHORT  – fast UI actions
 * MEDIUM – normal page transitions
 * LONG   – rare slow operations
 */
export class WaitUtils {
    static readonly SHORT = 2_000;
    static readonly MEDIUM = 5_000;
    static readonly LONG = 15_000;
    static readonly PAGE_LOAD = 20_000;

    constructor(private readonly page: Page) { }

    async waitForVisible(locator: Locator, timeout = WaitUtils.MEDIUM) {
        await locator.waitFor({ state: 'visible', timeout });
    }

    async click(locator: Locator, timeout = WaitUtils.SHORT) {
        await locator.click({ timeout });
    }

    async fill(locator: Locator, value: string, timeout = WaitUtils.MEDIUM) {
        await locator.fill(value, { timeout });
    }
}
