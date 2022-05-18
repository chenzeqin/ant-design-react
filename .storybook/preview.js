import '../src/styles/index.scss';
import '../src/styles/info-table.scss'
// Globally in your .storybook/preview.js.
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
addDecorator(withInfo);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  info: { inline: true, header: false },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
