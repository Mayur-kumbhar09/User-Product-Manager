import React, { useContext } from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { MyContaxt } from "./Header";

function DisplayUser() {
  const { selectedUser } = useContext(MyContaxt);
  // console.log("curretly Selected user...",selectedUser);

  return (
    <Box sx={{ flexGrow: 4 }}>
      <Paper
        elevation={selectedUser?.name ? 4 : 0}
        sx={{
          borderRadius: 4,
          p: 3,
          m: 2,
          background: selectedUser?.name
            ? "linear-gradient(135deg, #f5f7fa 0%, #eef1f5 100%)"
            : "transparent",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
          "&:hover": selectedUser?.name
            ? { boxShadow: 8, transform: "translateY(-2px)" }
            : {},
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={2} display="flex" justifyContent="center">
            {selectedUser?.name && (
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  boxShadow: 6,
                  border: "3px solid",
                  borderColor: "primary.main",
                }}
                src={selectedUser.img}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {selectedUser?.name && (
              <Stack
                spacing={0.5}
                alignItems={{ xs: "center", sm: "flex-start" }}
                textAlign={{ xs: "center", sm: "left" }}
              >
                <Typography variant="h4" fontWeight={700} color="primary.dark">
                  {selectedUser.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {selectedUser.city}
                </Typography>
              </Stack>
            )}
          </Grid>

          <Grid item xs={12} sm={4}>
            {selectedUser?.name && (
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EmailIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {selectedUser.email}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PhoneIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {selectedUser.phone_no}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOnIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {selectedUser.address}
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default DisplayUser;
