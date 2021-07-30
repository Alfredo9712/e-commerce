import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Pagination } from "@material-ui/lab";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { Button } from "react-bootstrap";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const AdminUpdateItem = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  const [data, setData] = useState();
  const pattern = limit - 1;

  // console.log(products);

  const pageHandler = (event, value) => {
    setPage(value);
    // setStart(value);
    setStart(limit * value - pattern - 1);
    setEnd(limit * value - pattern + limit - 1);
  };

  const fetchProducts = async () => {
    const result = await axios.get(`api/paginated-products/${start}/${end}`);
    setData(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    // dispatch(getProducts());
    fetchProducts();
  }, [start]);

  const classes = useStyles();

  return (
    <TableContainer
      component={Paper}
      style={{ marginLeft: "-30px", marginTop: "10px" }}
    >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Quantity(S)</TableCell>
            <TableCell align="right">Price(S)</TableCell>
            <TableCell align="right">Quantity(M)</TableCell>
            <TableCell align="right">Price(M)</TableCell>
            <TableCell align="right">Quantity(L)</TableCell>
            <TableCell align="right">Price(L)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product._id}>
              <TableCell component="th" scope="products">
                {product.product}
              </TableCell>

              <TableCell align="right" component="th" scope="products">
                {product.category}
              </TableCell>
              {product.sizes.map((size) => (
                <>
                  <TableCell align="right" component="th" scope="product">
                    {size.quantity}
                  </TableCell>
                  <TableCell align="right" component="th" scope="product">
                    ${size.price}
                  </TableCell>
                </>
              ))}
              {/* <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.fat}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell> */}
              <TableCell align="right">
                <Button onClick={() => alert("hi")}>edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination page={page} count={3} onChange={pageHandler} />
      {/* <h1>start : {start}</h1>
      <h1>end: {end}</h1>
      <h1>page: {page}</h1>
      <h1>pattern: {pattern}</h1> */}
    </TableContainer>
  );
};

export default AdminUpdateItem;
