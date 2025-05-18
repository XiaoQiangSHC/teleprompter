#!/bin/bash

echo "正在启动智能提词器..."

# 检查是否安装了 Node.js
if ! command -v node &> /dev/null; then
    echo "错误：未检测到 Node.js，请先安装 Node.js"
    echo "您可以从 https://nodejs.org/ 下载安装"
    exit 1
fi

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "首次运行，正在安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "依赖安装失败，请检查网络连接或手动运行 npm install"
        exit 1
    fi
fi

# 启动应用
echo "正在启动开发服务器..."
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000 &
elif command -v open &> /dev/null; then
    open http://localhost:3000 &
fi
npm start 