# 🚀 Fix1099 手動部署包

## ✅ 正確的文件已準備好

這個目錄包含**正確的設計**（紫色卡片、立體陰影）：

```
deploy_package/
├── index.html (45KB) - 主頁
├── thank-you.html (8.7KB) - 感謝頁面
└── legal.html (14KB) - 法律頁面
```

---

## 📤 部署方法

### 方法 1: Vercel Web Interface（推薦）

1. **刪除所有舊項目**:
   - 登錄: https://vercel.com/jennifers-projects-1a57d39b
   - 刪除這些項目：fix1099, fix1099-bvp5, fix1099-18ny, fix1099-56ij, airapid2006-fix1099

2. **創建新項目**:
   - 訪問: https://vercel.com/new
   - 選擇 **Import Git Repository**
   - 選擇 `airapid2006/fix1099`
   - **重要設置**:
     ```
     Project Name: fix1099
     Framework: Other
     Root Directory: ./
     Build Command: (留空)
     Output Directory: ./
     ```
   - 點擊 **Deploy**

3. **驗證部署**:
   - 等待 2-3 分鐘
   - 訪問新的 URL (例如: https://fix1099-xxx.vercel.app)
   - 檢查文件大小（應該是 ~45KB）
   - 檢查是否有紫色卡片和立體陰影

4. **添加域名**:
   - Settings → Domains
   - 添加 `fix1099.com`

---

### 方法 2: 手動上傳（如果 Git 不工作）

1. **壓縮文件**:
   ```bash
   cd deploy_package
   zip -r fix1099-correct.zip .
   ```

2. **拖拽部署**:
   - 訪問: https://vercel.com/new
   - 選擇 **Browse** 上傳 ZIP
   - 或直接拖拽 `deploy_package/` 文件夾

---

### 方法 3: 從 Vercel Dashboard 重新連接

對於每個現有項目：

1. Settings → Git
2. 點擊 **Disconnect**
3. 重新連接到 `airapid2006/fix1099`
4. 選擇 **Production Branch: main**
5. 點擊 **Redeploy**

---

## 🔍 驗證清單

部署後檢查：

- [ ] 文件大小 ~45KB（不是 29KB）
- [ ] 有紫色卡片背景 (#f3f0ff)
- [ ] H1 標題有立體陰影
- [ ] 有紫色邊條
- [ ] 字體緊湊、不會太大
- [ ] Stripe 按鈕是 $299 和 $499

測試命令：
```bash
curl -s YOUR_VERCEL_URL | wc -c  # 應該顯示 ~45000
curl -s YOUR_VERCEL_URL | grep "text-shadow"  # 應該有輸出
```

---

## 📞 當前狀態

- ✅ GitHub 有正確文件（45KB）
- ❌ 所有 5 個 Vercel 項目都是舊版本（29KB）
- ✅ 本地預覽可用: https://8000-iwacxqnbuu7np9tbjjevk-583b4d74.sandbox.novita.ai

---

## 🎯 推薦操作

**最簡單的方法**：

1. 刪除所有 5 個舊 Vercel 項目
2. 創建全新項目，連接到 GitHub `airapid2006/fix1099`
3. 添加域名 `fix1099.com`

這樣可以確保沒有舊配置干擾！
