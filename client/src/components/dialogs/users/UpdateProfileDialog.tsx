import { Dialog, DialogContent, DialogTitle, Button, Typography, Avatar,  Box } from '@mui/material'
import { Stack } from '@mui/system'
import { useContext, useState } from 'react'
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { UserContext } from '../../../contexts/userContext'
import UpdateProfileForm from '../../forms/user/UpdateProfileForm'

function UpdateProfileDialog() {
    const [isEditing, setIsEditing] = useState(false)
    const { choice, setChoice } = useContext(ChoiceContext)
    const { user } = useContext(UserContext)
    return (
        <Dialog  open={choice === UserChoiceActions.update_profile ? true : false}
            onClose={() => setChoice({ type: UserChoiceActions.close })}
        >
            {isEditing ?
                <DialogTitle textAlign="center">
                    Edit profile
                </DialogTitle>
                : null}
            <DialogContent>
                {
                    (isEditing && user) ?
                        <UpdateProfileForm user={user} />
                        :
                        null
                }
                {
                    !isEditing && user ?
                        <Box>
                            <Stack p={2} justifyContent="center" alignItems="center">
                                <Avatar src={user?.dp?.url} sx={{ height: "150px", width: "150px" }} alt="profile pic" />
                            </Stack>
                            <Stack direction="column" justifyContent="center" alignItems="center">
                                <Typography variant="h6" component="h2">
                                    {user?.username}</Typography>
                                <Typography variant="caption" component="p">
                                    {user?.roles.toString()}</Typography>
                            </Stack>
                        </Box>
                        : null
                }

            </DialogContent>
            <Stack gap={2} p={2}>
                {
                    !isEditing ?
                        <Button
                            variant="outlined"
                            color="info"
                            fullWidth
                            onClick={() => {
                                setIsEditing(true)
                                setChoice({ type: UserChoiceActions.update_profile })
                            }}
                        >
                            Edit Profile
                        </Button >
                        :
                        null
                }
                <Button
                    variant="outlined"
                    color="warning"
                    fullWidth
                    onClick={() => {
                        setIsEditing(false)
                        setChoice({ type: UserChoiceActions.close })
                    }}
                >
                    Cancel
                </Button >
            </Stack>
        </Dialog>
    )
}

export default UpdateProfileDialog