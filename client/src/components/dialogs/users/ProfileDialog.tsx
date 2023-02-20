import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography, Avatar, Box } from '@mui/material'
import { Stack } from '@mui/system'
import { useContext } from 'react'
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { IUser } from '../../../contexts/userContext'


function ProfileDialog({ profile }: { profile: IUser }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === UserChoiceActions.view_profile ? true : false}
            onClose={() => setChoice({ type: UserChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
                User Profile
            </DialogTitle>
            <DialogContent>
                <Box>
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
                </Box >
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="warning"
                    fullWidth
                    onClick={() => {
                        setChoice({ type: UserChoiceActions.close })
                    }}
                >
                    Close
                </Button >
            </DialogActions>
        </Dialog>
    )
}

export default ProfileDialog