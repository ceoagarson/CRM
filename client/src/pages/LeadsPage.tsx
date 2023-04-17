import { Comment, Edit, FilterList, Visibility } from "@mui/icons-material"
import { IconButton, LinearProgress, Snackbar, Stack, Tooltip, Typography } from "@mui/material"
import { AxiosResponse } from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import UpdateLeadDialog from "../components/dialogs/leads/UpdateLeadDialog"
import ViewLeadDialog from "../components/dialogs/leads/ViewLeadDialog"
import { LeadTable } from "../components/tables/LeadTable"
import { ChoiceContext, LeadChoiceActions } from "../contexts/dialogContext"
import { GetLeads } from "../services/LeadsServices"
import { BackendError } from "../types"
import { ILead } from "../types/lead.type"
import NewRemarkDialog from "../components/dialogs/leads/NewRemarkDialog"

export type Filter = {
  key: string,
  value: string
}[]

export default function LeadsPage() {
  const { setChoice } = useContext(ChoiceContext)
  const [DATA, setDATA] = useState<ILead[]>([])
  const [remoteBackUpData, setRemoteBackUpData] = useState<ILead[]>([])
  const [filter, setFilter] = useState<Filter>([])
  const [lead, setLead] = useState<ILead>()
  const [snackDisplay, setSnackDisplay] = useState(false)
  const { data: leads, isSuccess, isLoading } = useQuery
    <AxiosResponse<ILead[]>, BackendError>("leads", GetLeads, {
      refetchOnMount: true
    })
  const MemoData = React.useMemo(() => DATA, [DATA])
  const MemoColumns: Column<ILead>[] = React.useMemo(
    () => [
      //actions
      {
        Header: 'Actions',
        accessor: 'actions',
        disableSortBy: true,
        Cell: (props) => {
          return (
            <Stack direction="row" spacing={1}>
              <Tooltip title="edit">
                <IconButton color="secondary"
                  onClick={() => {
                    setChoice({ type: LeadChoiceActions.update_lead })
                    setLead(props.row.original)
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="view">
                <IconButton color="primary"
                  onClick={() => {
                    setChoice({ type: LeadChoiceActions.view_lead })
                    setLead(props.row.original)
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
                    setLead(props.row.original)
                  }}
                >
                  <Comment />
                </IconButton>
              </Tooltip>
            </Stack>
          )
        }
      },
      // lead name
      {
        Header: 'Lead Name',
        accessor: 'name',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.name}</Typography>
          )
        },
        Filter: (props) => {
          console.log(props)
          return (
            <FilterList/>
          )
        }
      },
      // stage
      {
        Header: 'Stage',
        accessor: 'stage',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.stage}</Typography>
          )
        }
      },
      // city
      {
        Header: 'City',
        accessor: 'city',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.city}</Typography>
          )
        }
      },
      // state name
      {
        Header: 'State',
        accessor: 'state',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.state}</Typography>
          )
        }
      },
      //lead_type
      {
        Header: 'Lead Type',
        accessor: 'lead_type',
        disableSortBy: true,
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.lead_type}</Typography>
          )
        }
      }
      ,
      //lead_Owners
      {
        Header: 'Lead Owners',
        accessor: 'lead_owners',
        disableSortBy: true,
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.lead_owners ? props.row.original.lead_owners.map((owner) => { return owner.username + ", " }) : [""]}</Typography>
          )
        }
      },
      //country

      //Turn over
      {
        Header: 'Turn Over',
        accessor: 'turnover',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.turnover}</Typography>
          )
        }
      },
      //Work description
      {
        Header: 'Work Description',
        accessor: 'work_description',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.work_description ? props.row.original.work_description.slice(0, 50) : ""}</Typography>
          )
        }
      },

      //customer name
      {
        Header: 'Customer Name',
        accessor: 'customer_name',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.customer_name}</Typography>
          )
        }
      },
      //customer_designation
      {
        Header: 'Customer Designation',
        accessor: 'customer_designation',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.customer_designation}</Typography>
          )
        }
      },

      //remark
      {
        Header: 'Last Remark',
        accessor: 'remarks',
        disableSortBy: true,
        Cell: (props) => {
          return (
            <>
              {props.row.original.remarks && props.row.original.remarks.length ?
                <Typography sx={{ textTransform: "capitalize" }}> {props.row.original.remarks[props.row.original.remarks.length - 1].remark.slice(0, 50)}
                </Typography> : null
              }
            </>
          )
        }
      },
      //mobile
      {
        Header: 'Mobile',
        accessor: 'mobile',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1"  >{props.row.original.mobile}</Typography>
            </Stack>
          )
        }
      }
      ,
      //mobile
      {
        Header: 'Mobile',
        accessor: 'alternate_mobile1',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1"  >{props.row.original.alternate_mobile1}</Typography>
            </Stack>
          )
        }
      }
      ,
      //mobile
      {
        Header: 'Mobile',
        accessor: 'alternate_mobile2',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1"  >{props.row.original.alternate_mobile2}</Typography>
            </Stack>
          )
        }
      }
      ,
      //Email 
      {
        Header: 'Email',
        accessor: 'email',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }} variant="body1">{props.row.original.email}</Typography>
          )
        }
      },
      //Email 
      {
        Header: 'Alternate Email',
        accessor: 'alternate_email',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }} variant="body1">{props.row.original.alternate_email}</Typography>
          )
        }
      },

      //Address
      {
        Header: 'Address',
        accessor: 'address',
        Cell: (props) => {
          return (
            <Stack>
              <Typography sx={{ textTransform: "capitalize" }} variant="body1">{props.row.original.address ? props.row.original.address.slice(0, 50) : "..."}</Typography>
            </Stack>
          )
        }
      },
      // lead_source
      {
        Header: 'Lead Source',
        accessor: 'lead_source',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }} variant="body1">{props.row.original.lead_source}</Typography>
          )
        }
      },
      // country
      {
        Header: 'Country',
        accessor: 'country',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }} variant="body1">{props.row.original.country}</Typography>
          )
        }
      },
      // organization
      {
        Header: 'Organization',
        disableSortBy: true,
        accessor: 'organization',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }} variant="body1">{props.row.original.organization.organization_name}</Typography>
          )
        }
      },
      // created_at
      {
        Header: 'Created At',
        accessor: 'created_at',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }} variant="body1">{new Date(props.row.original.created_at).toLocaleString()}</Typography>
          )
        }
      },
      // updated_at
      {
        Header: 'Updated At',
        accessor: 'updated_at',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }} variant="body1">{new Date(props.row.original.updated_at).toLocaleString()}</Typography>
          )
        }
      },
      // created_by
      {
        Header: 'Created By',
        accessor: 'created_by',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }} variant="body1">{props.row.original.created_by.username}</Typography>
          )
        }
      },
      // updated_by
      {
        Header: 'Last Updated By',
        accessor: 'updated_by',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }} variant="body1">{props.row.original.updated_by.username}</Typography>
          )
        }
      }
    ]
    , [setChoice]
  )
 
 
//setup leads
  useEffect(() => {
    if (isSuccess) {
      setRemoteBackUpData(leads.data)
      setDATA(leads.data)
    }
  }, [isSuccess, leads])

//setup filter leads
  useEffect(() => {
    function handleFilter() {
      let filteredData = DATA.filter((item) => {
        return item.customer_name === filter[0].value
      })
      if (filteredData.length === 0)
        setSnackDisplay(true)
      setDATA(filteredData)
    }
    if (filter.length > 0)
      handleFilter()
    if (filter.length === 0)
      setDATA(remoteBackUpData)
  }, [filter, DATA, remoteBackUpData])


  return (
    <>
      <LeadTable data={MemoData} columns={MemoColumns}/>
      <Snackbar
        open={snackDisplay}
        autoHideDuration={6000}
        onClose={() => setSnackDisplay(false)}
        sx={{ marginTop: "100px" }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message="No Leads found"
      />
      {
        lead ?
          <>
            <UpdateLeadDialog lead={lead} />
            <ViewLeadDialog lead={lead} />
            <NewRemarkDialog lead={lead} />
          </>
          : null
      }
      {
        isLoading && <LinearProgress />
      }
    </>
  )
}
