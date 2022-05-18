import { storiesOf } from '@storybook/react';

storiesOf('welcome', module).add(
  '欢迎',
  () => {
    return (
      <>
        <h1>欢迎</h1>
        <a href="https://github.com/chenzeqin/ant-design-ui">代码仓库</a>
        <p>安装试试： npm i chenzeqin-design-ui --save</p>
      </>
    );
  },
  {
    info: {
      disable: true,
    },
    controls: {
      disable: true,
    },
  }
);
