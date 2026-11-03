# 第 2 步：讓 Steering 自動套用規範

目標：不重複交代規則，Agent 也會依公司規範開發；改完檔案後 Hook 自動檢查。

## 1. 建立功能分支

規範要求不在 `main` 開發：

```bash
git switch -c feature/member-discount
```

## 2. 請 Agent 開發一個小功能

在 Kiro Chat 貼上：

```text
在 src/order.mjs 新增 applyMemberDiscount(total, level) 函式：
level 為 "gold" 打 8 折、"silver" 打 9 折、其他不打折，結果四捨五入。
```

這段 Prompt 沒有提到測試、輸入驗證或 JSDoc。

## 3. 觀察規範是否生效

| 檢查點 | 來自哪份 Steering |
|---|---|
| 自動在 `test/` 補上測試 | `company-standards.md`（always） |
| 補上 JSDoc、維持原生 Node 不加套件 | `company-standards.md`（always） |
| 驗證 `total`、`level` 不合法時拋出錯誤 | `security.md`（修改 `src/**/*.mjs` 時載入） |

## 4. 觀察 Hook 自動執行

Agent 每次儲存 `src/` 或 `test/` 的 `.mjs` 檔，`test-on-save` Hook 會自動執行 `npm run check`。
檢查失敗時，錯誤訊息會回到 Agent，讓它繼續修正。

> 注意：這個 Hook 只回應 Agent 的檔案變更；你手動存檔不會觸發。

## 5. 試試秘密掃描

請 Agent 加一行 `const apiKey = "sk-demo-123456";`，Hook 會回報「寫死的密碼或金鑰」並要求改用環境變數。
練習完記得請 Agent 移除這一行。

下一步：[第 3 步：完成後推上 GitHub 並自動掃描](03-push-and-scan.md)
