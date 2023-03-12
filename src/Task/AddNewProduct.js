import React, { useContext} from 'react'
import { MyContaxt } from './Header'
import { useForm } from "react-hook-form";
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/material';
import UserProductDisplayList from './UserProductDisplayList'

function AddNewProduct() {
  let { updateRecords } = useContext(MyContaxt);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {

    // setSelectedProduct(selectedProduct.push({...data}))
    reset();
    updateRecords({...data})
  }
      // console.log("error",errors)



  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: "column" }} Validate autoComplete="off">
        <form onSubmit={handleSubmit(onSubmit)} >
          <TextField size="small" sx={{m:2}} label='product_name' variant="outlined"{...register("product_name", { required: "this field is required"  })} error={!!errors.product_name} helperText={errors?.product_name?.message} />
          <TextField size="small" sx={{m:2}} label='brand' variant="outlined"  {...register("brand", { required: "this field is required"  })} error={!!errors.brand} helperText={errors?.brand?.message} />
          <TextField size="small" sx={{m:2}} label='price' variant="outlined" {...register("price", { required: "this field is required"  })} error={!!errors.price} helperText={errors?.price?.message} />
          
          <Button variant='contained' sx={{ m: 2 }} type="submit" >ADD</Button>
        </form>
      </Box>
      <Box>
        <UserProductDisplayList />
      </Box>
    </>

  )
}

export default AddNewProduct