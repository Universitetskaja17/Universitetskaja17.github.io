/*
 * Запускалка E2E-проверки мобильного меню.
 * Сама поднимает `vite preview`, ждёт готовности, гоняет тест и гасит сервер.
 * Так не нужно вручную держать preview и не зависим от занятости порта.
 */
const { spawn } = require("child_process");
const http = require("http");

const PORT = Number(process.env.PORT || 4173);
const URL = `http://127.0.0.1:${PORT}/index.html`;

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
  const npx = isWin ? "npx.cmd" : "npx";

  const server = spawn(npx, ["vite", "preview", "--port", String(PORT)], {
    stdio: "ignore",
    shell: isWin,
  });

  let code = 1;
  try {
    await waitFor(URL, 30000);
    const test = spawn(process.execPath, [require("path").join(__dirname, "mobile-menu.cjs")], {
      stdio: "inherit",
      env: { ...process.env, BASE_URL: URL },
    });
    code = await new Promise((res) => test.on("exit", res));
  } catch (e) {
    console.error("FATAL:", e.message);
  } finally {
    server.kill("SIGTERM");
    if (isWin) {
      // на Windows дочерние процессы vite могут остаться — добиваем по порту
      try {
        require("child_process").execSync(
          `powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort ${PORT} -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"`
        );
      } catch (_) {}
    }
  }
  process.exit(code || 0);
})();
