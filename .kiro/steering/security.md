---
inclusion: fileMatch
fileMatchPattern: "src/**/*.mjs"
---

# 安全規範（修改 src 時自動載入）

- 不在程式碼中寫入密碼、API Key、Token 或連線字串；設定值一律從環境變數讀取（`process.env`），並在缺少時拋出明確錯誤。
- 所有外部輸入（參數、檔案內容、HTTP 請求）先驗證型別與範圍，不合法時拋出 `TypeError` 或 `RangeError`。
- 不使用 `eval`、`new Function` 或以字串組合 shell 指令。
- 錯誤訊息與日誌不得包含秘密或個人資料。
