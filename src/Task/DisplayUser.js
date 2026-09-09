import React, { useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { MyContaxt } from "./Header";

function DisplayUser() {
  const { selectedUser } = useContext(MyContaxt);
  // console.log("curretly Selected user...",selectedUser);

  const hasUser = Boolean(selectedUser?.name);

  return (
    <Box sx={{ flexGrow: 4 }}>
      <Paper
        elevation={hasUser ? 3 : 0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          m: 2,
          border: hasUser ? "none" : "1px dashed",
          borderColor: "divider",
          transition: "box-shadow 0.3s ease",
          "&:hover": hasUser ? { boxShadow: 8 } : {},
        }}
      >
        {!hasUser && (
          <Stack
            spacing={1.5}
            alignItems="center"
            justifyContent="center"
            sx={{ py: 6, color: "text.disabled" }}
          >
            <PersonOutlineIcon sx={{ fontSize: 48 }} />
            <Typography variant="body1" fontWeight={500}>
              No user selected
            </Typography>
            <Typography variant="body2">
              Choose a user from the list to see their details
            </Typography>
          </Stack>
        )}

        {hasUser && (
          <>
            {/* Cover / banner */}
            <Box
              sx={{
                height: 90,
                background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
              }}
            />

            {/* Header: avatar overlapping the banner + name/city */}
            <Box sx={{ px: 3, pb: 2, mt: -6 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "center", sm: "flex-end" }}
              >
                <Avatar
                  src={selectedUser.img}
                  sx={{
                    width: 96,
                    height: 96,
                    border: "4px solid",
                    borderColor: "background.paper",
                    boxShadow: 3,
                  }}
                />
                <Box
                  sx={{
                    pb: { sm: 1 },
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  <Typography variant="h5" fontWeight={700}>
                    {selectedUser.name}
                  </Typography>
                  {selectedUser.city && (
                    <Chip
                      icon={<LocationOnOutlinedIcon sx={{ fontSize: 16 }} />}
                      label={selectedUser.city}
                      size="small"
                      sx={{ mt: 0.5, fontWeight: 500 }}
                    />
                  )}
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* Contact details */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1.5, sm: 4 }}
              sx={{ px: 3, py: 2.5 }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailOutlinedIcon fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  {selectedUser.email}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneOutlinedIcon fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  {selectedUser.phone_no}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnOutlinedIcon fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  {selectedUser.address}
                </Typography>
              </Stack>
            </Stack>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default DisplayUser;
