# 第 1 步：設定專案模板

目標：取得已內建公司規範與 Hook 的專案，用 Kiro 開啟後確認設定已載入。

## 1. 從模板建立自己的 repo

在 GitHub 開啟本 repo，按 **Use this template → Create a new repository**。
只想在本機練習時，也可以直接 clone：

```bash
git clone https://github.com/jonathan-joestar420/kiro-steering-workshop.git
cd kiro-steering-workshop
```

## 2. 用 Kiro 開啟

Kiro IDE：**File → Open Folder**，選 `kiro-steering-workshop` 這一層。

## 3. 確認設定已載入

打開左側 Kiro 面板：

| 區塊 | 應看到 | 用途 |
|---|---|---|
| Steering | `company-standards`、`security` | 公司開發規範與安全規範 |
| Agent Hooks | `test-on-save`、`push-on-stop` | 改檔自動檢查、完成後詢問是否推上 GitHub |

在終端機執行一次檢查，確認環境正常：

```bash
npm run check
```

預期看到 5 項測試通過，以及 `[check] 測試與秘密掃描全部通過`。

## 4.（選做）安裝總部全域規範

```bash
sh global-steering/install.sh
```

這會把 `hq-standards.md` 放到 `~/.kiro/steering/`，對電腦上所有專案生效。
企業正式導入時，改由 MDM 或群組原則派送同一份檔案。

## 為什麼 pull 下來就生效

`.kiro/steering/` 與 `.kiro/hooks/` 是專案的一部分，跟著 Git 一起版本控管。
總部更新規範後，開發者 `git pull` 就會拿到新版本，不需要每個人手動設定。

下一步：[第 2 步：讓 Steering 自動套用規範](02-steering.md)
