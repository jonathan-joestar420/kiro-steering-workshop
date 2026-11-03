---
inclusion: always
---

# 公司開發規範（範例）

本檔是團隊共用的開發規範範例。正式導入時，請替換為公司實際規範。

## 語言與風格

- 使用者介面與註解使用繁體中文；程式識別字使用英文。
- 使用原生 Node.js（ES Modules，`.mjs` 或 `"type": "module"`），不新增外部套件，除非需求明確要求。
- 函式保持單一職責；新增公開函式時補 JSDoc 說明參數與回傳值。

## 測試

- 每個新功能或修正都要在 `test/` 新增或更新測試，使用 `node:test` 與 `node:assert/strict`。
- 修正 Bug 時，先寫出能重現問題的失敗測試，再修改程式。
- 不得刪除或放寬既有測試斷言來讓測試通過。
- 完成前執行 `npm run check`，全部通過才回報完成。

## Git 與交付

- 不直接在 `main` 開發；每個任務使用 `feature/<簡短描述>` 分支。
- Commit 訊息使用 Conventional Commits，例如 `feat: 新增折扣計算`、`fix: 修正負數金額`。
- 推上 GitHub 後由 Pull Request 與 CI（測試、CodeQL）把關，通過審核才合併。
