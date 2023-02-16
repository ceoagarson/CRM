import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography, Avatar } from '@mui/material'
import { Stack } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { GetProfile } from '../../../services/UserServices'
import { IUser } from '../../../types/user.type'
import UpdateProfileForm from '../../forms/user/UpdateProfileForm'


function UpdateProfileDialog() {
    const [isEditing, setIsEditing] = useState(false)
    const { choice, setChoice } = useContext(ChoiceContext)
    const [profile, setProfile] = useState<IUser>()
    const { data, isSuccess } = useQuery("profile", GetProfile)
    useEffect(() => {
        if (isSuccess)
            setProfile(data.data)
    }, [data])
    return (
        <Dialog open={choice === ChoiceActions.update_profile ? true : false}
            onClose={() => setChoice({ type: ChoiceActions.close })}
        >
            {isEditing ?
                <DialogTitle textAlign="center">
                    Edit Profile
                </DialogTitle>
                : null}
            <DialogContent>
                {
                    (isEditing && profile) ?
                        <UpdateProfileForm user={profile} />
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
                                <Avatar src={profile?.dp?.url} alt="avatar" />
                                <Typography variant="subtitle2">
                                    {profile?.username}
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
                                    Email : {profile?.email}
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: 1,
                                        gap: 1,
                                        padding: 1
                                    }}
                                    variant="subtitle1">
                                    Organization : {profile?.organization?.organization_name}
                                </Typography>
                            </Stack>
                        </>
                        : null
                }

            </DialogContent>
            <DialogActions>
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
                        <Button
                            variant="outlined"
                            color="warning"
                            fullWidth
                            onClick={() => {
                                setIsEditing(false)
                                setChoice({ type: ChoiceActions.update_profile })
                            }}
                        >
                            Cancel
                        </Button >
                }
            </DialogActions>
        </Dialog>
    )
}

export default UpdateProfileDialog