import React, { useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import { MyContaxt } from "./Header";

function DisplayUser() {
  const { selectedUser } = useContext(MyContaxt);
  // console.log("curretly Selected user...",selectedUser);

  const hasUser = Boolean(selectedUser?.name);

  return (
    <Box sx={{ flexGrow: 4 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 5,
          m: 0,
          p: hasUser ? 0 : 5,
          position: "relative",
          overflow: "hidden",
          background: hasUser
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
          border: "1px solid",
          borderColor: hasUser ? "transparent" : "divider",
          transition: "all 0.35s ease",
          "&:hover": hasUser
            ? { boxShadow: "0 20px 40px rgba(118, 75, 162, 0.35)" }
            : {},
        }}
      >
        {!hasUser && (
          <Stack spacing={1.5} alignItems="center" sx={{ color: "text.disabled" }}>
            <PersonSearchOutlinedIcon sx={{ fontSize: 52 }} />
            <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
              No user selected
            </Typography>
            <Typography variant="body2" textAlign="center">
              Pick a user from the list on the left to view their profile here
            </Typography>
          </Stack>
        )}

        {hasUser && (
          <Box sx={{ position: "relative", px: { xs: 3, sm: 4 }, py: 4 }}>
            {/* Decorative background circles */}
            <Box
              sx={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -60,
                left: -30,
                width: 140,
                height: 140,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
              }}
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              alignItems="center"
              sx={{ position: "relative" }}
            >
              {/* Avatar with glowing ring */}
              <Box
                sx={{
                  p: "4px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.4) 100%)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  flexShrink: 0,
                }}
              >
                <Avatar
                  src={selectedUser.img}
                  sx={{
                    width: 100,
                    height: 100,
                    border: "3px solid rgba(255,255,255,0.9)",
                  }}
                />
              </Box>

              {/* Name, city, contact */}
              <Stack
                spacing={1.2}
                sx={{ color: "#fff", width: "100%" }}
                alignItems={{ xs: "center", sm: "flex-start" }}
                textAlign={{ xs: "center", sm: "left" }}
              >
                <Stack direction="row" spacing={0.8} alignItems="center">
                  <Typography variant="h4" fontWeight={800}>
                    {selectedUser.name}
                  </Typography>
                  <VerifiedIcon sx={{ fontSize: 22, color: "#a5f3fc" }} />
                </Stack>

                {selectedUser.city && (
                  <Chip
                    icon={<LocationOnOutlinedIcon sx={{ color: "#fff !important", fontSize: 16 }} />}
                    label={selectedUser.city}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.18)",
                      color: "#fff",
                      fontWeight: 600,
                      backdropFilter: "blur(4px)",
                    }}
                  />
                )}

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2 }}
                  flexWrap="wrap"
                  useFlexGap
                  sx={{ mt: 1.5 }}
                >
                  <Stack
                    direction="row"
                    spacing={0.8}
                    alignItems="center"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.12)",
                      borderRadius: 2,
                      px: 1.3,
                      py: 0.6,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <EmailOutlinedIcon sx={{ fontSize: 17 }} />
                    <Typography variant="body2" fontWeight={500}>
                      {selectedUser.email}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={0.8}
                    alignItems="center"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.12)",
                      borderRadius: 2,
                      px: 1.3,
                      py: 0.6,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <PhoneOutlinedIcon sx={{ fontSize: 17 }} />
                    <Typography variant="body2" fontWeight={500}>
                      {selectedUser.phone_no}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  direction="row"
                  spacing={0.8}
                  alignItems="center"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.12)",
                    borderRadius: 2,
                    px: 1.3,
                    py: 0.6,
                    backdropFilter: "blur(4px)",
                    mt: 0.5,
                  }}
                >
                  <LocationOnOutlinedIcon sx={{ fontSize: 17 }} />
                  <Typography variant="body2" fontWeight={500}>
                    {selectedUser.address}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default DisplayUser;