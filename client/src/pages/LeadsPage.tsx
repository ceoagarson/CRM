import { Comment, Delete, Edit, Search, Visibility } from '@mui/icons-material'
import { Box, Checkbox, FormControlLabel, IconButton, InputAdornment, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Stack } from '@mui/system'
import { AxiosResponse } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { LeadChoiceActions, ChoiceContext } from '../contexts/dialogContext'
import { BackendError } from '../types'
import { color1, color2, headColor } from '../utils/colors'
import LeadTableMenu from '../components/menu/LeadTableMenu'
import { FuzzySearchLeads, GetLeads } from '../services/LeadsServices'
import { ILead } from '../types/leads/lead.type'
import { UserContext } from '../contexts/userContext'
import UpdateLeadDialog from '../components/dialogs/leads/UpdateLeadDialog'
import DeleteLeadDialog from '../components/dialogs/leads/DeleteLeadDialog'
import ConvertLeadToCustomerDialog from '../components/dialogs/leads/ConvertLeadToCustomerDialog'
import NewRemarkDialog from '../components/dialogs/leads/NewRemarkDialog'
import ViewRemarksDialog from '../components/dialogs/leads/ViewRemarksDialog'
import { BasicPOPUP } from '../components/popup/BasicPOPUP'
import UploadLeadsExcelButton from '../components/buttons/UploadLeadsExcelButton';
import DBPagination from '../components/pagination/DBpagination';
import { PaginationContext } from '../contexts/paginationContext';

