import { Comment, Delete, Edit, Visibility } from '@mui/icons-material'
import { Box, Checkbox, FormControlLabel, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { color1, color2, headColor } from '../../utils/colors'
import { ILead } from '../../types/leads/lead.type'
import { useContext, useEffect, useState } from 'react'
import { ChoiceContext, LeadChoiceActions } from '../../contexts/dialogContext'
import { UserContext } from '../../contexts/userContext'
import { BasicPOPUP } from '../popup/BasicPOPUP'
import AddTaskIcon from '@mui/icons-material/AddTask';
import UpdateLeadDialog from '../dialogs/leads/UpdateLeadDialog'
import DeleteLeadDialog from '../dialogs/leads/DeleteLeadDialog'
import ConvertLeadToCustomerDialog from '../dialogs/leads/ConvertLeadToCustomerDialog'
import ViewRemarksDialog from '../dialogs/leads/ViewRemarksDialog'
import NewRemarkDialog from '../dialogs/leads/NewRemarkDialog'
import { useLeadFields } from '../hooks/LeadFieldsHook'



type Props = {
  lead: ILead | undefined
  setLead: React.Dispatch<React.SetStateAction<ILead | undefined>>,
  leads: ILead[],
  selectAll: boolean,
  setSelectAll: React.Dispatch<React.SetStateAction<boolean>>,
  selectedLeads: ILead[]
  setSelectedLeads: React.Dispatch<React.SetStateAction<ILead[]>>,
  selectableLeads: ILead[]
}

function LeadsTable({ lead, leads, selectableLeads, setLead, selectAll, setSelectAll, selectedLeads, setSelectedLeads }: Props) {
  const { setChoice } = useContext(ChoiceContext)
  const { user: LoggedInUser } = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [data, setData] = useState<ILead[]>(leads)
  const { hiddenFields } = useLeadFields()

  useEffect(() => {
    setData(leads)
  }, [leads])
  return (
    <>
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
                      indeterminate={selectAll ? true : false}
                      size="small" onChange={(e) => {
                        if (e.currentTarget.checked) {
                          setSelectedLeads(selectableLeads)
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

              {!hiddenFields?.includes('name') ?
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
                :
                null}


              {/* stage */}
              {!hiddenFields?.includes('stage') ?
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
                :
                null}

              {/* city */}
              {!hiddenFields?.includes('city') ?
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
                :
                null}
              {/* state */}
              {!hiddenFields?.includes('state') ?
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
                :
                null}
              {/* lead type */}
              {!hiddenFields?.includes('lead_type') ?
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
                :
                null}
              {/* lead owners */}
              {!hiddenFields?.includes('lead_owners') ?
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
                :
                null}
              {/* turn over */}
              {!hiddenFields?.includes('turnover') ?
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
                :
                null}
              {/* work description */}
              {!hiddenFields?.includes('work_description') ?
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
                :
                null}
              {/* customer name */}
              {!hiddenFields?.includes('customer_name') ?
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
                :
                null}
              {/* designiaton */}
              {!hiddenFields?.includes('customer_designation') ?
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
                :
                null}
              {/* last remark */}
              {!hiddenFields?.includes('remarks') ?
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
                :
                null}
              {/* mobile */}
              {!hiddenFields?.includes('mobile') ?
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
                :
                null}
              {/* alternate mobile 1 */}
              {!hiddenFields?.includes('alternate_mobile1') ?
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
                :
                null}
              {/* alternate mobile 2 */}
              {!hiddenFields?.includes('alternate_mobile2') ?
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
                :
                null}

              {/* email */}
              {!hiddenFields?.includes('email') ?
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
                :
                null}
              {/* alternate email */}
              {!hiddenFields?.includes('alternate_email') ?
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
                :
                null}
              {/* address */}
              {!hiddenFields?.includes('address') ?
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
                :
                null}


              {/* source */}
              {!hiddenFields?.includes('lead_source') ?
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
                :
                null}
              {/* country */}
              {!hiddenFields?.includes('country') ?
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
                :
                null}
              {/* created at */}
              {!hiddenFields?.includes('created_at') ?
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
                :
                null}
              {/* updated at */}
              {!hiddenFields?.includes('updated_at') ?
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
                :
                null}
              {/* created by */}
              {!hiddenFields?.includes('created_by') ?
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
                :
                null}
              {/* updated by */}
              {!hiddenFields?.includes('updated_by') ?
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
                :
                null}

              {/* last whatsapp */}
              {!hiddenFields?.includes('last_whatsapp_date') ?
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
                :
                null}
              {/* visitin card */}
              {!hiddenFields?.includes('visiting_card') ?
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
                :
                null}
              {/* actions */}
              {!hiddenFields?.includes('') ?
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
                :
                null}
            </TableRow>
          </TableHead>
          <TableBody >
            {

              data && data.map((lead, index) => {
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
                    {!hiddenFields?.includes('name') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{lead.name}</Typography>
                      </TableCell>
                      :
                      null}
                    {/* stage */}
                    {!hiddenFields?.includes('stage') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{lead.stage}</Typography>
                      </TableCell>
                      :
                      null}
                    {/* city */}
                    {!hiddenFields?.includes('city') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{lead.city}</Typography>
                      </TableCell>
                      :
                      null}
                    {/* state */}
                    {!hiddenFields?.includes('state') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{lead.state}</Typography>
                      </TableCell>
                      :
                      null}
                    {/* lead type */}
                    {!hiddenFields?.includes('lead_type') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{lead.lead_type}</Typography>
                      </TableCell>
                      :
                      null}
                    {/* lead owners */}
                    {!hiddenFields?.includes('lead_owners') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{lead.lead_owners ? lead.lead_owners.map((owner) => { return owner.username + ", " }) : [""]}</Typography>
                      </TableCell>
                      :
                      null}
                    {/* turn over */}
                    {!hiddenFields?.includes('turnover') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{`${lead.turnover} Rupees`}</Typography>
                      </TableCell>
                      :
                      null}
                    {/* work description */}
                    {!hiddenFields?.includes('work_description') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{lead.work_description ? lead.work_description.slice(0, 50) : ""}</Typography>
                      </TableCell>
                      :
                      null}
                    {/* customer name */}
                    {!hiddenFields?.includes('customer_name') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{lead.customer_name}</Typography>
                      </TableCell>
                      :
                      null}
                    {/* designiaton */}
                    {!hiddenFields?.includes('customer_designation') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{lead.customer_designation}</Typography>
                      </TableCell>
                      :
                      null}
                    {/* last remark */}
                    {!hiddenFields?.includes('remarks') ?
                      <TableCell>
                        {lead.remarks ?
                          <Typography sx={{ textTransform: "capitalize" }}> {lead.last_remark && lead.last_remark.slice(0, 50)}
                          </Typography> : null
                        }
                      </TableCell>
                      :
                      null}
                    {/* mobile */}
                    {!hiddenFields?.includes('mobile') ?
                      <TableCell>
                        <Stack>
                          <Typography variant="body1"  >{lead.mobile}</Typography>
                        </Stack>
                      </TableCell>
                      :
                      null}
                    {/* alternate mobile 1 */}
                    {!hiddenFields?.includes('alternate_mobile1') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{lead.alternate_mobile1}</Typography>
                      </TableCell>
                      :
                      null}
                    {/* alternate mobile 2 */}
                    {!hiddenFields?.includes('alternate_mobile2') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{lead.alternate_mobile2}</Typography>
                      </TableCell>
                      :
                      null}

                    {/* email */}
                    {!hiddenFields?.includes('email') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }} variant="body1">{lead.email}</Typography>
                      </TableCell>
                      :
                      null}
                    {/* alternate email */}
                    {!hiddenFields?.includes('alternate_email') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }} variant="body1">{lead.alternate_email}</Typography>
                      </TableCell>
                      :
                      null}
                    {/* address */}
                    {!hiddenFields?.includes('address') ?
                      <TableCell>
                        <Stack>
                          <Typography sx={{ textTransform: "capitalize" }} variant="body1">{lead.address ? lead.address.slice(0, 50) : "..."}</Typography>
                        </Stack>
                      </TableCell>
                      :
                      null}


                    {/* source */}
                    {!hiddenFields?.includes('lead_source') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }} variant="body1">{lead.lead_source}</Typography>

                      </TableCell>
                      :
                      null}
                    {/* country */}
                    {!hiddenFields?.includes('country') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }} variant="body1">{lead.country}</Typography>

                      </TableCell>
                      :
                      null}
                    {/* created at */}
                    {!hiddenFields?.includes('created_at') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }} variant="body1">{new Date(lead.created_at).toLocaleString()}</Typography>

                      </TableCell>
                      :
                      null}
                    {/* updated at */}
                    {!hiddenFields?.includes('updated_at') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }} variant="body1">{new Date(lead.updated_at).toLocaleString()}</Typography>

                      </TableCell>
                      :
                      null}
                    {/* created by */}
                    {!hiddenFields?.includes('created_by') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }} variant="body1">{lead.created_by.username}</Typography>

                      </TableCell>
                      :
                      null}
                    {/* updated by */}
                    {!hiddenFields?.includes('updated_by') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }} variant="body1">{lead.updated_by.username}</Typography>

                      </TableCell>
                      :
                      null}

                    {/* last whatsapp */}
                    {!hiddenFields?.includes('last_whatsapp_date') ?
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }} variant="body1">{new Date(lead.last_whatsapp_date).toLocaleString()}</Typography>
                      </TableCell>
                      :
                      null}
                    {/* visitin card */}
                    {!hiddenFields?.includes('') ?
                      <TableCell>
                        <img height="50" src={lead.visiting_card && lead.visiting_card.url} alt="visiting card" />
                      </TableCell>
                      :
                      null}
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
              })

            }
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
    </>
  )
}

export default LeadsTable