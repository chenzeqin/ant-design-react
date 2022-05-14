import { createRef, KeyboardEvent, useEffect, useRef, useState } from 'react';
import React, { ChangeEvent, ReactElement } from 'react';
import Input, { InputProps } from '../Input/Input';
import Transition from '../Transition/index';
import Icon from '../Icon';
import classNames from 'classnames';
import { useDebounce } from '../../hooks/useDebounce';
import { useClickOutside } from '../../hooks/useClickOutside';

interface Suggestion {
  value: string;
}
export type DataSourceType<T = {}> = T & Suggestion;

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions?: (
    keyWord: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, renderOption, ...restProps } = props;
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [loading, setloading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const triggerSearch = useRef(false);
  // 防抖
  const debounceValue = useDebounce(inputValue);
  const wraperDiv = useRef<HTMLDivElement>(null);

  useClickOutside(wraperDiv, (e: MouseEvent) => {
    setShowDropdown(false);
    setSuggestions([]);
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    triggerSearch.current = true;
    setInputValue(value);
  };
  const handleSelect = (item: DataSourceType) => {
    triggerSearch.current = false;
    setInputValue(item.value);
    onSelect && onSelect(item);
    setShowDropdown(false);
  };

  useEffect(() => {
    if (inputValue && fetchSuggestions && triggerSearch.current) {
      setSuggestions([]);
      const result = fetchSuggestions(inputValue);
      if (result instanceof Promise) {
        setloading(true);
        result.then((res) => {
          console.log(res);
          setSuggestions(res);
          setShowDropdown(res.length > 0);
          setloading(false);
        });
      } else {
        setSuggestions(result);
        setShowDropdown(result.length > 0);
      }
    } else {
      setSuggestions([]);
    }
  }, [debounceValue]);
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38:
        highlight(highlightIndex - 1);
        break;
      case 40:
        highlight(highlightIndex + 1);
        break;
      case 27:
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <ul className="viking-suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex,
            });
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };
  return (
    <div ref={wraperDiv} className="viking-auto-complete">
      <Input
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
