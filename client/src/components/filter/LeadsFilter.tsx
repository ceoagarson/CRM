import { IconButton, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { Search } from "@mui/icons-material"
import LeadsFilterDialog from "../dialogs/filter/LeadsFilterDialog";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { ChoiceContext, LeadChoiceActions } from "../../contexts/dialogContext";

type Props = {
    setQuery: React.Dispatch<React.SetStateAction<{
        searchString: string | undefined;
        city: boolean | undefined;
        owner: boolean | undefined;
        isOr: boolean | undefined
    } | undefined>>,
    query: {
        city: boolean | undefined;
        owner: boolean | undefined;
        searchString: string | undefined;
        isOr: boolean | undefined
    } | undefined
}

function LeadsFilter({ query, setQuery }: Props) {
    const [filter, setFilter] = useState<string>()
    const {  setChoice } = useContext(ChoiceContext)

    console.log(filter)

    return (
        <>
            {
                !query ?
                    <IconButton>
                        <FilterAltIcon />
                    </IconButton>
                    :
                    <IconButton onClick={() => setChoice({ type: LeadChoiceActions.open_filter })
                    } >
                        <FilterAltOffIcon />
                    </IconButton >
            }
            <TextField
                fullWidth
                size="small"
                onChange={(e) => setFilter(e.currentTarget.value)}
                autoFocus
                placeholder={`0 records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
            <IconButton
                sx={{ bgcolor: 'whitesmoke' }}
                onClick={() => {

                }}
            >
                <Search />
            </IconButton>
            <LeadsFilterDialog query={query} setQuery={setQuery} />

        </>
    )
}

export default LeadsFilter