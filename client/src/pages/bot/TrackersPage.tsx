import { Search } from '@mui/icons-material'
import { IconButton, LinearProgress, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { AxiosResponse } from 'axios'
import React, {  useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { BackendError } from '../../types'
import DBPagination from '../../components/pagination/DBpagination';
import TrackersTable from '../../components/tables/TrackersTable';
import ReactPagination from '../../components/pagination/ReactPagination'
import { FuzzySearchTrackers, GetTrackers } from '../../services/BotServices'
import { ITracker } from '../../types/bot/flow.types'
import TrackerTableMenu from '../../components/menu/bot/TrackerTableMenu'



export default function TrackersPage() {
    const [paginationData, setPaginationData] = useState({ limit: 10, page: 1, total: 1 });
    const [reactPaginationData, setReactPaginationData] = useState({ limit: 10, page: 1, total: 1 });
    const [filter, setFilter] = useState<string | undefined>()
    const [tracker, setTracker] = useState<ITracker>()
    const [trackers, setTrackers] = useState<ITracker[]>([])

    const [allfuzzytrackers, setAllFuzzyTrackers] = useState<ITracker[]>([])
    const FuzzyMemoData = React.useMemo(() => allfuzzytrackers, [allfuzzytrackers])

    // pagination  states
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + reactPaginationData.limit;
    const currentItems = FuzzyMemoData.slice(itemOffset, endOffset)


    const [selectAll, setSelectAll] = useState(false)
    const MemoData = React.useMemo(() => trackers, [trackers])
    const [preFilteredData, setPreFilteredData] = useState<ITracker[]>([])
    const [selectedTrackers, setSelectedTrackers] = useState<ITracker[]>([])


    const { data, isSuccess, isLoading } = useQuery<AxiosResponse<{ trackers: ITracker[], page: number, total: number, limit: number }>, BackendError>(["trackers", paginationData], async () => GetTrackers({ limit: paginationData?.limit, page: paginationData?.page }))

    const { data: fuzzyTrackers, isSuccess: isFuzzySuccess, isLoading: isFuzzyLoading, refetch: refetchFuzzy } = useQuery<AxiosResponse<ITracker[]>, BackendError>(["fuzzytrackers", filter], async () => FuzzySearchTrackers(filter), {
        enabled: false
    })

    useEffect(() => {
        if (isSuccess) {
            setTrackers((data.data.trackers))
            setPreFilteredData(data.data.trackers)
            setPaginationData({
                ...paginationData,
                page: data.data.page,
                limit: data.data.limit,
                total: data.data.total
            })
        }
    }, [isSuccess, data])


    useEffect(() => {
        if (!filter)
            setTrackers(preFilteredData)
    }, [filter])


    useEffect(() => {
        if (isFuzzySuccess) {
            setAllFuzzyTrackers(fuzzyTrackers.data)
            setReactPaginationData({
                ...reactPaginationData,
                total: Math.ceil(fuzzyTrackers.data.length / reactPaginationData.limit)
            })
        }
    }, [isFuzzySuccess, fuzzyTrackers])

    useEffect(() => {
        setItemOffset(reactPaginationData.page * reactPaginationData.limit % reactPaginationData.total)
    }, [reactPaginationData])
    return (
        <>

            {
                isLoading && <LinearProgress />
            }
            {
                isFuzzyLoading && <LinearProgress />
            }
            {/*heading, search bar and table menu */}
            <Stack
                spacing={2}
                padding={1}
                direction="row"
                justifyContent="space-between"
                width="100vw"
            >
                <Typography
                    variant={'h6'}
                    component={'h1'}
                    sx={{ pl: 1 }}
                >
                    Trackers
                </Typography>

                <Stack
                    direction="row"
                >
                    {/* search bar */}
                    < Stack direction="row" spacing={2}>
                       
                        <TextField
                            fullWidth
                            size="small"
                            onChange={(e) => setFilter(e.currentTarget.value)}
                            autoFocus
                            placeholder={`${MemoData?.length} records...`}
                            style={{
                                fontSize: '1.1rem',
                                border: '0',
                            }}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    refetchFuzzy()
                                }
                            }}
                        />
                        <IconButton
                            sx={{ bgcolor: 'whitesmoke' }}
                            onClick={() => {
                                refetchFuzzy()
                            }}
                        >
                            <Search />
                        </IconButton>
                    </Stack >
                    <TrackerTableMenu
                        selectedFlatRows={selectedTrackers}
                    />
                </Stack>
            </Stack>
            {/* table */}
            <TrackersTable
                tracker={tracker}
                setTracker={setTracker}
                selectAll={selectAll}
                selectedTrackers={selectedTrackers}
                setSelectedTrackers={setSelectedTrackers}
                setSelectAll={setSelectAll}
                trackers={filter ? currentItems : MemoData}
                selectableTrackers={filter ? allfuzzytrackers : trackers}
            />

            {!filter ? <DBPagination paginationData={paginationData} setPaginationData={setPaginationData} /> :
                <ReactPagination reactPaginationData={reactPaginationData} setReactPaginationData={setReactPaginationData} data={FuzzyMemoData}
                />
            }

        </>

    )

}

