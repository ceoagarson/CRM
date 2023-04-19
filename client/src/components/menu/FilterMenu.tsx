import { FilterList, FilterListOff } from '@mui/icons-material';
import { Button, Checkbox, FormControlLabel, Menu, Stack } from '@mui/material';
import { useContext, useState } from 'react';
import { Filter, FilterContext } from '../../contexts/filterContext';

type Props = {
  data: Filter
}

function FilterMenu({ data }: Props) {
  const [display, setDisplay] = useState(false)
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const { filter,setFilter } = useContext(FilterContext)
  return (
    <>
      {
        filter.length ?
          <Button onClick={() => {
            setFilter([])
          }}>
            <FilterListOff />
          </Button> :
          <Button onClick={(e) => {
            setDisplay(true)
            setTarget(e.currentTarget)
          }} >
            <FilterList />
          </Button>
      }
      {
        display ?
          <Menu
            anchorEl={target}
            open={true}
            onClose={() => setDisplay(false)}
          >
            <Stack direction={"column"} sx={{p:1}}>
              {
                data.map((item, index) => {
                  return <FormControlLabel key={index} control={<Checkbox />}
                    onChange={(e) => {
                      setFilter([...filter,{ key: item.key, value: item.value }])
                    }}
                    label={item.value}
                  />
                })
              }
            </Stack >
          </Menu>
          : null
      }
    </>
  )
}

export default FilterMenu