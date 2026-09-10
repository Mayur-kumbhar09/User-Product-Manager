import React, { useContext, useState } from "react";
import {
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Typography,
  Box,
  Popover,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { MyContaxt } from "./Header";

function UserProductDisplayList() {
  const { selectedProduct, setSelectedProduct } = useContext(MyContaxt);

  // Popover anchor element — null means closed
  const [anchorEl, setAnchorEl] = useState(null);
  // Index of the row currently being edited
  const [editIndex, setEditIndex] = useState(null);
  // Local form state for the fields being edited
  const [editForm, setEditForm] = useState({
    product_name: "",
    brand: "",
    price: "",
  });

  console.log("tableDispl>>>>>>>>>>>", selectedProduct);

  // Opens the popover and pre-fills the form with the clicked row's data
  const editTableCell = (event, index) => {
    const product = selectedProduct[index];
    setEditForm({
      product_name: product.product_name,
      brand: product.brand,
      price: product.price,
    });
    setEditIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setEditIndex(null);
  };

  const handleFormChange = (field) => (event) => {
    setEditForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  // Writes the edited values back into selectedProduct immutably
  const handleSaveEdit = () => {
    const updatedProducts = selectedProduct.map((product, index) =>
      index === editIndex
        ? {
            ...product,
            product_name: editForm.product_name,
            brand: editForm.brand,
            price: editForm.price,
          }
        : product,
    );

    setSelectedProduct(updatedProducts);
    handleClosePopover();
  };

  const isPopoverOpen = Boolean(anchorEl);

  return (
    <>
      {
        <Paper
          sx={{
            borderRadius: 3,
            boxShadow: 4,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              px: 2.5,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
              background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            }}
          >
            <Inventory2OutlinedIcon sx={{ color: "#fff" }} />
            <Typography variant="h6" fontWeight={700} sx={{ color: "#fff" }}>
              Products
            </Typography>
          </Box>

          <TableContainer sx={{ maxHeight: "450px" }}>
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      bgcolor: "grey.100",
                      color: "text.secondary",
                    }}
                  >
                    Id
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      bgcolor: "grey.100",
                      color: "text.secondary",
                    }}
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      bgcolor: "grey.100",
                      color: "text.secondary",
                    }}
                  >
                    Brand
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 700,
                      bgcolor: "grey.100",
                      color: "text.secondary",
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 700,
                      bgcolor: "grey.100",
                      color: "text.secondary",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProduct && selectedProduct.length > 0 ? (
                  selectedProduct.map((product, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:nth-of-type(odd)": { bgcolor: "grey.50" },
                        "&:last-child td, &:last-child th": { border: 0 },
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <TableCell
                        sx={{ fontWeight: 600, color: "text.secondary" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {product.product_name}
                      </TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`₹${product.price}`}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            bgcolor: "success.light",
                            color: "success.dark",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={(event) => editTableCell(event, index)}
                          data-id={index}
                          size="small"
                          color="primary"
                          sx={{
                            border: "1px solid",
                            borderColor: "primary.main",
                            borderRadius: 2,
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        No products to display. Select a user to view their
                        products.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Edit popover */}
          <Popover
            open={isPopoverOpen}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{ vertical: "center", horizontal: "left" }}
            transformOrigin={{ vertical: "center", horizontal: "right" }}
          >
            <Stack spacing={2} sx={{ p: 2.5, width: 260 }}>
              <Typography variant="subtitle1" fontWeight={700}>
                Edit Product
              </Typography>

              <TextField
                label="Product Name"
                size="small"
                fullWidth
                value={editForm.product_name}
                onChange={handleFormChange("product_name")}
              />
              <TextField
                label="Brand"
                size="small"
                fullWidth
                value={editForm.brand}
                onChange={handleFormChange("brand")}
              />
              <TextField
                label="Price"
                size="small"
                fullWidth
                type="number"
                value={editForm.price}
                onChange={handleFormChange("price")}
              />

              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button size="small" onClick={handleClosePopover}>
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleSaveEdit}
                >
                  Save
                </Button>
              </Stack>
            </Stack>
          </Popover>
        </Paper>
      }
    </>
  );
}

export default UserProductDisplayList;
