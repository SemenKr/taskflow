import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus, Download } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost', 'ghost-danger'],
      description: 'Вариант отображения кнопки',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Размер кнопки',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
    },
    isLoading: {
      control: 'boolean',
      description: 'Состояние загрузки',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Только иконка без текста',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ================================
// 🔹 Базовые варианты
// ================================

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
  },
};

export const GhostDanger: Story = {
  args: {
    children: 'Delete',
    variant: 'ghost-danger',
  },
};

// ================================
// 🔹 Размеры
// ================================

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// ================================
// 🔹 С иконками
// ================================

export const WithStartIcon: Story = {
  args: {
    children: 'Add Task',
    startIcon: <Plus size={18} />,
  },
};

export const WithEndIcon: Story = {
  args: {
    children: 'Download',
    endIcon: <Download size={18} />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Action',
    startIcon: <Plus size={18} />,
    endIcon: <Download size={18} />,
  },
};

export const IconOnly: Story = {
  args: {
    startIcon: <Plus size={20} />,
    iconOnly: true,
    'aria-label': 'Add item',
  },
};

export const IconOnlyGhost: Story = {
  args: {
    startIcon: <Plus size={20} />,
    iconOnly: true,
    variant: 'ghost-danger',
    'aria-label': 'Delete item',
  },
};

// ================================
// 🔹 Состояния
// ================================

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
  },
};

export const LoadingWithIcon: Story = {
  args: {
    children: 'Saving',
    isLoading: true,
    startIcon: <Download size={18} />,
  },
};

// ================================
// 🔹 Все варианты в одном месте
// ================================

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="ghost-danger">Ghost Danger</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button isLoading>Loading</Button>
      <Button startIcon={<Plus size={18} />}>With Icon</Button>
      <Button iconOnly aria-label="Add">
        <Plus size={20} />
      </Button>
    </div>
  ),
};
