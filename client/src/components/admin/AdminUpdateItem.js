import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../../actions/productsActions";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Pagination } from "@material-ui/lab";
import CancelIcon from "@material-ui/icons/Cancel";
import EditModal from "./EditModal";
import { paginateProducts } from "../../actions/productsActions";
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
import { Button, Modal, Spinner } from "react-bootstrap";

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});
const AdminUpdateItem = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const length = useSelector((state) => state.product.length);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(5);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [product, setProduct] = useState();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState();
  const pattern = limit - 1;

  const pageHandler = (event, value) => {
    setPage(value);
    setStart(limit * value - pattern - 1);
    setEnd(limit * value - pattern + limit - 1);
  };

  const fetchProducts = async () => {
    const result = await axios.get(`api/paginated-products/${start}/${end}`);
    setData(result.data);
  };
  const handleClose = () => {
    setShow(false);
  };
  const openHandler = (product) => {
    setShow(true);
    setProduct(product);
  };
  const deleteHandler = () => {
    const { category, _id } = product;
    dispatch(deleteProduct(category, _id));
    setShow(false);
    dispatch(paginateProducts(start, end));
  };
  useEffect(() => {
    dispatch(paginateProducts(start, end));
    setLoading(false);
  }, [start]);

  const classes = useStyles();

  return (
    <>
      {products.length > limit ? (
        <Spinner
          animation="border"
          style={{
            display: "block",
            position: "fixed",
            zIndex: "1031",
            top: "50%",
            right: "50%",
            marginTop: "-..px",
            marginRight: "-..px",
          }}
        />
      ) : (
        <div style={{ marginTop: "30px" }}>
          <h1>Edit Products</h1>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to remove {product?.product}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={deleteHandler}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          <TableContainer
            component={Paper}
            style={{ marginTop: "50px", width: "90%" }}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Quantity(S)</TableCell>
                  <TableCell align="right">Price(S)</TableCell>
                  <TableCell align="right">Quantity(M)</TableCell>
                  <TableCell align="right">Price(M)</TableCell>
                  <TableCell align="right">Quantity(L)</TableCell>
                  <TableCell align="right">Price(L)</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell component="th" scope="products">
                      {product.product}
                    </TableCell>
                    <TableCell align="right" component="th" scope="products">
                      <EditModal product={product} />
                    </TableCell>

                    <TableCell align="right" component="th" scope="products">
                      {product.category}
                    </TableCell>
                    {product.sizes.map((size, index) => (
                      <Fragment key={index}>
                        <TableCell align="right" component="th" scope="product">
                          {size.quantity}
                        </TableCell>
                        <TableCell align="right" component="th" scope="product">
                          ${size.price}
                        </TableCell>
                      </Fragment>
                    ))}
                    <TableCell align="right">
                      <CancelIcon onClick={() => openHandler(product)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              page={page}
              count={
                length % limit === 0
                  ? Math.floor(length / limit)
                  : Math.floor(length / limit + 1)
              }
              onChange={pageHandler}
            />
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default AdminUpdateItem;
