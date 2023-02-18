import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography, Avatar, Box } from '@mui/material'
import { Stack } from '@mui/system'
import { useContext } from 'react'
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { IUser } from '../../../types/user.type'


function ProfileDialog({ profile }: { profile: IUser }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === ChoiceActions.view_profile ? true : false}
            onClose={() => setChoice({ type: ChoiceActions.close })}
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
                        setChoice({ type: ChoiceActions.close })
                    }}
                >
                    Close
                </Button >
            </DialogActions>
        </Dialog>
    )
}

export default ProfileDialog