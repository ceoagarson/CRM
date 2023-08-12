import { Avatar, IconButton, Stack } from "@mui/material"
import logo from "/logo.png";

function AgarsonLogo() {
    return (
        <Stack direction="row"
            alignItems="center"
            gap={1}
            sx={{
                maxWidth: "70vw",
                overflow: "hidden"
            }}>
            <IconButton title="Dashboard">
                <Avatar
                    sx={{ width: 30, height: 30, borderRadius: 2, background: 'white' }}
                    alt="img1" src={logo} />
            </IconButton>
        </Stack>
    )
}

export default AgarsonLogo