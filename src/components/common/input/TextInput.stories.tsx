import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Lock, User, Phone, Search } from 'lucide-react';
import { TextInput } from '@components/common/input/TextInput.tsx';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'number', 'search'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
    success: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    maxLength: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

// Базовый инпут
export const Default: Story = {
  args: {
    placeholder: 'Введите текст...',
  },
};

// С лейблом
export const WithLabel: Story = {
  args: {
    label: 'Имя пользователя',
    placeholder: 'username',
  },
};

// Обязательное поле
export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@mail.com',
    required: true,
  },
};

// С ошибкой
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@mail.com',
    value: 'invalid-email',
    error: 'Введите корректный email адрес',
  },
};

// Успешная валидация
export const WithSuccess: Story = {
  args: {
    label: 'Имя пользователя',
    placeholder: 'username',
    value: 'john_doe',
    success: 'Имя пользователя доступно!',
  },
};

// С вспомогательным текстом
export const WithHelperText: Story = {
  args: {
    label: 'Пароль',
    type: 'password',
    placeholder: 'Введите пароль',
    helperText: 'Минимум 8 символов, включая цифры и специальные символы',
  },
};

// Заблокированный
export const Disabled: Story = {
  args: {
    label: 'Email',
    value: 'user@example.com',
    disabled: true,
    helperText: 'Это поле нельзя редактировать',
  },
};

// С иконкой слева
export const WithLeftIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@mail.com',
    leftIcon: <Mail size={20} />,
  },
};

// С иконкой справа
export const WithRightIcon: Story = {
  args: {
    label: 'Поиск',
    placeholder: 'Найти...',
    rightIcon: <Search size={20} />,
  },
};

// Поле пароля
export const Password: Story = {
  args: {
    label: 'Пароль',
    type: 'password',
    placeholder: 'Введите пароль',
    required: true,
  },
};

// С ограничением длины
export const WithMaxLength: Story = {
  args: {
    label: 'Краткая биография',
    placeholder: 'Расскажите о себе...',
    maxLength: 50,
    helperText: 'Максимум 50 символов',
  },
};

// Email с иконкой
export const EmailWithIcon: Story = {
  args: {
    label: 'Email адрес',
    type: 'email',
    placeholder: 'your@email.com',
    leftIcon: <Mail size={20} />,
    required: true,
  },
};

// Телефон с иконкой
export const PhoneWithIcon: Story = {
  args: {
    label: 'Номер телефона',
    type: 'tel',
    placeholder: '+7 (999) 123-45-67',
    leftIcon: <Phone size={20} />,
  },
};

// Пароль с ошибкой
export const PasswordWithError: Story = {
  args: {
    label: 'Пароль',
    type: 'password',
    value: '123',
    error: 'Пароль слишком короткий (минимум 8 символов)',
    required: true,
  },
};

// Поле поиска
export const SearchField: Story = {
  args: {
    type: 'search',
    placeholder: 'Поиск...',
    leftIcon: <Search size={20} />,
  },
};

// Все состояния в одном
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '400px',
      }}
    >
      <TextInput label="Обычное поле" placeholder="Введите текст..." />

      <TextInput
        label="С иконкой"
        placeholder="Email"
        leftIcon={<Mail size={20} />}
      />

      <TextInput
        label="С ошибкой"
        value="invalid"
        error="Поле заполнено неверно"
      />

      <TextInput label="Успешно" value="correct_value" success="Отлично!" />

      <TextInput label="Заблокировано" value="Нельзя изменить" disabled />

      <TextInput label="Пароль" type="password" placeholder="Введите пароль" />

      <TextInput
        label="С лимитом"
        placeholder="Максимум 30 символов"
        maxLength={30}
      />
    </div>
  ),
};

// Форма логина
export const LoginForm: Story = {
  render: () => (
    <div
      style={{
        width: '400px',
        padding: '2rem',
        background: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2
        style={{
          marginBottom: '1.5rem',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        Вход в систему
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <TextInput
          label="Email"
          type="email"
          placeholder="your@email.com"
          leftIcon={<Mail size={20} />}
          required
        />

        <TextInput
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
          leftIcon={<Lock size={20} />}
          required
        />

        <button
          style={{
            padding: '0.75rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            marginTop: '0.5rem',
          }}
        >
          Войти
        </button>
      </div>
    </div>
  ),
};

// Форма регистрации
export const RegistrationForm: Story = {
  render: () => (
    <div
      style={{
        width: '400px',
        padding: '2rem',
        background: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2
        style={{
          marginBottom: '1.5rem',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        Регистрация
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <TextInput
          label="Имя пользователя"
          placeholder="username"
          leftIcon={<User size={20} />}
          required
        />

        <TextInput
          label="Email"
          type="email"
          placeholder="your@email.com"
          leftIcon={<Mail size={20} />}
          required
        />

        <TextInput
          label="Телефон"
          type="tel"
          placeholder="+7 (999) 123-45-67"
          leftIcon={<Phone size={20} />}
        />

        <TextInput
          label="Пароль"
          type="password"
          placeholder="Минимум 8 символов"
          leftIcon={<Lock size={20} />}
          helperText="Используйте буквы, цифры и спецсимволы"
          required
        />

        <button
          style={{
            padding: '0.75rem',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            marginTop: '0.5rem',
          }}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  ),
};
