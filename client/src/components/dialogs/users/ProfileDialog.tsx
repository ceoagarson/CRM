import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography, Avatar, Box } from '@mui/material'
import { Stack } from '@mui/system'
import { useContext } from 'react'
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { IUser } from '../../../types/users/user.type'

function ProfileDialog({ profile }: { profile: IUser }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === UserChoiceActions.view_profile ? true : false}
            onClose={() => setChoice({ type: UserChoiceActions.close_user })}
        >
            <DialogTitle textAlign="center">
                User Profile
            </DialogTitle>
            <DialogContent>
                <Box>
                    <Stack p={2} justifyContent="center" alignItems="center">
                        <Avatar src={profile?.dp?.url} sx={{ height: "150px", width: "150px" }} alt="profile pic" />
                    </Stack>
                    <Stack direction="column" justifyContent="center" alignItems="center">
                        <Typography variant="h6" component="h2">
                            {profile?.username}</Typography>
                        <Typography variant="caption" component="p">
                            {profile?.is_admin?"admin":"user"}</Typography>
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="warning"
                    fullWidth
                    onClick={() => {
                        setChoice({ type: UserChoiceActions.close_user })
                    }}
                >
                    Close
                </Button >
            </DialogActions>
        </Dialog>
    )
}

export default ProfileDialog