import {AddBoxOutlined, Block, CheckCircle, Edit, Visibility } from "@mui/icons-material"
import {  IconButton, LinearProgress, Stack, Tooltip, Typography } from "@mui/material"
import { AxiosResponse } from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import ToogleAccountStatusDialog from "../components/dialogs/accounts/ToogleAccountStatusDialog"
import UpdateAccountDialog from "../components/dialogs/accounts/UpdateAccountDialog"
import ViewAccountDialog from "../components/dialogs/accounts/ViewAccountDialog"
import NewActivityDialog from "../components/dialogs/activities/NewActivityDialog"
import { AccountTable } from "../components/tables/account/AccountTable"
import { ActivityChoiceActions, ChoiceContext, AccountChoiceActions } from "../contexts/dialogContext"
import { GetAccounts } from "../services/AccountServices"
import { BackendError } from "../types"
import { IAccount } from "../types/account.type"

export default function AccountsPage() {
  const { setChoice } = useContext(ChoiceContext)
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
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: (props) => {
          let status = props.row.original.status
          let username = props.row.original.status_changed_by.username
          if (status)
            return (
              <Stack>
                <Typography variant="button" sx={{ color: "green", fontWeight: "bold" }}>Open</Typography>
                <Typography variant="caption">{username}</Typography>
              </Stack>
            )
          return (
            <Stack>
              <Typography variant="button" sx={{ color: "red" }}>Closed</Typography>
              <Typography variant="caption">{username}</Typography>
            </Stack>
          )
        }
      },
      // email
      {
        Header: 'Email',
        accessor: 'email'
      },
      //actions
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (props) => {
          let open = props.row.original.status
          return (
            <Stack direction="row" spacing={1}>
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
                      <CheckCircle />
                    </IconButton>
                  </Tooltip>
              }
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
            </Stack>
          )
        }
      },

    ]
    , [setChoice]
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
          </>
          : null
      } 
      {
        isLoading && <LinearProgress />
      }
    </>
  )
}
