/*
 * E2E-проверка мобильного меню (адаптив).
 *
 * Что проверяем:
 *  1. При открытии меню КОНТЕНТ не сдвигается (движется только панель).
 *  2. Бургер превращается в крестик и закрывает меню.
 *  3. Все пункты панели кликабельны — ни один не перекрыт крестиком.
 *  4. Тап по затемнению (overlay) закрывает меню.
 *
 * Требует запущенный preview-сервер.
 * Запуск:  npm run check:mobile
 *
 * Браузер берётся системный (Edge/Chrome) через puppeteer-core —
 * отдельный Chromium не скачивается.
 */
const puppeteer = require("puppeteer-core");

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:4173/index.html";
const EDGE_PATHS = [
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const CHROME_PATHS = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function findBrowser() {
    const fs = require("fs");
    const all = [...EDGE_PATHS, ...CHROME_PATHS];
    const found = all.find((p) => fs.existsSync(p));
    if (!found) {
        throw new Error("Не найден Edge/Chrome. Укажите путь в переменной окружения BROWSER_PATH.");
    }
    return process.env.BROWSER_PATH || found;
}

const results = [];
function check(name, ok, extra) {
    results.push({ name, ok, extra });
    console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? "  [" + extra + "]" : ""}`);
}

async function main() {
    const browser = await puppeteer.launch({
        executablePath: findBrowser(),
        headless: "new",
        args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    await page.goto(BASE_URL + "#/", { waitUntil: "networkidle0" });
    await sleep(400);

    const snap = () =>
        page.evaluate(() => {
            const q = (s) => document.querySelector(s);
            return {
                open: document.body.classList.contains("navPanel-visible"),
                wrapperLeft: Math.round(q("#page-wrapper").getBoundingClientRect().left),
                icon: (() => {
                    const t = q("#navButton .toggle");
                    const c = getComputedStyle(t, "::before").content.replace(/"/g, "");
                    return [...c].map((ch) => ch.codePointAt(0).toString(16)).join(" ");
                })(),
            };
        });

    // --- 1. Открытие: контент не двигается ---
    const before = await snap();
    await page.click("#navButton .toggle");
    await sleep(600);
    const afterOpen = await snap();

    check("меню открылось", afterOpen.open === true);
    check(
        "контент не сдвигается при открытии",
        before.wrapperLeft === afterOpen.wrapperLeft,
        `left ${before.wrapperLeft} -> ${afterOpen.wrapperLeft}`,
    );
    check("иконка стала крестиком", afterOpen.icon === "f00d", `content U+${afterOpen.icon}`);

    // --- 2. Все пункты панели реально кликабельны (hit-test по центру) ---
    const linksHit = await page.evaluate(() => {
        const out = [];
        document.querySelectorAll("#navPanel a.link").forEach((a) => {
            const r = a.getBoundingClientRect();
            const x = r.left + r.width / 2;
            const y = r.top + r.height / 2;
            const hit = document.elementFromPoint(x, y);
            const clickable = hit === a || a.contains(hit);
            out.push({
                text: a.textContent.trim().slice(0, 24),
                top: Math.round(r.top),
                clickable,
                hitTag: hit ? hit.tagName + "." + hit.className : null,
            });
        });
        return out;
    });

    check("в панели есть пункты", linksHit.length > 0, `${linksHit.length} шт.`);
    linksHit.forEach((l) => {
        check(`пункт кликабелен: "${l.text}"`, l.clickable, `top=${l.top} hit=${l.hitTag}`);
    });

    // --- 3. Клик по крестику закрывает меню ---
    await page.evaluate(() => {
        const b = document.querySelector("#navButton .toggle");
        const r = b.getBoundingClientRect();
        const hit = document.elementFromPoint(r.left + 32, r.top + 22);
        if (hit === b || b.contains(hit)) b.click();
    });
    await sleep(600);
    const afterClose = await snap();
    check("крестик закрывает меню", afterClose.open === false);
    check("иконка снова гамбургер", afterClose.icon === "f0c9", `content U+${afterClose.icon}`);
    check("контент не сдвинулся после закрытия", afterClose.wrapperLeft === before.wrapperLeft);

    // --- 4. Переход по первому пункту (ранее перекрытому) ---
    await page.click("#navButton .toggle");
    await sleep(600);
    const firstLinkText = await page.evaluate(() => {
        const a = document.querySelector("#navPanel a.link");
        const r = a.getBoundingClientRect();
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        const ok = hit === a || a.contains(hit);
        if (ok) a.click();
        return { text: a.textContent.trim(), clicked: ok };
    });
    await sleep(600);
    const afterNav = await snap();
    check(`клик по первому пункту "${firstLinkText.text}" сработал`, firstLinkText.clicked && afterNav.open === false);

    // --- 5. Закрытие по overlay ---
    await page.click("#navButton .toggle");
    await sleep(500);
    const overlayOk = await page.evaluate(() => {
        const o = document.querySelector("#navOverlay");
        if (!o) return false;
        o.click();
        return true;
    });
    await sleep(500);
    check("overlay закрывает меню", overlayOk && (await snap()).open === false);

    // На Windows puppeteer 13 иногда падает при удалении временного профиля
    // (EPERM). Это НЕ провал проверок — глушим и закрываем принудительно.
    try {
        await browser.close();
    } catch (_) {
        /* игнорируем EPERM при очистке профиля */
    }

    const failed = results.filter((r) => !r.ok);
    console.log(`\nИтого: ${results.length - failed.length}/${results.length} проверок пройдено.`);
    if (failed.length) {
        console.log("Провалено:");
        failed.forEach((f) => console.log(" - " + f.name + (f.extra ? " [" + f.extra + "]" : "")));
        process.exit(1);
    }
    // Принудительный выход: не даём «хвостам» puppeteer поменять код возврата.
    process.exit(0);
}

main().catch((e) => {
    console.error("FATAL:", e.message);
    process.exit(1);
});
