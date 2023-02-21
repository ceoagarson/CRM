import { Search } from '@mui/icons-material';
import { InputAdornment, Stack, TextField } from '@mui/material';
import React from 'react';
import { Row, useAsyncDebounce } from 'react-table';
import { IOpportunity } from '../../../types/opportunity.type';
import { headColor } from '../../../utils/colors';


type Props = {
    preGlobalFilteredRows: Row<IOpportunity>[],
    globalFilter: any,
    setGlobalFilter: (filterValue: any) => void
}
function SearchBar({ preGlobalFilteredRows, globalFilter, setGlobalFilter }: Props) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)

    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)
    return (
        <>
            {/* search bar */}
            < Stack direction="row" spacing={2} sx={{ bgcolor: headColor }
            }>
                <TextField
                    fullWidth
                    size="small"
                    value={value || ""}
                    autoFocus
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <Search />
                        </InputAdornment>,
                    }}
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${count} records...`}
                    style={{
                        fontSize: '1.1rem',
                        border: '0',
                    }}
                />

            </Stack >
        </>
    )
}

export default SearchBar