/*
 * Запускалка E2E-проверки мобильного меню.
 * Сама поднимает `vite preview`, ждёт готовности, гоняет тест и гасит сервер.
 * Так не нужно вручную держать preview и не зависим от занятости порта.
 */
const { spawn, execSync } = require("child_process");
const http = require("http");
const path = require("path");

const PORT = Number(process.env.PORT || 4173);
const HOST = "127.0.0.1"; // явный IPv4: на Node 18+ localhost может резолвиться в IPv6
const URL = `http://${HOST}:${PORT}/index.html`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function waitFor(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on("error", () => {
        if (Date.now() > deadline) reject(new Error("Сервер не поднялся: " + url));
        else setTimeout(tick, 300);
      });
    };
    tick();
  });
}

(async () => {
  const isWin = process.platform === "win32";

  // Запускаем Vite CLI напрямую через node (без .cmd и без shell),
  // чтобы не зависеть от обёрток npm на Windows и от DEP0190.
  const viteCli = path.join(__dirname, "..", "..", "node_modules", "vite", "bin", "vite.js");
  const server = spawn(
    process.execPath,
    [viteCli, "preview", "--host", HOST, "--port", String(PORT), "--strictPort"],
    { stdio: "ignore" }
  );

  let code = 1;
  try {
    await waitFor(URL, 30000);
    const test = spawn(process.execPath, [path.join(__dirname, "mobile-menu.cjs")], {
      stdio: "inherit",
      env: { ...process.env, BASE_URL: URL },
    });
    code = await new Promise((res) => test.on("exit", res));
  } catch (e) {
    console.error("FATAL:", e.message);
  } finally {
    try {
      server.kill();
    } catch (_) {}
    if (isWin) {
      // на Windows дочерние процессы vite могут остаться — добиваем по порту
      try {
        execSync(
          `powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort ${PORT} -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"`,
          { stdio: "ignore" }
        );
      } catch (_) {}
    }
  }
  process.exit(code || 0);
})();
