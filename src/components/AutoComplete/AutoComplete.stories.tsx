import { storiesOf } from '@storybook/react';
import AutoComplete, { DataSourceType } from './AutoComplete';
import axios from 'axios';

interface UserItem {
  login: string;
  html_url: string;
}
interface User {
  items: UserItem[];
}

type GithubUser = DataSourceType<UserItem>;

const defaultAutoComplete = () => {
  const renderOption = (item: any) => {
    return (
      <>
        <h3>{item.value}</h3>
        <p>{item.html_url}</p>
      </>
    );
  };
  const fetchSuggestions = (keyword: string): Promise<GithubUser[]> => {
    return axios
      .get<User>(`https://api.github.com/search/users?q=${keyword}`)
      .then((res) => {
        return res.data.items.map((i) => {
          return {
            value: i.login,
            ...i,
          };
        });
      });
  };
  return (
    <AutoComplete
      renderOption={renderOption}
      fetchSuggestions={fetchSuggestions}
    ></AutoComplete>
  );
};

storiesOf('AutoComplete component', module).add(
  'AutoComplete',
  defaultAutoComplete
);
