import { FC } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Skeleton from '@mui/material/Skeleton'
import { Product } from '../types/ProductType'

interface IProductsTableProps {
  products: Product[]
  isLoading: boolean
  // eslint-disable-next-line no-unused-vars
  onDelete: (product: Product) => void
}

const ProductsTable: FC<IProductsTableProps> = ({
  products,
  onDelete,
  isLoading
}) => {
  return (
    <TableContainer sx={{ minHeight: '50vh', mb: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">$ Price</TableCell>
            <TableCell align="left">$ Promotional Price</TableCell>
            <TableCell align="left">Color</TableCell>
            <TableCell align="center">Created at</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? Array.from({ length: 10 }, (_, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="left">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
              ))
            : products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="left">{product.category?.name}</TableCell>
                  <TableCell align="left">{product.description}</TableCell>
                  <TableCell align="left">${product.price}</TableCell>
                  <TableCell align="left">
                    ${product.promotionalPrice}
                  </TableCell>
                  <TableCell align="left">{product.color}</TableCell>
                  <TableCell align="center">
                    {new Date(product.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="delete"
                      onClick={() => onDelete(product)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductsTable
