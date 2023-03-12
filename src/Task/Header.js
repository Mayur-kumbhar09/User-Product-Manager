import React from 'react'
import { createContext } from 'react'
import { userList } from '../Task/Data'
import { Button, Avatar, Container, ListItem, Typography } from '@mui/material';
import { ListItemButton } from '@mui/material';
import { Grid, Stack, Box } from '@mui/material';
import { styled, Paper } from '@mui/material';
import AddNewProduct from './AddNewProduct'
import DisplayUser from './DisplayUser';
import AddNewUser from './AddNewUser';
import { green } from '@mui/material/colors';

export const MyContaxt = createContext();

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Header() {
    const [selectedProduct, setSelectedProduct] = React.useState([])
    const [selectedUser, setSelectedUser] = React.useState([])
    const [activeUser, setActiveUser] = React.useState([])
    const [dataArray, setdataArray] = React.useState(userList)
    const [showForm, setShowForm] = React.useState(false);
    const handleClick = (event) => {
        setShowForm(false)
        const setId = event.target.getAttribute('data-id');
        let newObj = dataArray.find((user, index) => {
            return index == setId;
        })

        setSelectedProduct(newObj.products)
        setSelectedUser(newObj)
        setActiveUser(setId)
    }
    const updateRecords = (newObj) => {
        dataArray.map((data, index) => {
            if (index == activeUser) {
                data.products.push(newObj)
                setSelectedProduct([...data.products]);

            }
        })

        setdataArray([...userList]);
    }
    // const updateUserList = (data) => {
    //     setdataArray([...dataArray, data])
    // }

    const addNewUser = (data) => {
        // console.log("data user >>**",data);

        setdataArray([...dataArray, { id: dataArray.length + 1, ...data, products: [] }])

    }

    // console.log("userList>>**",dataArray);


    //Cart Logic.......................................


    return (
        <MyContaxt.Provider value={{ selectedUser, selectedProduct, setSelectedProduct, updateRecords, setShowForm, dataArray, addNewUser }}>
            <Container sx={{ margin: "0px", padding: "0px" }}>
                <Box sx={{ flexGrow: 4 }}>
                    <Grid container spacing={2} padding={3}>
                        <Grid item xs={4} >
                            <Item>
                                <Typography variant='h4' sx={{ marginLeft: "10px" }}>User's</Typography>
                                {
                                    dataArray.map((user, index) => (
                                        <Stack sx={{ width: '100%', height: "75px" }} spacing={2} mt={2} key={index} data-id={index} onClick={handleClick}>
                                            <Item><ListItem key={index} component="div" disablePadding data-id={index} onClick={handleClick}>
                                                <ListItemButton color='primary' varient='contained' data-id={index} onClick={handleClick}>
                                                    <Avatar sx={{
                                                        width: 45, height: 45,  
                                                        boxShadow: 5,
                                                        border: "2px solid blue",
                                                    }} src={user.img} />
                                                
                                                    <Typography variant='h6' sx={{ marginLeft: "7px" }} data-id={index} onClick={handleClick}>{user.name}</Typography>
                                                    <Avatar sx={{ mx: "35px", bgcolor: green[500] ,width:"20px", height:"20px"}}>{user.products.length}</Avatar>
                                                </ListItemButton>
                                            </ListItem>
                                            </Item>
                                        </Stack>))
                                }
                            </Item>
                            <Item>
                                <Button variant='contained' sx={{ m: 2 }} color='primary' onClick={() => setShowForm(true)}>New-User</Button>
                            </Item>
                        </Grid>
                        {
                            showForm === true ? (<Grid item xs={8}>
                                <Item>
                                    <AddNewUser />
                                </Item>
                            </Grid>) :

                                <Grid item xs={8}>
                                    <Stack sx={{ width: '100%', height: "65px" }} spacing={2} mt={2} >
                                        {showForm == false ? (
                                            <Item>
                                                <DisplayUser />
                                            </Item>) : "select the user...."
                                        }
                                        <Item>
                                            <AddNewProduct />
                                        </Item>
                                    </Stack>

                                </Grid>
                        }

                    </Grid>
                </Box>
            </Container>
        </MyContaxt.Provider >

    )
}
export default Header