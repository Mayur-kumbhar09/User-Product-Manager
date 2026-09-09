import React, { useEffect } from "react";
import { createContext } from "react";
import { userList } from "../Task/Data";
import { Button, Avatar, Container, ListItem, Typography } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { Grid, Stack, Box } from "@mui/material";
import { styled, Paper } from "@mui/material";
import AddNewProduct from "./AddNewProduct";
import DisplayUser from "./DisplayUser";
import AddNewUser from "./AddNewUser";
import { green } from "@mui/material/colors";

export const MyContaxt = createContext();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Header() {
  const [selectedProduct, setSelectedProduct] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState([]);
  const [activeUser, setActiveUser] = React.useState([]);
  const [dataArray, setdataArray] = React.useState(userList);
  const [showForm, setShowForm] = React.useState(false);

  //   useEffect(() => {
  //     if (dataArray.length > 0) {
  //       const firstUser = dataArray[0];
  //       setSelectedProduct(firstUser.products);
  //       setSelectedUser(firstUser);
  //       setActiveUser(0);
  //     } 
  //   }, []);
  useEffect(() => {
    if (dataArray.length > 0 && selectedUser.length === 0) {
      const firstUser = dataArray[0];
      setSelectedProduct(firstUser.products);
      setSelectedUser(firstUser);
      setActiveUser(0);
    }
  }, [dataArray, selectedUser]);
  const handleClick = (event) => {
    setShowForm(false);
    const setId = event.currentTarget.getAttribute("data-id"); // still a string
    const numericId = Number(setId);

    let newObj = dataArray.find((user, index) => {
      return index === numericId;
    });

    if (!newObj) return; // safety net in case nothing matches

    setSelectedProduct(newObj.products);
    setSelectedUser(newObj);
    setActiveUser(numericId);
  };

  // const updateRecords = (newObj) => {
  //     dataArray.map((data, index) => {
  //         if (index === activeUser) {
  //             data.products.push(newObj)
  //             setSelectedProduct([...data.products]);

  //         }
  //     })

  //     setdataArray([...userList]);
  // }
  const updateRecords = (newObj) => {
    dataArray.forEach((data, index) => {
      if (index === activeUser) {
        data.products.push(newObj);
        setSelectedProduct([...data.products]);
      }
    });

    setdataArray([...userList]);
  };
  // const updateUserList = (data) => {
  //     setdataArray([...dataArray, data])
  // }

  const addNewUser = (data) => {
    // console.log("data user >>**",data);

    setdataArray([
      ...dataArray,
      { id: dataArray.length + 1, ...data, products: [] },
    ]);
  };

  // console.log("userList>>**",dataArray);

  //Cart Logic.......................................

  return (
    <MyContaxt.Provider
      value={{
        selectedUser,
        selectedProduct,
        setSelectedProduct,
        updateRecords,
        setShowForm,
        dataArray,
        addNewUser,
      }}
    >
      <Container sx={{ margin: "0px", padding: "0px" }}>
        <Box sx={{ flexGrow: 4 }}>
          <Grid container spacing={2} padding={3}>
            <Grid item xs={4}>
              <Item
                sx={{
                  borderRadius: 3,
                  p: 2,
                  boxShadow: 3,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    marginLeft: "6px",
                    mb: 2,
                    color: "primary.dark",
                    borderBottom: "2px solid",
                    borderColor: "primary.light",
                    pb: 1,
                  }}
                >
                  Users
                </Typography>

                {dataArray.map((user, index) => (
                  <Stack
                    sx={{ width: "100%" }}
                    spacing={0}
                    mt={1.5}
                    key={index}
                    data-id={index}
                    onClick={handleClick}
                  >
                    <Paper
                      elevation={2}
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": {
                          transform: "translateX(4px)",
                          boxShadow: 6,
                          bgcolor: "action.hover",
                        },
                      }}
                    >
                      <ListItem
                        key={index}
                        component="div"
                        disablePadding
                        data-id={index}
                        onClick={handleClick}
                      >
                        <ListItemButton
                          color="primary"
                          data-id={index}
                          onClick={handleClick}
                          sx={{
                            py: 1.2,
                            px: 1.5,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              boxShadow: 3,
                              border: "2px solid",
                              borderColor: "primary.main",
                              flexShrink: 0,
                            }}
                            src={user.img}
                          />

                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            sx={{
                              marginLeft: "12px",
                              flexGrow: 1,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            data-id={index}
                            onClick={handleClick}
                          >
                            {user.name}
                          </Typography>

                          <Avatar
                            sx={{
                              bgcolor: green[500],
                              width: 26,
                              height: 26,
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              boxShadow: 2,
                            }}
                          >
                            {user.products.length}
                          </Avatar>
                        </ListItemButton>
                      </ListItem>
                    </Paper>
                  </Stack>
                ))}

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    borderRadius: 2,
                    py: 1,
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: 3,
                    "&:hover": { boxShadow: 6 },
                  }}
                  color="primary"
                  onClick={() => setShowForm(true)}
                >
                  + New User
                </Button>
              </Item>
            </Grid>
            {showForm === true ? (
              <Grid item xs={8}>
                <Item>
                  <AddNewUser />
                </Item>
              </Grid>
            ) : (
              <Grid item xs={8}>
                <Stack
                  sx={{ width: "100%", height: "65px" }}
                  spacing={2}
                  mt={2}
                >
                  {showForm === false ? (
                    <Item>
                      <DisplayUser />
                    </Item>
                  ) : (
                    "select the user...."
                  )}
                  <Item>
                    <AddNewProduct />
                  </Item>
                </Stack>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </MyContaxt.Provider>
  );
}
export default Header;
