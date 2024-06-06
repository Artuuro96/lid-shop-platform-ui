import React, { useState, useRef, KeyboardEvent } from 'react';
import { Paper, InputBase, Divider, IconButton, Chip, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface CustomSearchBarProps {
  placeholder?: string;
  onChange?: (values: string[]) => void;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({ placeholder = "Buscar Artículo", onChange }) => {
  const [values, setValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddValue = () => {
    if (inputValue.trim() && !values.includes(inputValue.trim())) {
      const newValues = [...values, inputValue.trim()];
      setValues(newValues);
      setInputValue('');
      inputRef.current?.focus();
      if (onChange) {
        onChange(newValues);
      }
    }
  };

  const handleDeleteValue = (valueToDelete: string) => {
    const newValues = values.filter(value => value !== valueToDelete);
    setValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddValue();
    }
  };

  return (
    <Paper
      component="form"
      sx={{ 
        p: '2px 4px', 
        display: 'flex', 
        alignItems: 'center', 
        border: (theme) => `2px solid ${theme.palette.primary.main}`,
        boxShadow: (theme) => `6px 6px 0px ${theme.palette.primary.main}`,
        height: 55,
        flex: '0 0 auto',
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', flex: 1 }}>
        {values.map((value, index) => (
          <Chip 
            key={index} 
            label={value} 
            onDelete={() => handleDeleteValue(value)} 
            sx={{ m: 0.5 }} 
          />
        ))}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          inputRef={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          inputProps={{ 'aria-label': 'search article' }}
        />
      </Box>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleAddValue}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default CustomSearchBar;
