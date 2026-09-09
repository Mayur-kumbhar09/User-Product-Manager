import React, { useContext } from 'react'
import { Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
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
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: "450px",
        borderRadius: 3,
        boxShadow: 4,
        overflow: "hidden",
      }}
    >
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 700,
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              Id
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              Product Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              Brand
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontWeight: 700,
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              Price
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontWeight: 700,
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedProduct.map((product, index) => (
            <TableRow
              key={index}
              sx={{
                "&:nth-of-type(odd)": { bgcolor: "action.hover" },
                "&:last-child td, &:last-child th": { border: 0 },
                transition: "background-color 0.2s ease",
                "&:hover": { bgcolor: "primary.light", opacity: 0.9 },
              }}
            >
              <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>
                {index + 1}
              </TableCell>
              <TableCell sx={{ fontWeight: 500 }}>
                {product.product_name}
              </TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "success.main" }}>
                ₹{product.price}
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={editTableCell}
                  data-id={index}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  }
</>
    )
}

export default UserProductDisplayList