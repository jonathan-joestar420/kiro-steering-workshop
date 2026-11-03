# Kiro Steering Workshop

團隊共用的 Kiro 專案範本：clone 下來就內建公司開發規範（Steering）、自動檢查（Hooks）與 GitHub Code Scan。

## 三步驟教學

1. [設定專案模板](docs/01-setup.md)：從模板建立專案，用 Kiro 開啟並確認規範已載入。
2. [讓 Steering 自動套用規範](docs/02-steering.md)：請 Agent 開發小功能，觀察規範與 Hook 自動生效。
3. [完成後推上 GitHub 並自動掃描](docs/03-push-and-scan.md)：一鍵推送功能分支，由 CI 與 CodeQL 檢查。

## 內容

```text
.kiro/
├── steering/
│   ├── company-standards.md   公司開發規範（每次對話都載入）
│   └── security.md            安全規範（修改 src/**/*.mjs 時載入）
└── hooks/
    ├── test-on-save.json      Agent 修改 src、test 後自動執行 npm run check
    └── push-on-stop.json      Agent 完成後詢問是否推上 GitHub
.github/workflows/
├── ci.yml                     測試與秘密掃描
└── codeql.yml                 CodeQL 程式碼安全掃描
global-steering/               總部全域規範範例與安裝腳本（~/.kiro/steering/）
scripts/                       check.mjs（公司檢查）、push-branch.mjs（推送保護）
src/、test/                    範例程式與測試（原生 Node.js，無外部套件）
```

## 需求

- [Kiro](https://kiro.dev/downloads/) IDE 或 CLI V3（`.kiro/hooks/*.json` 的檔案事件與 `Stop` 觸發在這兩者執行；Kiro Web 不執行）
- Node.js 20 以上
- Git 與 GitHub 帳號

## 規範派送方式

| 範圍 | 位置 | 派送方式 |
|---|---|---|
| 專案規範 | `<repo>/.kiro/steering/` | 跟著 repo 版本控管，`git pull` 取得更新 |
| 總部全域規範 | `~/.kiro/steering/` | MDM、群組原則，或執行 `global-steering/install.sh` |

兩者衝突時，Kiro 以專案規範為準。Steering 放在開發者電腦或 repo 中，使用者可以修改，因此強制把關應放在 CI 與分支保護。

## 參考文件

- [Steering](https://kiro.dev/docs/steering/)
- [Hooks](https://kiro.dev/docs/hooks/)、[Hook types](https://kiro.dev/docs/hooks/types/)
- [Enterprise governance](https://kiro.dev/docs/enterprise/governance/)

## License

MIT
