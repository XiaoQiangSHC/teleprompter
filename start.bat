@echo off
echo 正在启动智能提词器...

REM 检查是否安装了 Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo 错误：未检测到 Node.js，请先安装 Node.js
    echo 您可以从 https://nodejs.org/ 下载安装
    pause
    exit /b 1
)

REM 检查是否已安装依赖
if not exist "node_modules" (
    echo 首次运行，正在安装依赖...
    npm install
    if %ERRORLEVEL% neq 0 (
        echo 依赖安装失败，请检查网络连接或手动运行 npm install
        pause
        exit /b 1
    )
)

REM 启动应用
echo 正在启动开发服务器...
start http://localhost:3000
npm start 