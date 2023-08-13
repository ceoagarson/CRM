import { Search } from '@mui/icons-material'
import { IconButton, LinearProgress, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { AxiosResponse } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { BackendError } from '../types'
import LeadTableMenu from '../components/menu/LeadTableMenu'
import { FuzzySearchLeads, GetLeads } from '../services/LeadsServices'
import { UserContext } from '../contexts/userContext'
import UploadLeadsExcelButton from '../components/buttons/UploadLeadsExcelButton';
import DBPagination from '../components/pagination/DBpagination';
import LeadsTable from '../components/tables/LeadsTable';
import ReactPagination from '../components/pagination/ReactPagination'
import { ILead } from '../types/leads/lead.type'


export default function LeadsPage() {
  const [paginationData, setPaginationData] = useState({ limit: 10, page: 1, total: 1 });
  const [reactPaginationData, setReactPaginationData] = useState({ limit: 10, page: 1, total: 1 });
  const [filter, setFilter] = useState<string | undefined>()
  const { user: LoggedInUser } = useContext(UserContext)
  const [lead, setLead] = useState<ILead>()
  const [leads, setLeads] = useState<ILead[]>([])

  const [allfuzzyleads, setAllFuzzyLeads] = useState<ILead[]>([])
  const FuzzyMemoData = React.useMemo(() => allfuzzyleads, [allfuzzyleads])

  // pagination  states
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + reactPaginationData.limit;
  const currentItems = FuzzyMemoData.slice(itemOffset, endOffset)


  const [selectAll, setSelectAll] = useState(false)
  const MemoData = React.useMemo(() => leads, [leads])
  const [preFilteredData, setPreFilteredData] = useState<ILead[]>([])
  const [selectedLeads, setSelectedLeads] = useState<ILead[]>([])


  const { data, isSuccess, isLoading } = useQuery<AxiosResponse<{ leads: ILead[], page: number, total: number, limit: number }>, BackendError>(["leads", paginationData], async () => GetLeads({ limit: paginationData?.limit, page: paginationData?.page }))

  const { data: fuzzyLeads, isSuccess: isFuzzySuccess, isLoading: isFuzzyLoading, refetch: refetchFuzzy } = useQuery<AxiosResponse<ILead[]>, BackendError>(["fuzzyleads", filter], async () => FuzzySearchLeads(filter), {
    enabled: false
  })

  useEffect(() => {
    if (isSuccess) {
      setLeads((data.data.leads))
      setPreFilteredData(data.data.leads)
      setPaginationData({
        ...paginationData,
        page: data.data.page,
        limit: data.data.limit,
        total: data.data.total
      })
    }
  }, [isSuccess])


  useEffect(() => {
    if (!filter)
      setLeads(preFilteredData)
  }, [filter])


  useEffect(() => {
    if (isFuzzySuccess) {
      setAllFuzzyLeads(fuzzyLeads.data)
      setReactPaginationData({
        ...reactPaginationData,
        total: Math.ceil(fuzzyLeads.data.length / reactPaginationData.limit)
      })
    }
  }, [isFuzzySuccess])

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
          Leads
        </Typography>

        <Stack
          direction="row"
        >
          {/* search bar */}
          < Stack direction="row" spacing={2}>
            {LoggedInUser?.is_admin ?
              < UploadLeadsExcelButton /> : null}
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
          <LeadTableMenu
            selectedFlatRows={selectedLeads}
          />
        </Stack>
      </Stack>
      {/* table */}
      <LeadsTable
        lead={lead}
        setLead={setLead}
        selectAll={selectAll}
        selectedLeads={selectedLeads}
        setSelectedLeads={setSelectedLeads}
        setSelectAll={setSelectAll}
        leads={filter ? currentItems : MemoData}
        selectableLeads={filter ? allfuzzyleads : leads}
      />

      {!filter ? <DBPagination paginationData={paginationData} setPaginationData={setPaginationData} /> :
        <ReactPagination reactPaginationData={reactPaginationData} setReactPaginationData={setReactPaginationData} data={FuzzyMemoData}
        />
      }

    </>

  )

}

