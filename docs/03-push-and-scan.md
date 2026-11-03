# 第 3 步：完成後推上 GitHub 並自動掃描

目標：Agent 完成工作後，一鍵把功能分支推上 GitHub，由 CI 與 CodeQL 自動檢查。

## 1. Agent 完成時，Kiro 會詢問

`push-on-stop` Hook 使用 `Stop` 觸發：Agent 完成一輪回覆後，Kiro 會跳出：

> 要把目前的功能分支推上 GitHub，交給 CI 與 Code Scan 檢查嗎？

選 **推上 GitHub** 才會執行；選 **先不要** 就繼續開發。

## 2. 推送前的保護

`scripts/push-branch.mjs` 依序執行：

1. 目前在 `main` 或 `master` 時拒絕推送，提示先建立功能分支。
2. 執行 `npm run check`，測試或秘密掃描失敗就停止。
3. 有未提交的變更時，自動 commit。
4. `git push -u origin <目前分支>`。

## 3. 在 GitHub 查看結果

推送後到 GitHub 開 Pull Request，會看到兩個檢查：

| Workflow | 內容 |
|---|---|
| `CI` | 執行同一支 `npm run check`（測試與秘密掃描） |
| `CodeQL` | GitHub 的程式碼安全掃描，結果在 **Security → Code scanning** |

本機與 CI 使用同一支檢查程式，避免「本機過了、CI 沒過」的落差。

## 4. 換成公司的 Code Scan 工具

在 `.github/workflows/ci.yml` 的 `npm run check` 之後新增步驟，例如 SonarQube、Checkmarx 或公司內部掃描器。
需要的 Token 放在 GitHub repo 的 **Settings → Secrets and variables → Actions**，不要寫進程式碼。

## 5. 建議的分支保護

在 GitHub **Settings → Branches** 為 `main` 加上規則：必須經過 Pull Request、`CI` 與 `CodeQL` 通過才能合併。
Steering 可以引導 Agent，但真正的把關點是 CI 與分支保護。

回到 [README](../README.md)
