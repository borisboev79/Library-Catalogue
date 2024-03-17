const { test, expect } = require("@playwright/test");

test('Verify "All Books" link is visible', async ({ page }) => {
    await page.goto('http://localhost:3001');
    await page.waitForSelector('nav.navbar');

    const allBooksLink = await page.$('a[href="/catalog"]');

    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);

});

test('Verify "Login" button is visible', async ({ page }) => {
    await page.goto('http://localhost:3001');
    await page.waitForSelector('nav.navbar');

    const loginButton = await page.$('a[href="/login"]');

    const isLoginButtonVisible = await loginButton.isVisible();

    expect(isLoginButtonVisible).toBe(true);

});

test('Verify "Register" button is visible', async ({ page }) => {
    await page.goto('http://localhost:3001');
    await page.waitForSelector('nav.navbar');

    const loginButton = await page.$('a[href="/register"]');

    const isRegisterButtonVisible = await loginButton.isVisible();

    expect(isRegisterButtonVisible).toBe(true);

});

test('Verify "All Books" link is visible after user login', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const allBooksLink = await page.$('a[href="/catalog"]');

    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);

});

test('Verify "My Books" button is visible after user login', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const myBooksButton = await page.$('a[href="/profile"]');

    const isButtonVisible = await myBooksButton.isVisible();

    expect(isButtonVisible).toBe(true);

});

test('Verify "Add Book" link is visible after user login', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const addBookButton = await page.$('a[href="/create"]');

    const isButtonVisible = await addBookButton.isVisible();

    expect(isButtonVisible).toBe(true);

});

test('Verify "User Email Address" is visible after user login', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const userDiv = await page.$('#user');

    const spanContent = await userDiv.$('span');

    expect(spanContent).not.toBeNull();

    const welcomeText = await spanContent.textContent();
    
    expect(welcomeText).toBe('Welcome, peter@abv.bg');

});

test('Login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');

    expect(page.url()).toBe('http://localhost:3001/catalog');

});

test('Submit the form with Empty Input Fields', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();

    });

    await page.$('a[href="/login"]');

    expect(page.url()).toBe('http://localhost:3001/login');

});

test('Submit the form with Empty Email Input Field', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();

    });

    await page.$('a[href="/login"]');

    expect(page.url()).toBe('http://localhost:3001/login');

});

test('Submit the form with Empty Password Input Field', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();

    });

    await page.$('a[href="/login"]');

    expect(page.url()).toBe('http://localhost:3001/login');

});


