import { AddBoxOutlined, Block, ChangeCircle, Edit, Visibility } from "@mui/icons-material"
import { Avatar, IconButton, LinearProgress, Stack, Tooltip, Typography } from "@mui/material"
import { AxiosResponse } from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import ToogleAccountStatusDialog from "../components/dialogs/accounts/ToogleAccountStatusDialog"
import UpdateAccountDialog from "../components/dialogs/accounts/UpdateAccountDialog"
import ViewAccountDialog from "../components/dialogs/accounts/ViewAccountDialog"
import NewActivityDialog from "../components/dialogs/activities/NewActivityDialog"
import ConvertResourceDialog from "../components/dialogs/conversion/ConvertResourceDialog"
import { AccountTable } from "../components/tables/account/AccountTable"
import { ActivityChoiceActions, ChoiceContext, AccountChoiceActions, ConversionChoiceActions } from "../contexts/dialogContext"
import { UserContext } from "../contexts/userContext"
import { GetAccounts } from "../services/AccountServices"
import { BackendError } from "../types"
import { IAccount } from "../types/account.type"

export default function AccountsPage() {
  const { setChoice } = useContext(ChoiceContext)
  const { user: loggedInUser } = useContext(UserContext)
  const [account, setAccount] = useState<IAccount>()
  const { data, isSuccess, isLoading } = useQuery
    <AxiosResponse<IAccount[]>, BackendError>("accounts", GetAccounts, {
      refetchOnMount: true
    })
  const [DATA, setDATA] = useState<IAccount[]>([])
  const MemoData = React.useMemo(() => DATA, [DATA])

  const MemoColumns: Column<IAccount>[] = React.useMemo(
    () => [
      {
        Header: "Index",
        accessor: "_id",
        width: 20,
        disableSortBy: true,
        Cell: (props) => {
          return <Typography variant="body1" component="span" pr={2}>{props.row.index + 1}</Typography>
        }
      }
      ,
      // account name
      {
        Header: 'Account Name',
        accessor: 'name',
        Cell: (props) => {
          return (
            <Stack direction="row"
              spacing={2}
              justifyContent="left"
              alignItems="center"
            >
              <Stack
                justifyContent="center"
                alignItems="center"
              >
                <Avatar
                  onClick={() => {
                    setChoice({ type: AccountChoiceActions.view_account })
                    setAccount(props.row.original)
                  }}
                  alt="display picture" src={props.row.original.dp?.url} />
                {
                  props.row.original.status ?
                    <Typography variant="caption" sx={{
                      color: "green", fontWeight: "bold"
                    }}>open</Typography>
                    : <Typography variant="caption" sx={{
                      color: "red", fontWeight: "bold"
                    }}>closed</Typography>

                }
              </Stack >
              <Stack>
                <Typography sx={{ fontWeight: "bold" }}>{props.row.original.name}</Typography>
                <Typography variant="caption" component="span">
                  {props.row.original.customer_name}<b>({props.row.original.customer_designination})</b>
                </Typography>
              </Stack >
            </Stack>
          )
        }
      },
      // email
      {
        Header: 'Email',
        accessor: 'email',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{props.row.original.email}</Typography>
              <Typography variant="caption">{props.row.original.alternate_email}</Typography>
            </Stack>
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
              <Typography variant="body1" sx={{ fontWeight: "bold" }} >{props.row.original.mobile}</Typography>
              <Typography variant="caption">{props.row.original.alternate_mobile}</Typography>
            </Stack>
          )
        }
      },
      // account_source
      {
        Header: 'Account Source',
        accessor: 'account_source',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{props.row.original.account_source}</Typography>
            </Stack>
          )
        }
      },
      // account_owner
      {
        Header: 'Account Owner',
        accessor: 'account_owner',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{props.row.original.account_owner.username}</Typography>
              <Typography variant="caption">{props.row.original.account_owner.roles.toString()}</Typography>
              <Typography variant="caption" component="span">
                {new Date(props.row.original.created_at).toLocaleDateString()}
              </Typography>
            </Stack>
          )
        }
      },
      // address
      {
        Header: 'Address',
        accessor: 'city',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{props.row.original.state}</Typography>
              <Typography variant="caption">{props.row.original.city}</Typography>
            </Stack>
          )
        }
      },
      // status updated
      {
        Header: 'Status UpdatedBy',
        accessor: 'status',
        Cell: (props) => {
          let username = props.row.original.status_changed_by.username
          return (
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{username}</Typography>
              <Typography variant="caption">{props.row.original.status_changed_by.roles.toString()}</Typography>
              <Typography variant="caption">{new Date(props.row.original.updated_at).toLocaleString()}</Typography>
            </Stack>
          )
        }
      },
      // last  updated
      {
        Header: 'Last Updated',
        accessor: 'updated_at',
        Cell: (props) => {
          let username = props.row.original.updated_by.username
          return (
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{username}</Typography>
              <Typography variant="caption">{props.row.original.updated_by.roles.toString()}</Typography>
              <Typography variant="caption">{new Date(props.row.original.updated_at).toLocaleString()}</Typography>
            </Stack>
          )
        }
      },
      //actions
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (props) => {
          let open = props.row.original.status
          return (
            <Stack direction="row" spacing={1}>

              <Tooltip title="view">
                <IconButton color="primary"
                  onClick={() => {
                    setChoice({ type: AccountChoiceActions.view_account })
                    setAccount(props.row.original)
                  }}
                >
                  <Visibility />
                </IconButton>


              </Tooltip>
              {/* new activity */}
              <Tooltip title="New Activity">
                <IconButton
                  color="success"
                  onClick={() => {
                    setChoice({ type: ActivityChoiceActions.create_activity })
                    setAccount(props.row.original)
                  }}
                >
                  <AddBoxOutlined />
                </IconButton>
              </Tooltip>

              {/* convert */}
              {loggedInUser?.roles.includes("owner") ?
                <>
                  <Tooltip title="edit">
                    <IconButton color="secondary"
                      onClick={() => {
                        setChoice({ type: AccountChoiceActions.update_account })
                        setAccount(props.row.original)
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Convert">
                    <IconButton
                      color="warning"
                      onClick={() => {
                        setChoice({ type: ConversionChoiceActions.convert_resource })
                        setAccount(props.row.original)
                      }}
                    >
                      <ChangeCircle />
                    </IconButton>
                  </Tooltip>

                  {
                    open ?
                      <Tooltip title="Close">
                        <IconButton
                          color="error"
                          onClick={() => {
                            setChoice({ type: AccountChoiceActions.open_close_account })
                            setAccount(props.row.original)
                          }}
                        ><Block />
                        </IconButton>
                      </Tooltip>
                      :
                      <Tooltip title="Open">
                        <IconButton
                          color="success"
                          onClick={() => {
                            setChoice({ type: AccountChoiceActions.open_close_account })
                            setAccount(props.row.original)
                          }}
                        >
                          <Block />
                        </IconButton>
                      </Tooltip>
                  }
                </>
                : null
              }
            </Stack>
          )
        }
      },

    ]
    , [setChoice,loggedInUser]
  )
  useEffect(() => {
    if (isSuccess)
      setDATA(data.data)
  }, [isSuccess, data])
  return (
    <>
      <AccountTable data={MemoData} columns={MemoColumns} />
      {
        account ?
          <>
            <UpdateAccountDialog account={account} />
            <ViewAccountDialog account={account} />
            <ToogleAccountStatusDialog account={account} />
            <NewActivityDialog id={account._id} resource_type="account" />
            <ConvertResourceDialog resource_id={account._id} resource_type="account" />
          </>
          : null
      }
      {
        isLoading && <LinearProgress />
      }
    </>
  )
}
