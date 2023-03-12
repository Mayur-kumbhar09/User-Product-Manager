import React, { useContext } from 'react'
import { Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, TextField, Grid } from '@mui/material';
import { MyContaxt } from './Header';
function UserProductDisplayList() {
    const { selectedProduct } = useContext(MyContaxt);
    const [getEdit, setGetEdit] = React.useState([
        {
            id:" ",
            product_name:" ",
            brand:" ",
            price:" "
        }
    ])
    console.log("tableDispl>>>>>>>>>>>", selectedProduct);
    const editTableCell = (event) => {
        let btnId = event.target.getAttribute('data-id');
        console.log("current checkout id is: ", btnId);
        setGetEdit([...selectedProduct,getEdit])
    }
    console.log(getEdit);


    return (
        <>
        {
            <TableContainer component={Paper} sx={{ maxHeight: "450px" }}>
            <Table aria-label='simple table' stickyHeader>
                <TableHead>
                    <TableCell>Id</TableCell>
                    <TableCell>product_name</TableCell>
                    <TableCell>brand</TableCell>
                    <TableCell align='center'>price</TableCell>
                    {/* <TableCell align='center'>Checkout</TableCell> */}
                </TableHead>
                <TableBody>
                    {
                            selectedProduct.map((product, index) => (
                                <TableRow key={index}
                                    sx={{ '&:last-child-td,last-child-th': { border: 0 } }}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{product.product_name}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell align='center'>{product.price}</TableCell>
                                    <TableCell align='center'><Button onClick={editTableCell} data-id={index}>Edit</Button></TableCell>
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        }
        </>
    )
}

export default UserProductDisplayList