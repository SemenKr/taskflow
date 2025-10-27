````markdown
# TaskFlow 🚀

Учебный проект Todo-приложения для IT-Incubator в мини-группе.

## 🛠 Технологии

- **React 19** + TypeScript
- **Vite** — сборка и dev-сервер
- **SCSS Modules** — стилизация с алиасами
- **Prettier** — автоформатирование кода
- **Husky** + **lint-staged** — проверки перед коммитом
- **PNPM** — менеджер пакетов

---

## 🚀 Быстрый старт для команды

### Автоматическая настройка (рекомендуется)

```bash
./setup-team.sh
```
````

Этот скрипт:

- ✅ Проверит Node.js (версия 18+)
- ✅ Установит PNPM (если отсутствует)
- ✅ Установит зависимости проекта
- ✅ Настроит Husky для автоматических проверок

После успешного выполнения:

```
✅ Проект готов к работе!
👉 Запусти dev-сервер командой: pnpm dev
```

### Ручная настройка

```bash
# Установка зависимостей
pnpm install

# Настройка Husky
pnpm dlx husky install

# Запуск разработки
pnpm dev
```

---

## 🧰 Полезные команды

| Команда             | Описание                         |
| ------------------- | -------------------------------- |
| `pnpm dev`          | Запуск dev-сервера               |
| `pnpm build`        | Сборка проекта                   |
| `pnpm preview`      | Превью сборки                    |
| `pnpm lint`         | Проверка ESLint                  |
| `pnpm format:check` | Проверка форматирования Prettier |
| `pnpm format:write` | Автоисправление форматирования   |
| `pnpm type-check`   | Проверка TypeScript типов        |

---

## 🎨 Работа со стилями

### Структура SCSS

```
src/styles/
├── _variables.scss    # Цвета, шрифты, отступы
├── _mixins.scss       # Миксины для адаптива
├── _index.scss        # Главный файл (опционально)
└── globals.scss       # Глобальные стили
```

### Импорт стилей в компонентах

```scss
// Способ 1: Прямой импорт (рекомендуется)
@use '@styles/variables' as vars;
@use '@styles/mixins' as mx;

.component {
  color: vars.$primary-color;
  @include mx.breakpoint(mobile) {
    padding: 1rem;
  }
}

// Способ 2: Через главный файл
@use '@styles' as *;

.component {
  color: $primary-color;
}
```

### Алиасы путей

- `@/` → `src/`
- `@styles/` → `src/styles/`
- `@components/` → `src/components/`

**Примеры использования:**

```tsx
// JavaScript/TypeScript
import Button from '@components/Button'
import '@styles/globals.scss'

// SCSS
@use '@styles/variables' as vars;
```

---

## 📁 Структура проекта

```
src/
├── components/        # React компоненты
├── styles/           # Глобальные стили и переменные
├── assets/           # Изображения, шрифты
├── utils/            # Вспомогательные функции
├── hooks/            # Кастомные хуки
└── types/            # TypeScript типы
```

---

## 🔧 Настройка редактора

### WebStorm / IntelliJ IDEA

- Автоматически подхватывает алиасы из `tsconfig.json`
- Для принудительного обновления: **File → Invalidate Caches → Invalidate and Restart**

### VS Code

Рекомендуемые расширения:

- **TypeScript Importer** - автоимпорты
- **Path Intellisense** - подсказки путей

---

## 💡 Советы для команды

### Перед коммитом

```bash
# Запусти проверки вручную
pnpm lint && pnpm format:check && pnpm type-check
```

### Если Husky не срабатывает

```bash
pnpm dlx husky install
```

### Работа с ветками

```bash
# Создание новой feature-ветки
git checkout -b feat/feature-name

# После завершения работы
git add .
git commit -m "feat: описание изменений"
git push origin feat/feature-name
```

---

## 🐛 Частые проблемы и решения

### Ошибка с путями в SCSS

```scss
// ❌ Неправильно
@import 'variables';

// ✅ Правильно
@use '@styles/variables' as vars;
```

### WebStorm не видит алиасы

- Перезагрузи проект: **File → Reload All from Disk**
- Проверь настройки TypeScript в **Settings → Languages & Frameworks → TypeScript**

### Ошибки зависимостей

```bash
# Полная переустановка
rm -rf node_modules
pnpm install
```

---

## 🤝 Процесс разработки

1. **Получи задачу** из backlog
2. **Создай feature-ветку** от `main`
3. **Разрабатывай** с регулярными коммитами
4. **Протестируй** функциональность
5. **Создай Pull Request** для код-ревью
6. **После апрува** влей в `main`

---

## 📝 Code Style

### React/TypeScript

- Functional components
- TypeScript для типизации
- Named exports вместо default

### SCSS

- БЭМ-нотация для классов
- `@use` вместо устаревшего `@import`
- Переменные через namespace

---

## 🚀 Деплой

Проект автоматически деплоится при пуше в ветку `main` через GitHub Actions.

---

## 👥 Авторы

Проект создан учебной командой IT-Incubator TaskFlow.

---

**Happy coding! 🎉**

```

```
