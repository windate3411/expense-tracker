# 家庭記帳本 Household Expense tracker

這是一個簡易的家庭用記帳本

使用者可以透過本地登入、FB或是Google登入使用此APP。

登入後可以進行新增支出、編輯支出、刪除支出以及瀏覽各項支出等功能

提供兩個篩選器:支出分類以及月份，主畫面則會顯示篩選出來的支出以及對應的總額。

導入種子資料後，可透過以下兩個使用者做使用測試，每個使用者已放入三筆支出資料
Email:user1@example.com
pwd  :12345678
Email:user2@example.com
pwd  :12345678

## 專案預覽 Project preview

![expense-tracker](https://media.giphy.com/media/gjTKDgneIjcKRXpZJG/giphy.gif)

## 專案需求 Prerequisites

為了確保程式順利運作，你需要安裝以下程式 You need to install following software 

+ [MongoDB v4.0.10](https://www.mongodb.com/)
+ [Node.js v10.16.0(LTS)](https://nodejs.org/en/)

## 如何開始 Getting Started
```
# 下載專案 Clone the repository:
git clone https://github.com/windate3411/expense-tracker.git

# 安裝NPM套件 Install NPM dependencies
npm install

# 建立種子資料 Create sample data
npm run seeder

# 執行程式 Start the app
npm run dev

順利執行時會在終端機看到
you are now listening at port 3000
db connected!
便可前往http://localhost:3000使用
```

### 專案結構 Project Structure

Name | Description
-- | --
models/ | Mongoose schema
models/user.js | Mongoose schema and model for user data
models/record.js | Mongoose schema and model for record data
models/seeds/ | Sample data 
public/ | Static assets (css,js)
public/css/style.css | Main stylesheet for the app
routes/ | controller for different routes
routes/home.js | controller for display home page
routes/record.js | controller for adding/editing/deleting records
routes/user.js | controller for user account management
utils/ | Stored function used in this project
utils/backend-validation.js | Validation info
utils/getCurrentTime.js | Get current time
views/ | Templates
views/layouts | Main templates
views/partials/ | Partials templates
views/partials/headsup.handlebars | Display message if there's no record found
views/partials/messages.handlebars | Display err/success messages if there is one
views/index.handlebars | Display records and total amount
views/login.handlebars | Display login form
views/register.handlebars | Display register form
views/new.handlebars | Display add new record form
views/edit.handlebars | Display edit record form
app.js | The main application file.
package.json | NPM   dependencies.
package-lock.json | Contains exact versions of NPM dependencies in package.json.

## 作者 Author

* **Danny Wang** 



 
 
 
 
 
