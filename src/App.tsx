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
  const onClick = () => {
    console.log('btn have been clicked');
  };
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
      <Button size="lg" onClick={onClick}>
        large
      </Button>
      <Button size="sm">small</Button>
      <Button btnType="danger">danger</Button>
    </div>
  );
}

export default App;
