import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import { Button, styled, Paper, Stack, Avatar } from '@mui/material';
import { MyContaxt } from './Header';

import Person from '@mui/icons-material/Person';
import Person2 from '@mui/icons-material/Person2';
import Person3 from '@mui/icons-material/Person3';
import Person4 from '@mui/icons-material/Person4';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Face from '@mui/icons-material/Face';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function AddNewUser() {
    const Icons = [Person, Person2, Person3, Person4, AccountCircleIcon, Face];
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    let { addNewUser } = useContext(MyContaxt);
    const products = [];

    const [selectedIcon, setSelectedIcon] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const onSubmit = (dataOne) => {
        addNewUser({ ...dataOne, icon: selectedIcon || AccountCircleIcon, ...products });
        reset();
        setSelectedIcon(null);
        setSelectedIndex(null);
    }

    const SelectAvatar = (event) => {
        let getIconId = event.currentTarget.getAttribute('data-id');
        const idx = Number(getIconId);
        const newIcon = Icons[idx];
        setSelectedIcon(() => newIcon);
        setSelectedIndex(idx);
    }

    return (
        <Box sx={{ m: "2", display: 'flex', flexDirection: "column" }} >
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                <TextField size="small" type="text" sx={{ m: 2 }} label='Name' variant="outlined" {...register("name", { required: "this field is required" })} error={!!errors.name} helperText={errors?.name?.message} />
                <TextField size="small" type="text" sx={{ m: 2 }} label='City' variant="outlined"  {...register("city")} />
                <TextField size="small" type="email" sx={{ m: 2 }} label='Email' variant="outlined"  {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                <TextField size="small" type="tel" sx={{ m: 2 }} label='Phone_No' variant="outlined"  {...register("phone_no", { required: true, minLength: 6, maxLength: 12 })} />
                <TextField size="small" type="text" sx={{ m: 2 }} label='Address' variant="outlined"  {...register("address")} />
                <Button variant="contained" size="small" color="primary" type="submit" sx={{ m: 2 }} >Add </Button>
            </form>
            <Stack direction="row" spacing={2} >
                {
                    Icons.map((IconComponent, index) => (
                        <Item key={index} onClick={SelectAvatar} data-id={index}>
                            <Avatar
                                sx={{
                                    width: 55,
                                    height: 55,
                                    boxShadow: 2,
                                    mx: "10px",
                                    border: selectedIndex === index ? "2px solid green" : "2px solid blue",
                                    bgcolor: "background.paper",
                                }}
                                onClick={SelectAvatar}
                                data-id={index}
                            >
                                <IconComponent sx={{ fontSize: 32, color: "gray" }} data-id={index} />
                            </Avatar>
                        </Item>
                    ))
                }
            </Stack>
        </Box>
    )
}
export default AddNewUser