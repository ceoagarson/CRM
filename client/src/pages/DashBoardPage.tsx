import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { paths } from "../Routes"
import { darkColor } from "../utils/colors"
import Person3Icon from '@mui/icons-material/Person3';
import AirplayIcon from '@mui/icons-material/Airplay';
import AdbIcon from '@mui/icons-material/Adb';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import CampaignIcon from '@mui/icons-material/Campaign';

function DashBoardPage() {
  const goto = useNavigate()
  return (
    <>
      <Box sx={{ bgcolor: "whitesmoke"}}>
        <Grid container padding={1}>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: "#1769aa", color: 'white' }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <Person3Icon />
                <Typography variant="h5" component="div">
                  Users
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" color="inherit" size="small" onClick={() => goto(paths.users)}>View All</Button>
                <Button variant="outlined" color="inherit" size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: "#1769aa", color: 'white' }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <AirplayIcon />
                <Typography variant="h5" component="div">
                  CRM
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" color="inherit" size="small" onClick={() => goto(paths.crm)}>View All</Button>
                <Button variant="outlined" color="inherit" size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: "#1769aa", color: 'white' }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <AdbIcon />
                <Typography variant="h5" component="div">
                  Whatsapp BOT
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" color="inherit" size="small" onClick={() => goto(paths.bot)}>View All</Button>
                <Button variant="outlined" color="inherit" size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: "#1769aa", color: 'white' }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <CampaignIcon />
                <Typography variant="h5" component="div">
                  Broadcast
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" color="inherit" size="small" onClick={() => goto(paths.broadcast)}>View All</Button>
                <Button variant="outlined" color="inherit" size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: "#1769aa", color: 'white' }}>
              <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                <AddAlarmIcon />
                <Typography variant="h5" component="div">
                  Scheduler
                </Typography>
              </CardContent>
              <CardActions >
                <Button variant="outlined" color="inherit" size="small" onClick={() => goto(paths.scheduler)}>View All</Button>
                <Button variant="outlined" color="inherit" size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

      </Box>
      <Typography component={"p"} border={2} p={1} bgcolor={darkColor} sx={{ width: '100%', color: 'white', textAlign: 'center', fontWeight: "bold", fontSize: 14 }}
        variant="caption">
        Copyright &copy; Nishu kumar
      </Typography>
    </>
  )
}


export default DashBoardPage