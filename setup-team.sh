#!/bin/bash

echo "🚀 Настройка проекта TaskFlow..."

# 1. Проверка Node.js
if ! command -v node &> /dev/null
then
  echo "❌ Node.js не установлен. Установи Node.js версии 18 или выше с сайта https://nodejs.org/"
  exit 1
fi
echo "✅ Node.js найден: $(node -v)"

# 2. Проверка PNPM
if ! command -v pnpm &> /dev/null
then
  echo "📦 Устанавливаем PNPM..."
  npm install -g pnpm
else
  echo "✅ PNPM найден: $(pnpm -v)"
fi

# 3. Установка зависимостей
echo "📥 Устанавливаем зависимости..."
pnpm install

# 4. Настройка Husky (pre-commit хуков)
echo "🔧 Настраиваем Husky..."
pnpm dlx husky install

echo "✅ Проект готов к работе!"
echo ""
echo "👉 Запусти dev-сервер командой:"
echo "   pnpm dev"
echo ""
echo "🎯 Перед коммитом код будет автоматически проверяться."
