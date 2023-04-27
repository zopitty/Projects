import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
const Contact = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#665957",
    p: 4,
  };
  return (
    <Box sx={style}>
      <Card sx={{ width: 360 }}>
        <CardMedia
          sx={{ height: 175 }}
          image="https://cdn.discordapp.com/attachments/996491283969343639/1101167607358431273/Screenshot_2023-04-27_at_11.24.57_PM.png"
          title="don't call me"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Contact info
          </Typography>
          <Typography variant="body2" color="text.secondary">
            HP: 12345678
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Email</Button>
          <Button size="small">Telegram</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Contact;