export default function LeadsPage() {
  const { paginationData, setPaginationData } = useContext(PaginationContext)
  const [filter, setFilter] = useState<string | undefined>()


  const { data, isSuccess, isLoading } = useQuery<AxiosResponse<{ leads: ILead[], page: number, total: number, limit: number }>, BackendError>(["leads", paginationData], async () => GetLeads({ limit: paginationData?.limit, page: paginationData?.page }), {
    cacheTime: 200
  })

  const { data: fuzzyLeads, isSuccess: isFuzzySuccess, isLoading: isFuzzyLoading, refetch: refetchFuzzy } = useQuery<AxiosResponse<ILead[]>, BackendError>(["fuzzyleads", filter], async () => FuzzySearchLeads(filter), {
    cacheTime: 200,
    enabled: false
  })

  const { user: LoggedInUser } = useContext(UserContext)
  const [lead, setLead] = useState<ILead>()
  const [leads, setLeads] = useState<ILead[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const MemoData = React.useMemo(() => leads, [leads])
  const [preFilteredData, setPreFilteredData] = useState<ILead[]>([])
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedLeads, setSelectedLeads] = useState<ILead[]>([])
  const { setChoice } = useContext(ChoiceContext)

  useEffect(() => {
    if (isSuccess) {
      setLeads(data.data.leads)
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
      setLeads(fuzzyLeads.data)
    }
  }, [isFuzzySuccess])
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
            <UploadLeadsExcelButton />
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
      <Box sx={{
        overflow: "scroll",
        height: '73.5vh'
      }}>
        <Table
          sx={{ minWidth: "5000px" }}
          size="small">
          <TableHead
          >
            <TableRow>
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  <FormControlLabel sx={{ fontSize: 12 }} control={
                    <Checkbox

                      size="small" onChange={(e) => {
                        if (e.currentTarget.checked) {
                          setSelectedLeads(leads)
                          setSelectAll(true)
                        }
                        if (!e.currentTarget.checked) {
                          setSelectedLeads([])
                          setSelectAll(false)
                        }
                      }} />}
                    label=""
                  />
                </Stack>
              </TableCell>
              {/* actions popup */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Actions
                </Stack>
              </TableCell>

              {/* lead name */}

              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Lead Name
                </Stack>
              </TableCell>


              {/* stage */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Stage
                </Stack>
              </TableCell>

              {/* city */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  City
                </Stack>
              </TableCell>
              {/* state */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  State
                </Stack>
              </TableCell>
              {/* lead type */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Lead Type
                </Stack>
              </TableCell>
              {/* lead owners */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Lead Owners
                </Stack>
              </TableCell>
              {/* turn over */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  TurnOver
                </Stack>
              </TableCell>
              {/* work description */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Work Description
                </Stack>
              </TableCell>
              {/* customer name */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Customer Name
                </Stack>
              </TableCell>
              {/* designiaton */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Customer Desigination
                </Stack>
              </TableCell>
              {/* last remark */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Last Remark
                </Stack>
              </TableCell>
              {/* mobile */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Mobile
                </Stack>
              </TableCell>
              {/* alternate mobile 1 */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Mobile2
                </Stack>
              </TableCell>
              {/* alternate mobile 2 */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Mobile3
                </Stack>
              </TableCell>

              {/* email */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Email
                </Stack>
              </TableCell>
              {/* alternate email */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Email2
                </Stack>
              </TableCell>
              {/* address */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Address
                </Stack>
              </TableCell>


              {/* source */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Lead Source
                </Stack>
              </TableCell>
              {/* country */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Country
                </Stack>
              </TableCell>
              {/* created at */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Created At
                </Stack>
              </TableCell>
              {/* updated at */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Updated At
                </Stack>
              </TableCell>
              {/* created by */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Created By
                </Stack>
              </TableCell>
              {/* updated by */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Updated By
                </Stack>
              </TableCell>

              {/* last whatsapp */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Last Whatsapp
                </Stack>
              </TableCell>
              {/* visitin card */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Visiting Card
                </Stack>
              </TableCell>
              {/* actions */}
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Actions
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {
              MemoData && MemoData.map((lead, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      '&:nth-of-type(odd)': { bgcolor: color1 },
                      '&:nth-of-type(even)': { bgcolor: color2 },
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.1)', cursor: 'pointer' }
                    }}>
                    {selectAll ?
                      <TableCell>
                        <Stack direction="row"
                          spacing={2}
                          justifyContent="left"
                          alignItems="center"
                        >

                          <Checkbox size="small"
                            checked={Boolean(selectAll)}
                          />

                        </Stack>
                      </TableCell>
                      :
                      null
                    }
                    {!selectAll ?
                      <TableCell>
                        <Stack direction="row"
                          spacing={2}
                          justifyContent="left"
                          alignItems="center"
                        >
                          <Checkbox size="small"
                            onChange={(e) => {
                              setLead(lead)
                              if (e.target.checked) {
                                setSelectedLeads([...selectedLeads, lead])
                              }
                              if (!e.target.checked) {
                                setSelectedLeads((leads) => leads.filter((item) => {
                                  return item._id !== lead._id
                                }))
                              }
                            }}
                          />
                        </Stack>
                      </TableCell>
                      :
                      null
                    }
                    {/* actions popup */}
                    <TableCell>
                      <BasicPOPUP
                        element={<Stack direction="row" spacing={1}>
                          {
                            LoggedInUser?.is_admin ?
                              <>
                                <Tooltip title="delete">
                                  <IconButton color="error"
                                    onClick={() => {
                                      setAnchorEl(null)
                                      setChoice({ type: LeadChoiceActions.delete_lead })
                                      setLead(lead)

                                    }}
                                  >
                                    <Delete />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Convert to Customer">
                                  <IconButton color="warning"
                                    onClick={() => {
                                      setAnchorEl(null)
                                      setChoice({ type: LeadChoiceActions.convert_customer })
                                      setLead(lead)
                                    }}
                                  >
                                    <AddTaskIcon />
                                  </IconButton>
                                </Tooltip>

                              </>
                              :
                              null
                          }

                          <Tooltip title="edit">
                            <IconButton color="secondary"
                              onClick={() => {
                                setAnchorEl(null)
                                setChoice({ type: LeadChoiceActions.update_lead })
                                setLead(lead)


                              }}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="view remarks">
                            <IconButton color="primary"
                              onClick={() => {
                                setAnchorEl(null)
                                setChoice({ type: LeadChoiceActions.view_remarks })
                                setLead(lead)


                              }}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Add Remark">
                            <IconButton
                              color="success"
                              onClick={() => {
                                setAnchorEl(null)
                                setChoice({ type: LeadChoiceActions.update_remark })
                                setLead(lead)

                              }}
                            >
                              <Comment />
                            </IconButton>
                          </Tooltip>
                        </Stack>}
                        anchor={anchorEl}
                      />
                    </TableCell>
                    {/* lead name */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{lead.name}</Typography>
                    </TableCell>
                    {/* stage */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{lead.stage}</Typography>
                    </TableCell>
                    {/* city */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{lead.city}</Typography>
                    </TableCell>
                    {/* state */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{lead.state}</Typography>
                    </TableCell>
                    {/* lead type */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{lead.lead_type}</Typography>
                    </TableCell>
                    {/* lead owners */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{lead.lead_owners ? lead.lead_owners.map((owner) => { return owner.username + ", " }) : [""]}</Typography>
                    </TableCell>
                    {/* turn over */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{`${lead.turnover} Rupees`}</Typography>
                    </TableCell>
                    {/* work description */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{lead.work_description ? lead.work_description.slice(0, 50) : ""}</Typography>
                    </TableCell>
                    {/* customer name */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{lead.customer_name}</Typography>
                    </TableCell>
                    {/* designiaton */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{lead.customer_designation}</Typography>
                    </TableCell>
                    {/* last remark */}
                    <TableCell>
                      {lead.remarks && lead.remarks.length ?
                        <Typography sx={{ textTransform: "capitalize" }}> {lead.remarks[lead.remarks.length - 1].remark.slice(0, 50)}
                        </Typography> : null
                      }
                    </TableCell>
                    {/* mobile */}
                    <TableCell>
                      <Stack>
                        <Typography variant="body1"  >{lead.mobile}</Typography>
                      </Stack>
                    </TableCell>
                    {/* alternate mobile 1 */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{lead.alternate_mobile1}</Typography>
                    </TableCell>
                    {/* alternate mobile 2 */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{lead.alternate_mobile2}</Typography>
                    </TableCell>

                    {/* email */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }} variant="body1">{lead.email}</Typography>
                    </TableCell>
                    {/* alternate email */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }} variant="body1">{lead.alternate_email}</Typography>
                    </TableCell>
                    {/* address */}
                    <TableCell>
                      <Stack>
                        <Typography sx={{ textTransform: "capitalize" }} variant="body1">{lead.address ? lead.address.slice(0, 50) : "..."}</Typography>
                      </Stack>
                    </TableCell>


                    {/* source */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }} variant="body1">{lead.lead_source}</Typography>

                    </TableCell>
                    {/* country */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }} variant="body1">{lead.country}</Typography>

                    </TableCell>
                    {/* created at */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }} variant="body1">{new Date(lead.created_at).toLocaleString()}</Typography>

                    </TableCell>
                    {/* updated at */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }} variant="body1">{new Date(lead.updated_at).toLocaleString()}</Typography>

                    </TableCell>
                    {/* created by */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }} variant="body1">{lead.created_by.username}</Typography>

                    </TableCell>
                    {/* updated by */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }} variant="body1">{lead.updated_by.username}</Typography>

                    </TableCell>

                    {/* last whatsapp */}
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }} variant="body1">{new Date(lead.last_whatsapp_date).toLocaleString()}</Typography>
                    </TableCell>
                    {/* visitin card */}
                    <TableCell>
                      <img height="50" src={lead.visiting_card && lead.visiting_card.url} alt="visiting card" />
                    </TableCell>
                    {/* actions */}
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {
                          LoggedInUser?.is_admin ?
                            <>
                              <Tooltip title="delete">
                                <IconButton color="error"
                                  onClick={() => {
                                    setChoice({ type: LeadChoiceActions.delete_lead })
                                    setLead(lead)
                                  }}
                                >
                                  <Delete />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Convert to Customer">
                                <IconButton color="warning"
                                  onClick={() => {
                                    setChoice({ type: LeadChoiceActions.convert_customer })
                                    setLead(lead)
                                  }}
                                >
                                  <AddTaskIcon />
                                </IconButton>
                              </Tooltip>

                            </>
                            :
                            null
                        }

                        <Tooltip title="edit">
                          <IconButton color="secondary"
                            onClick={() => {
                              setChoice({ type: LeadChoiceActions.update_lead })
                              setLead(lead)
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="view remarks">
                          <IconButton color="primary"
                            onClick={() => {
                              setChoice({ type: LeadChoiceActions.view_remarks })
                              setLead(lead)
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Add Remark">
                          <IconButton
                            color="success"
                            onClick={() => {
                              setChoice({ type: LeadChoiceActions.update_remark })
                              setLead(lead)
                            }}
                          >
                            <Comment />
                          </IconButton>
                        </Tooltip>
                      </Stack>

                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </Box>
      {
        lead ?
          <>
            <UpdateLeadDialog lead={lead} />
            <DeleteLeadDialog lead={lead} />
            <ConvertLeadToCustomerDialog lead={lead} />
            <ViewRemarksDialog lead={lead} />
            <NewRemarkDialog lead={lead} />
          </>
          : null
      }
      {
        filter ?
          <h1>React pagination</h1>
          :
          <DBPagination />
      }

    </>

  )

}

