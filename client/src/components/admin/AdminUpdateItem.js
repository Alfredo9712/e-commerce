import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productsActions';
import TextField from '@material-ui/core/TextField';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
} from '@material-ui/core';
import { Button } from 'react-bootstrap';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const AdminUpdateItem = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  console.log(products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align='right'>Category</TableCell>
            <TableCell align='right'>Quantity(S)</TableCell>
            <TableCell align='right'>Price(S)</TableCell>
            <TableCell align='right'>Quantity(M)</TableCell>
            <TableCell align='right'>Price(M)</TableCell>
            <TableCell align='right'>Quantity(L)</TableCell>
            <TableCell align='right'>Price(L)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell component='th' scope='products'>
                {product.product}
              </TableCell>

              <TableCell align='right' component='th' scope='products'>
                {product.category}
              </TableCell>
              {product.sizes.map((size) => (
                <>
                  <TableCell align='right' component='th' scope='product'>
                    {size.quantity}
                  </TableCell>
                  <TableCell align='right' component='th' scope='product'>
                    ${size.price}
                  </TableCell>
                </>
              ))}
              {/* <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.fat}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell> */}
              <TableCell align='right'>
                <Button onClick={() => alert('hi')}>edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminUpdateItem;
