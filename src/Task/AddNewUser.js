import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import { Button, styled , Paper, Stack, Avatar } from '@mui/material';
import { MyContaxt } from './Header';

import index from  '../Images/index.jpg'
import index2 from  '../Images/index2.jpg'
import index3 from  '../Images/index3.jpg'
import index4 from  '../Images/index4.jpg'
import index5 from  '../Images/index5.jpg'
import index6 from  '../Images/index6.jpg'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function AddNewUser() {
    const Images =[index , index2 , index3 , index4 , index5 , index6];
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    let { addNewUser } = useContext(MyContaxt);
    const products = [];
    const onSubmit = (dataOne) => {
        addNewUser({ ...dataOne , img , ...products });
        //   console.log("New User Data",dataOne);
        reset();
    }
    const[img , setImg] = React.useState([])
    const SelectAvatar=(event)=>{
        let getimgId =event.target.getAttribute('data-id');
        console.log(getimgId)
        const newImg = Images.find((img , index)=>{
            return index == getimgId ;

        })
        console.log("before.........",newImg)
        setImg(newImg)
        console.log("Selected image is ....",img);
        console.log("after.....",newImg);
    }
    
    return (
        <Box sx={{ m: "2", display: 'flex', flexDirection: "column" }} >
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                <TextField size="small" type="text" sx={{ m: 2 }} label='Name' variant="outlined" {...register("name", { required: "this field is required" })} error={!!errors.name} helperText={errors?.name?.message} />
                <TextField size="small" type="text" sx={{ m: 2 }} label='City' variant="outlined"  {...register("city")} />
                <TextField size="small" type="email" sx={{ m: 2 }} label='Email' variant="outlined"  {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                <TextField size="small" type="tel" sx={{ m: 2 }} label='Phone_No' variant="outlined"  {...register("phone_no",{required: true, minLength: 6, maxLength: 12})} />
                <TextField size="small" type="text" sx={{ m: 2 }} label='Address' variant="outlined"  {...register("address")} />
                <Button variant="contained" size="small" color="primary" type="submit" sx={{ m: 2 }} >Add </Button>
            </form>
            <Stack direction="row" spacing={2} >
                
                
                    {
                        Images.map((img , index)=>(
                            <Item key={index} onClick={SelectAvatar} data-id={index}>
                                <Avatar sx={{width: 55, height: 55,  
                                                        boxShadow: 2,
                                                        mx:"10px",
                                                        border: "2px solid blue",}} src={img} onClick={SelectAvatar}/>
                            </Item>
                        ))

                    }
                    
            </Stack>
        </Box>
    )
}
export default AddNewUser