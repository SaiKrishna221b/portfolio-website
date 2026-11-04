import { defineConfig, devices } from '@playwright/test';
import process from 'node:process';

const chromium = { defaultBrowserType: 'chromium', launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {} };

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 1,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:5174', trace: 'retain-on-failure' },
  projects: [
    { name: 'iphone-se', use: { ...devices['iPhone SE'], ...chromium } },
    { name: 'iphone-13', use: { ...devices['iPhone 13'], ...chromium } },
    { name: 'iphone-landscape', use: { ...devices['iPhone 13 landscape'], ...chromium } },
    { name: 'tablet', use: { ...devices['iPad Mini'], ...chromium } },
    { name: 'iphone-14-pro-max', use: { ...devices['iPhone 14 Pro Max'], ...chromium } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], ...chromium } },
    { name: 'safari-iphone', use: { ...devices['iPhone 13'], defaultBrowserType: 'webkit' } },
  ],
  webServer: { command: 'npm run dev -- --host 127.0.0.1 --port 5174 --strictPort', url: 'http://127.0.0.1:5174', reuseExistingServer: false },
});
