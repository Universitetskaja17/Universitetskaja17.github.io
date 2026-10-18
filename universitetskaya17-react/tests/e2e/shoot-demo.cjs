/*
 * Снимает раскадровку работы мобильного меню (серия PNG).
 * Запуск: node tests/e2e/shoot-demo.cjs  (нужен запущенный preview)
 * Результат: папка demo-shots/
 */
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:4173/index.html";
const OUT = path.join(process.cwd(), "demo-shots");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function findBrowser() {
  const cands = [
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ];
  return process.env.BROWSER_PATH || cands.find((p) => fs.existsSync(p));
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  // чистим старые кадры, чтобы раскадровка была актуальной
  for (const f of fs.readdirSync(OUT)) {
    if (f.endsWith(".png")) fs.unlinkSync(path.join(OUT, f));
  }

  const browser = await puppeteer.launch({
    executablePath: findBrowser(),
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 700, deviceScaleFactor: 1 });
  await page.goto(BASE_URL + "#/", { waitUntil: "networkidle0" });
  await sleep(500);

  let n = 1;
  const name = (label) => path.join(OUT, `${String(n++).padStart(2, "0")}-${label}.png`);
  const shot = async (label) => {
    const f = name(label);
    await page.screenshot({ path: f, fullPage: false }); // ровно экран
    console.log("saved", path.basename(f));
  };

  await shot("home-closed");

  // 1) Открыть меню — бургер стал крестиком.
  await page.click("#navButton .toggle");
  await sleep(650);
  await shot("menu-open-cross");

  // 2) Клик по пункту "Ссылки" — переход + меню закрылось.
  await page.evaluate(() => {
    const a = [...document.querySelectorAll("#navPanel a.link")].find((x) =>
      x.getAttribute("href").includes("links")
    );
    const r = a.getBoundingClientRect();
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    if (hit === a || a.contains(hit)) a.click();
  });
  await sleep(700);
  await shot("after-click-links-page");

  // 3) Проверяем, что ПЕРВЫЙ пункт ("Список телефонов") тоже кликабелен.
  await page.goto(BASE_URL + "#/", { waitUntil: "networkidle0" });
  await sleep(400);
  await page.click("#navButton .toggle");
  await sleep(650);
  const firstItem = await page.evaluate(() => {
    const a = document.querySelector("#navPanel a.link");
    const r = a.getBoundingClientRect();
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    const ok = hit === a || a.contains(hit);
    return { text: a.textContent.trim(), clickable: ok, top: Math.round(r.top) };
  });
  console.log("first item clickable:", JSON.stringify(firstItem));

  // 4) Закрыть крестиком.
  await page.evaluate(() => document.querySelector("#navButton .toggle").click());
  await sleep(650);
  await shot("closed-by-cross");

  // 5) Десктоп для контраста.
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await page.goto(BASE_URL + "#/", { waitUntil: "networkidle0" });
  await sleep(400);
  await shot("desktop");

  try { await browser.close(); } catch (_) {}
  console.log("\nГотово. Кадров:", n - 1, "->", OUT);
  process.exit(0);
})().catch((e) => {
  console.error("FATAL:", e.message);
  process.exit(1);
});
