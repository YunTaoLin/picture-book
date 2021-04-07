## 簡介
- 包含完整前、後台的電商平台開源專案(模擬專案)。
- 後台管理系統code請[見此](https://github.com/YunTaoLin/picture-book-backstage)
- 後端Restful API請[見此](https://github.com/YunTaoLin/picture-book-server)

## 網站功能
1. 用戶進行註冊、登入，即可對商品進行追蹤、加入購物車並送出訂單(金流部份未實作)。
2. 支持在未登入狀態下將商品加入購物車，並在登入後與會員購物車做合併。
3. 會員可編輯自己的個人資料，在購物時進行快速輸入。
4. 具備後台系統，可新增編輯商品、管理訂單、管理會員資料等操作。

## 技術架構
1. 採取前後端分離架構，以Vue為核心的SPA網站
2. 前端：Vue 2.6.10 + Vue-router + Vuex + Boostrap4 + Scss
3. 後端：Express.js（Node.js）
4. 資料庫: MongoDB

## 網站入口
[點此進入](http://172.105.215.182:3000/)

## 部分截圖
前台首頁
![前台](https://i.imgur.com/c2kzQiL.png)

賣場
![賣場](https://i.imgur.com/d7LjKEC.png)

登入頁面
![登入](https://i.imgur.com/VzyBhID.png)

後台管理系統
![後台管理系統](https://i.imgur.com/DhX35uy.png)
