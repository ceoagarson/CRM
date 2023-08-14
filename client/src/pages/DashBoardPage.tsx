import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { paths } from "../Routes"
import Person3Icon from '@mui/icons-material/Person3';
import AirplayIcon from '@mui/icons-material/Airplay';
import AdbIcon from '@mui/icons-material/Adb';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import CampaignIcon from '@mui/icons-material/Campaign';

function DashBoardPage() {
  const goto = useNavigate()
  return (
    <>
      <Box sx={{ bgcolor: "#0039a6", m: 0, p: 0 }}>
        <Grid container >
          <Grid item xs={12} md={3} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 1 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 1,ml:-1 }}>
                <Person3Icon sx={{ color: 'darkgreen' }} />
                <Typography variant="button" sx={{ fontSize: 25 }} component="div">
                  Users
                </Typography>
              </CardContent>
              <CardActions sx={{gap:2}}>
                <Button variant="contained" color="primary" size="small" onClick={() => goto(paths.users)}>Explore</Button>
                <Button variant="outlined" color="primary" size="small"> Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={3} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 1 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 1,ml:-1 }}>
                <AirplayIcon sx={{ color: 'darkgreen' }} />
                <Typography variant="button" sx={{ fontSize: 25 }} component="div">
                  CRM
                </Typography>
              </CardContent>
              <CardActions sx={{gap:2}}>
                <Button variant="contained" color="primary" size="small" onClick={() => goto(paths.crm)}>Explore</Button>
                <Button variant="outlined" color="primary" size="small"> Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={3} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 1 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 1,ml:-1 }}>
                <AdbIcon sx={{ color: 'darkgreen' }} />
                <Typography variant="button" sx={{ fontSize: 25 }} component="div">
                  Whatsapp BOT
                </Typography>
              </CardContent>
              <CardActions sx={{gap:2}}>
                <Button variant="contained" color="primary" size="small" onClick={() => goto(paths.bot)}>Explore</Button>
                <Button variant="outlined" color="primary" size="small"> Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={3} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 1 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 1,ml:-1 }}>
                <CampaignIcon sx={{ color: 'darkgreen' }} />
                <Typography variant="button" sx={{ fontSize: 25 }} component="div">
                  Broadcast
                </Typography>
              </CardContent>
              <CardActions sx={{gap:2}}>
                <Button variant="contained" color="primary" size="small" onClick={() => goto(paths.broadcast)}>Explore</Button>
                <Button variant="outlined" color="primary" size="small"> Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={3} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 1 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 1,ml:-1 }}>
                <AddAlarmIcon sx={{ color: 'darkgreen' }} />
                <Typography variant="button" sx={{ fontSize: 25 }} component="div">
                  Scheduler
                </Typography>
              </CardContent>
              <CardActions >
                <Button variant="contained" color="primary" size="small" onClick={() => goto(paths.scheduler)}>Explore</Button>
                <Button variant="outlined" color="primary" size="small"> Reports</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}


export default DashBoardPage