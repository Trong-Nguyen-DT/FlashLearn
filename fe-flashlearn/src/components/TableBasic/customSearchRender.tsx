/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@components';
import { Clear, Search } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { isEmpty } from '@utils';
import { debounce } from 'lodash';
import React from 'react';

const clsPrefix = 'custom-search-table';

type Props = {
  searchText: string;
  onSearch: (..._args: any[]) => void;
  placeholder?: string;
};

const CustomSearchRender: React.FC<Props> = ({ searchText, onSearch, placeholder = 'Search' }) => {
  // const ref = React.useRef(null);
  const [searchValue, setSearchValue] = React.useState(searchText || '');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceValue = React.useCallback(debounce(onSearch, 300), []);

  const hasValue = !isEmpty(searchText);

  const handleTextChange = (event: { target: { value: string } }) => {
    const { value } = event.target;

    setSearchValue(value);
    debounceValue(value);
  };

  const handleClearSearchValue = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <Input
      placeholder={placeholder}
      size="small"
      value={searchValue}
      onChange={handleTextChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="action" sx={{ fontSize: 18 }} />
          </InputAdornment>
        ),
        endAdornment: hasValue && (
          <IconButton classes={{ root: `${clsPrefix}-icon p-2` }} onClick={handleClearSearchValue}>
            <Clear sx={{ fontSize: 20 }} />
          </IconButton>
        ),
      }}
    />
  );
};

export default CustomSearchRender;
