import React, { ChangeEvent, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { storiesOf } from '@storybook/react';
import Input from './Input';

const ContrledInput = () => {
  const [value, setValue] = useState('');
  return (
    <Input
      value={value}
      defaultValue="111"
      onChange={(e) => {
        setValue(e.target.value);
      }}
    ></Input>
  );
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

const defaultInput = Template.bind({});

const disabledInput = () => {
  return <Input disabled></Input>;
};
const handleChange = (e: ChangeEvent) => {
  console.log(e);
};
const iconInput = () => {
  return <Input icon="search" onChange={handleChange}></Input>;
};

const sizeInput = () => {
  return <Input size="sm"></Input>;
};

const pandInput = () => {
  return <Input prepend="https://" append=".com"></Input>;
};

storiesOf('Input component', module)
  .add('Input', defaultInput)
  .add('受控 Input', ContrledInput)
  .add('被禁用的 Input', disabledInput)
  .add('带图标的 Input', iconInput)
  .add('大小不同的 Input', sizeInput)
  .add('带前后缀的 Input', pandInput);
