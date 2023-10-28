import { FC } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import { Theme, useTheme } from '@mui/material/styles'

export type OptionType = {
  name: string
  id: string
}

interface IChipMultiSelectProps {
  selectedOptions: OptionType[]
  options: OptionType[]
  // eslint-disable-next-line no-unused-vars
  setSelectedOptions: (option: OptionType[]) => void
}

const ITEM_HEIGHT = 50
const ITEM_PADDING_TOP = 4
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

function getStyles(name: string, value: OptionType[], theme: Theme) {
  const selected = value.findIndex((value: OptionType) => value.name === name)
  const isSelected = selected === -1
  return {
    color: !isSelected ? '#636262' : '#000',
    marginBottom: 3,
    fontWeight: isSelected
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium
  }
}

const ChipMultiSelect: FC<IChipMultiSelectProps> = ({
  selectedOptions,
  options,
  setSelectedOptions
}) => {
  const theme = useTheme()

  const handleChange = (event: SelectChangeEvent<OptionType[]>) => {
    const value = event.target.value
    if (typeof value === 'string') {
      return
    }
    setSelectedOptions(value)
  }

  return (
    <FormControl sx={{ minWidth: 400 }}>
      <InputLabel id="multiple-chip-label">Filter by category:</InputLabel>
      <Select
        labelId="multiple-chip-label"
        id="multiple-chip"
        multiple
        value={selectedOptions}
        onChange={handleChange}
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label="Filtrar por categoria"
          />
        }
        renderValue={(selected: OptionType[]) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value.id} label={value.name} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options.map((category: any) => (
          <MenuItem
            key={category.name}
            value={category}
            style={getStyles(category.name, selectedOptions, theme)}
          >
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ChipMultiSelect
