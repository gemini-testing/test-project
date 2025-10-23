import Rating from './Rating';

export default {
  title: 'Common/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 5, step: 0.1 },
    },
    max: {
      control: { type: 'number', min: 1, max: 10 },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    interactive: {
      control: 'boolean',
    },
    onChange: { action: 'rating-changed' },
  },
};

export const Default = {
  args: {
    value: 4.2,
  },
};

export const ZeroRating = {
  args: {
    value: 0,
  },
};

export const FullRating = {
  args: {
    value: 5,
  },
};

export const HalfStars = {
  args: {
    value: 3.5,
  },
};

export const SmallSize = {
  args: {
    value: 4.0,
    size: 'sm',
  },
};

export const MediumSize = {
  args: {
    value: 4.0,
    size: 'md',
  },
};

export const LargeSize = {
  args: {
    value: 4.0,
    size: 'lg',
  },
};

export const Interactive = {
  args: {
    value: 3,
    interactive: true,
    onChange: (rating) => console.log('New rating:', rating),
  },
};

export const InteractiveWithoutValue = {
  args: {
    value: 0,
    interactive: true,
    onChange: (rating) => console.log('New rating:', rating),
  },
};

export const CustomMaxStars = {
  args: {
    value: 7,
    max: 10,
  },
};