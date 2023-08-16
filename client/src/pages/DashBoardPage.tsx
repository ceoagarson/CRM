import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { paths } from "../Routes"
import Person3Icon from '@mui/icons-material/Person3';
import BackupIcon from '@mui/icons-material/Backup';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CampaignIcon from '@mui/icons-material/Campaign';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

function DashBoardPage() {
  const goto = useNavigate()
  const { user } = useContext(UserContext)
  return (
    <Box sx={{ bgcolor: "#0039a6", m: 0, p: 0 }}>
      <Grid container >

        {user?.created_by._id === user?._id &&
          <Grid item xs={12} md={4} lg={3} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 1 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <Person3Icon sx={{ color: 'darkblue', height: 50, width: 50 }} />
                <Typography variant="button" sx={{ color: 'darkblue', fontSize: 16 }} component="div">
                  Users
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" size="small" onClick={() => goto(paths.users)}>View All</Button>
                <Button variant="contained" color="inherit" size="small">Manage</Button>
              </CardActions>
            </Card>
          </Grid>}
        {user?.is_admin &&
        <Grid item xs={12} md={4} lg={3} sx={{ p: 1 }}>
          <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 1 }}>
            <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
              <Diversity3Icon sx={{ color: 'darkblue', height: 50, width: 50 }} />
              <Typography variant="button" sx={{ color: 'darkblue', fontSize: 16 }} component="div">
                CRM
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" size="small" onClick={() => goto(paths.crm)}>View All</Button>
              <Button variant="contained" color="inherit" size="small">View Reports</Button>
            </CardActions>
          </Card>
        </Grid>}
        {user?.is_admin &&
          <Grid item xs={12} md={4} lg={3} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 1 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/whatsapp.png" alt="whatsapp" />
                <Typography variant="button" sx={{ color: 'darkblue', fontSize: 16 }} component="div">
                  WA BOT
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" size="small" onClick={() => goto(paths.bot)}>View All</Button>
                <Button variant="contained" color="inherit" size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>}
        {user?.is_admin &&
          <Grid item xs={12} md={4} lg={3} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 1 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <CampaignIcon sx={{ color: 'darkblue', height: 50, width: 50 }} />
                <Typography variant="button" sx={{ color: 'darkblue', fontSize: 16 }} component="div">
                  Broadcast
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" size="small" onClick={() => goto(paths.broadcast)}>View All</Button>
                <Button variant="contained" color="inherit" size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>}
        {user?.is_admin &&
          <Grid item xs={12} md={4} lg={3} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 1 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <AccessTimeFilledIcon sx={{ color: 'darkblue', height: 50, width: 50 }} />
                <Typography variant="button" sx={{ color: 'darkblue', fontSize: 16 }} component="div">
                  Scheduler
                </Typography>
              </CardContent>
              <CardActions >
                <Button variant="contained" color="primary" size="small" onClick={() => goto(paths.scheduler)}>View All</Button>
                <Button variant="contained" color="inherit" size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>}
        {user?.is_admin &&
          <Grid item xs={12} md={4} lg={3} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 1 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <BackupIcon sx={{ color: 'darkblue', height: 50, width: 50 }} />
                <Typography variant="button" sx={{ color: 'darkblue', fontSize: 16 }} component="div">
                  Backup Database
                </Typography>
              </CardContent>
              <CardActions >
                <Button variant="contained" color="primary" size="small" onClick={() => goto(paths.backup_page)}>View All</Button>
                <Button variant="contained" color="inherit" size="small">Manage</Button>
              </CardActions>
            </Card>
          </Grid>}
      </Grid>

    </Box>
  )
}


export default DashBoardPage