import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { paths } from "../Routes"


function DashBoardPage() {
  const goto = useNavigate()
  return (
    <>
      <Box>
        <Grid container padding={1}>
          <Grid item xs={6} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: "whitesmoke" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Users
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => goto(paths.users)}>View All</Button>
                <Button size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: "whitesmoke" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  CRM
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => goto(paths.crm)}>View All</Button>
                <Button size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: "whitesmoke" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Whatsapp BOT
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => goto(paths.bot)}>View All</Button>
                <Button size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: "whitesmoke" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Broadcast
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => goto(paths.broadcast)}>View All</Button>
                <Button size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6} md={4} sx={{ p: 1 }}>
            <Card sx={{ bgcolor: "whitesmoke" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Reminders
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => goto(paths.scheduler)}>View All</Button>
                <Button size="small">View Reports</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

      </Box>
    </>
  )
}


export default DashBoardPage