# 项目介绍

本项目属于个人练习项目，模仿 ant-design-react 开发组件库。

[实现笔记](https://www.yuque.com/chenzq/ou6cy9/vv1k1d)

实现组件 Button,Icon,Input,menu,AutoComplete,Progress,Upload,Transition 等组件。

- 包含有较完整单元测试。
- 使用 `storybook` 构建项目文档
- 使用`husky`代码提交前代码自动检查和测试
- 发布 npm 代码自动检查和测试

## 使用方法

```ssh
npm i chenzeqin-ant-design
```

引入样式

```ts
import 'ant-design-ui/build/index.css';
```

图标需要单独引入

```ts
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
```

example

```tsx
import Button from './components/Button/index';
import Menu from './components/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';
import Icon from './components/Icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Transition from './components/Transition';
library.add(fas);

function App() {
  const onSelect = (index: string) => {
    console.log(index);
  };
  const [open, setOpen] = useState(false);
  return (
    <div className="App">
      <Icon
        icon="arrow-down"
        theme="primary"
        onClick={() => {
          setOpen(!open);
        }}
      ></Icon>
      <Transition
        in={open}
        timeout={400}
        wrapper
        unmountOnExit
        classNames="zoom-in-top"
      >
        <Icon icon="arrow-down" theme="primary"></Icon>
      </Transition>
      <Menu onSelect={onSelect} mode="horizontal" defaultOpenSubMenus={['3']}>
        <MenuItem>menu1</MenuItem>
        <MenuItem disabled>menu2</MenuItem>
        <MenuItem>menu3</MenuItem>
        <SubMenu title="submenu-title">
          <MenuItem>menu1</MenuItem>
          <MenuItem disabled>menu2</MenuItem>
          <MenuItem>menu3</MenuItem>
        </SubMenu>
      </Menu>
      <Button size="sm" btnType="danger">
        small danger btn
      </Button>
    </div>
  );
}

export default App;
```
