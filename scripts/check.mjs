// 公司檢查：執行全部測試，並掃描是否有寫死的秘密。
// 本機 Hook 與 GitHub Actions 都呼叫這支程式，確保兩邊規則一致。
import { spawnSync, execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';

const SECRET_PATTERNS = [
  { name: 'AWS Access Key', re: /AKIA[0-9A-Z]{16}/ },
  { name: 'GitHub Token', re: /gh[pousr]_[A-Za-z0-9]{36,}/ },
  { name: 'Private Key', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { name: '寫死的密碼或金鑰', re: /(password|passwd|secret|api[_-]?key)\s*[:=]\s*['"][^'"\s]{6,}['"]/i },
];
// 規則本身與教學文件中的示範字串不掃描。
const isSkipped = (file) => file === 'scripts/check.mjs' || file.startsWith('docs/');

function listFiles() {
  try {
    const out = execFileSync('git', ['ls-files', '-co', '--exclude-standard'], { encoding: 'utf8' });
    return out.split('\n').filter(Boolean);
  } catch {
    return ['src', 'test'].flatMap((dir) => {
      try {
        return execFileSync('find', [dir, '-type', 'f'], { encoding: 'utf8' }).split('\n').filter(Boolean);
      } catch {
        return [];
      }
    });
  }
}

function scanSecrets() {
  const findings = [];
  for (const file of listFiles()) {
    if (isSkipped(file)) continue;
    let text;
    try {
      if (statSync(file).size > 1_000_000) continue;
      text = readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    text.split('\n').forEach((line, i) => {
      for (const { name, re } of SECRET_PATTERNS) {
        if (re.test(line)) findings.push(`${file}:${i + 1} ${name}`);
      }
    });
  }
  return findings;
}

const tests = spawnSync(process.execPath, ['--test'], { stdio: 'inherit' });
const findings = scanSecrets();

if (findings.length > 0) {
  console.error('\n[check] 發現疑似寫死的秘密，請改用環境變數：');
  for (const f of findings) console.error(`  - ${f}`);
}

if (tests.status !== 0 || findings.length > 0) {
  console.error('\n[check] 未通過');
  process.exit(1);
}
console.log('\n[check] 測試與秘密掃描全部通過');
