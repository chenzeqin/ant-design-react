import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// 配置本页文档，或者在单独组件配置
export default {
  title: 'Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'clicked' },
  },
  parameters: {
    info: {
      // header:false,
      text: 'this is button component，支持markdown语法',
    },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  btnType: 'primary',
  children: '按钮1',
};

export const Small = Template.bind({});
// 单独配置
Small.args = {
  size: 'sm',
  btnType: 'danger',
  children: '按钮2',
};
Small.parameters = {
  backgrounds: {
    values: [
      { name: 'red', value: '#f00' },
      { name: 'green', value: '#0f0' },
      { name: 'blue', value: '#00f' },
    ],
  },
  info: {
    text: 'this is a small button',
  },
};
