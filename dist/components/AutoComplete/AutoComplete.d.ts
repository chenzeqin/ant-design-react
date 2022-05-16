import React, { ReactElement } from 'react';
import { InputProps } from '../Input/Input';
interface Suggestion {
    value: string;
}
export declare type DataSourceType<T = {}> = T & Suggestion;
interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions?: (keyWord: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}
declare const AutoComplete: React.FC<AutoCompleteProps>;
export default AutoComplete;
