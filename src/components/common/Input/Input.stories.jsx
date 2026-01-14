import Input from './Input';

export default {
  title: 'Common/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
  },
};

export const Default = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text...',
  },
};

export const WithLabel = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
};

export const Required = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'your@email.com',
    required: true,
  },
};

export const WithError = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    error: 'Password must be at least 6 characters long',
    required: true,
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    value: 'Cannot edit this',
  },
};

export const Email = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'your@email.com',
  },
};

export const Password = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const Number = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '25',
  },
};

export const WithValue = {
  args: {
    label: 'Pre-filled Input',
    value: 'This input has a value',
    placeholder: 'Placeholder text',
  },
};
