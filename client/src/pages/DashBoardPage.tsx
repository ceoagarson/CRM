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
      <Box sx={{ bgcolor: "#0039a6",m: 0, p: 0 }}>
        <Grid container >
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 2 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <Person3Icon sx={{ color: 'darkgreen' }} />
                <Typography variant="button" sx={{ color: 'darkgreen' }} component="div">
                  Users
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="success" size="small" onClick={() => goto(paths.users)}>View All</Button>
                <Button variant="contained" color="success" size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 2 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <AirplayIcon sx={{ color: 'darkgreen' }} />
                <Typography variant="button" sx={{ color: 'darkgreen' }} component="div">
                  CRM
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="success" size="small" onClick={() => goto(paths.crm)}>View All</Button>
                <Button variant="contained" color="success" size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 2 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <AdbIcon sx={{ color: 'darkgreen' }} />
                <Typography variant="button" sx={{ color: 'darkgreen' }} component="div">
                  Whatsapp BOT
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="success" size="small" onClick={() => goto(paths.bot)}>View All</Button>
                <Button variant="contained" color="success" size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 2 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <CampaignIcon sx={{ color: 'darkgreen' }} />
                <Typography variant="button" sx={{ color: 'darkgreen' }} component="div">
                  Broadcast
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="success" size="small" onClick={() => goto(paths.broadcast)}>View All</Button>
                <Button variant="contained" color="success" size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: 'whitesmoke', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'whitesmoke', p: 2 }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <AddAlarmIcon sx={{ color: 'darkgreen' }} />
                <Typography variant="button" sx={{ color: 'darkgreen' }} component="div">
                  Scheduler
                </Typography>
              </CardContent>
              <CardActions >
                <Button variant="contained" color="success" size="small" onClick={() => goto(paths.scheduler)}>View All</Button>
                <Button variant="contained" color="success" size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

      </Box>
    </>
  )
}


export default DashBoardPage