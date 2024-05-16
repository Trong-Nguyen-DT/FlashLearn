import { Input, TableQueryParams } from '@components';
import { Clear, Search } from '@mui/icons-material';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import { isEmpty } from '@utils';
import { debounce } from 'lodash';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  searchText?: string;
  onSearch?: (_text: string) => void;
  placeholder?: string;
};

const CustomSearchEncounters: React.FC<Props> = ({
  searchText,
  onSearch,
  placeholder = 'Search',
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = React.useState(
    searchText || searchParams.get(TableQueryParams._SEARCH) || '',
  );

  const onSearchFunc = (val: string) => {
    if (onSearch) return onSearch(val);
    const tempSearchParams = new URLSearchParams(window.location.search);
    if (val) tempSearchParams.set(TableQueryParams._SEARCH, val);
    else {
      tempSearchParams.delete(TableQueryParams._SEARCH);
    }
    tempSearchParams.delete(TableQueryParams._PAGE);
    setSearchParams(tempSearchParams);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceValue = React.useCallback(debounce(onSearchFunc, 500), []);

  const hasValue = !isEmpty(searchValue);

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    debounceValue(value);
  };

  const handleClearSearchValue = () => {
    setSearchValue('');
    onSearchFunc('');
  };

  return (
    <Stack flexGrow={1}>
      <Input
        placeholder={placeholder}
        value={searchValue}
        size="small"
        onChange={handleTextChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" sx={{ fontSize: 18 }} />
            </InputAdornment>
          ),
          endAdornment: hasValue && (
            <IconButton className="p-2" onClick={handleClearSearchValue}>
              <Clear sx={{ fontSize: 20 }} />
            </IconButton>
          ),
        }}
        sx={{ maxWidth: '320px' }}
      />
    </Stack>
  );
};

export default CustomSearchEncounters;
