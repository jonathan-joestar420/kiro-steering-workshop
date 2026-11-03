// 由 Kiro Stop Hook 呼叫（使用者確認後才執行）：
// 1. 拒絕在 main/master 推送  2. 先跑公司檢查  3. 提交變更  4. 推送目前分支
import { execFileSync, spawnSync } from 'node:child_process';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const fail = (msg) => {
  console.error(`[push] ${msg}`);
  process.exit(1);
};

let branch;
try {
  branch = git('rev-parse', '--abbrev-ref', 'HEAD');
} catch {
  fail('目前資料夾不是 Git 專案。');
}

if (['main', 'master', 'HEAD'].includes(branch)) {
  fail(`目前在 ${branch}，請先建立功能分支：git switch -c feature/<描述>`);
}

try {
  git('remote', 'get-url', 'origin');
} catch {
  fail('找不到 origin 遠端，請先設定 GitHub repo。');
}

const check = spawnSync(process.execPath, ['scripts/check.mjs'], { stdio: 'inherit' });
if (check.status !== 0) fail('公司檢查未通過，已停止推送。');

if (git('status', '--porcelain')) {
  git('add', '-A');
  git('commit', '-m', `chore(kiro): ${branch} 開發變更`);
}

execFileSync('git', ['push', '-u', 'origin', branch], { stdio: 'inherit' });
console.log(`[push] 已推送 ${branch}，請到 GitHub 開 Pull Request 查看 CI 與 CodeQL 結果。`);
