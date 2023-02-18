import { Dialog, DialogContent, DialogTitle, Button, Typography, Avatar} from '@mui/material'
import { Stack } from '@mui/system'
import { useContext,  useState } from 'react'
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { UserContext } from '../../../contexts/userContext'
import UpdateProfileForm from '../../forms/user/UpdateProfileForm'

function UpdateProfileDialog() {
    const [isEditing, setIsEditing] = useState(false)
    const { choice, setChoice } = useContext(ChoiceContext)
    const {user}=useContext(UserContext)
    return (
        <Dialog open={choice === ChoiceActions.update_profile ? true : false}
            onClose={() => setChoice({ type: ChoiceActions.close })}
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
                    !isEditing ?
                        <>
                            <Stack
                                justifyContent={"center"}
                                alignItems="center"
                            >
                                <Avatar src={user?.dp?.url} alt="avatar" />
                                <Typography variant="subtitle2">
                                    {user?.username}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography
                                    sx={{
                                        letterSpacing: 1,
                                        gap: 1,
                                        padding: 1
                                    }}
                                    variant="subtitle1">
                                    Email : {user?.email}
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: 1,
                                        gap: 1,
                                        padding: 1
                                    }}
                                    variant="subtitle1">
                                    Organization : {user?.organization?.organization_name}
                                </Typography>
                            </Stack>
                        </>
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
                                setChoice({ type: ChoiceActions.update_profile })
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
                        setChoice({ type: ChoiceActions.close })
                    }}
                >
                    Cancel
                </Button >
            </Stack>
        </Dialog>
    )
}

export default UpdateProfileDialog