import Button from './Button';

export default {
  title: 'Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outlined', 'danger', 'success', 'text'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Outlined = {
  args: {
    variant: 'outlined',
    children: 'Button',
  },
};

export const Danger = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
};

export const Success = {
  args: {
    variant: 'success',
    children: 'Save',
  },
};

export const Text = {
  args: {
    variant: 'text',
    children: 'Link Button',
  },
};

export const Small = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const ExtraLarge = {
  args: {
    size: 'xl',
    children: 'Extra Large Button',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};