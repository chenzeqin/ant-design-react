import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { config } from 'react-transition-group';

import Menu, { MenuProps } from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

// TODO: 使用jest.mock 模拟icon组件
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// library.add(fas)
jest.mock('../Icon', () => {
  return () => {
    return <i className="fa" />;
  };
});
// TODO: 使用jest.mock 模拟react-transition-group组件
// jest.mock('react-transition-group', () => {
//   return {
//     CSSTransition: (props: any) => {
//       return props.children
//     }
//   }
// })
// 貌似没有用，还是需要 waitFor
config.disabled = true;

const defaultProps: MenuProps = {
  defaultIndex: '0',
  className: 'test-menu',
  onSelect: jest.fn(),
  mode: 'horizontal',
};
const verticalModeMenu: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};
const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display:block;
    }
  `;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
};

const getMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>menu3</MenuItem>
      <li>test children:will not render in menu</li>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
        <MenuItem disabled>menu4-2a</MenuItem>
        <MenuItem>menu4-3</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const setUp = () => {
  const view = render(getMenu(defaultProps));
  const menuElement = screen.getByTestId('test-menu');
  const disabledElement = screen.getByText('disabled');
  const activeElement = screen.getByText('active');
  // insert css file
  document.body.append(createStyleFile());
  return {
    view,
    menuElement,
    disabledElement,
    activeElement,
  };
};
describe('test menu component', () => {
  // beforeEach(() => {
  // });
  it('should render correct Menu and MenuItem with default props', () => {
    const { menuElement, disabledElement, activeElement } = setUp();
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('viking-menu');
    expect(menuElement).toHaveClass('test-menu');
    // expect(menuElement.getElementsByTagName('li').length).toEqual(7);
    // :scope 代表element本身
    // expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4); // eslint 告警
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });
  it('click item should change action and call the correct callback', () => {
    const { disabledElement } = setUp();
    // 第三个菜单未激活
    const thirdMenu = screen.getByText('menu3');
    fireEvent.click(thirdMenu);
    expect(thirdMenu).toHaveClass('menu-item is-active');
    expect(defaultProps.onSelect).toHaveBeenCalledWith('2');
    // disabled菜单点击无效
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(defaultProps.onSelect).not.toHaveBeenLastCalledWith('1');
  });
  it('test submenu', async () => {
  setUp();
    const drop1 = screen.queryByText('drop1');
    // 注意：如果是toBeVisible(),需要在上面插入样式，这里才有效果
    // 现在因为是 包在过渡组件中，所以修改成toBeInTheDocument
    expect(drop1).not.toBeInTheDocument();
    const dropdownEle = screen.getByText('dropdown');
    fireEvent.mouseEnter(dropdownEle);
    await waitFor(() => {
      expect(screen.getByText('drop1')).toBeInTheDocument();
    });
    fireEvent.mouseLeave(dropdownEle);
    await waitFor(() => {
      expect(screen.queryByText('drop1')).not.toBeInTheDocument();
    });
  });
  it('should render vertical menu', () => {
    // 清除beforeEach 生成的case
    // cleanup(); 不推荐使用
    render(getMenu(verticalModeMenu));
    const verticalMenu = screen.getByTestId('test-menu');
    expect(verticalMenu).toHaveClass('menu-vertical');
  });
});
