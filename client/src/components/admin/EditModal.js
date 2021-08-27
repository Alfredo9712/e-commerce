import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Dropdown,
  Alert,
} from 'react-bootstrap';
import {
  ref,
  getStorage,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { firebaseApp } from '../../firebase/config';
import EditIcon from '@material-ui/icons/Edit';
import ImageComponent from './ImageComponent';
import { editProduct } from '../../actions/productsActions';
import { useDispatch } from 'react-redux';
const EditModal = ({ product }) => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(product);
  const [error, setError] = useState(false);
  const storage = getStorage(firebaseApp);

  const [confirm, setConfirm] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  let progress = 0;

  const [file, setFile] = useState();
  const types = ['image/png', 'image/jpeg'];

  const handleClose = () => {
    setShow(false);
    setItem(product);
  };
  const handleShow = () => setShow(true);
  const editHandler = () => {
    dispatch(editProduct(item));
    setShow(false);
  };
  const uploader = async (event) => {
    const selected = event.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');

      const imageRef = ref(storage, event.target.files[0].name);

      const uploadTask = uploadBytesResumable(imageRef, event.target.files[0]);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            progress === 100 && setItem({ ...item, image: downloadURL });
            progress === 100 && setUploaded(true);
            console.log(item);
          });
        }
      );
    } else {
      setError('Please select a png or jpeg image');
    }
  };

  const quantityHandler = (newItem, size) => {
    const updateSizes = item.sizes.map((item) =>
      item.size === size ? { ...item, quantity: newItem } : item
    );
    setItem({ ...item, sizes: updateSizes });
  };
  const priceHandler = (newItem, size) => {
    const updateSizes = item.sizes.map((item) =>
      item.size === size ? { ...item, price: newItem } : item
    );
    setItem({ ...item, sizes: updateSizes });
  };

  return (
    <>
      <EditIcon onClick={handleShow} />

      <Modal show={show} dialogClassName='modal-90w' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <h1>{product.product}</h1>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='text'
                placeholder={product.product}
                value={item.product}
                onChange={(e) => {
                  setItem({ ...item, product: e.target.value });
                }}
              />
            </Form.Group>

            <Dropdown as={Col} style={{ marginTop: '30px' }}>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                {item.category === '' ? 'Select Category' : item.category}
              </Dropdown.Toggle>

              <Dropdown.Menu
                onClick={(e) =>
                  setItem({ ...item, category: e.target.textContent })
                }
              >
                <Dropdown.Item>pants</Dropdown.Item>
                <Dropdown.Item>shirts</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>
          {item.sizes.map((size, index) => (
            <Row key={index}>
              <Form.Group as={Col}>
                <Form.Label>Quantity for {size.size}</Form.Label>
                <Form.Control
                  type='text'
                  value={size.quantity === null ? '' : size.quantity}
                  placeholder='Enter quantity for small'
                  onChange={(e) =>
                    quantityHandler(Number(e.target.value), size.size)
                  }
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Price for {size.size}</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter price for medium'
                  value={size.price === null ? '' : size.price}
                  onChange={(e) =>
                    priceHandler(Number(e.target.value), size.size)
                  }
                />
              </Form.Group>
            </Row>
          ))}
          <Form.Group as={Col}>
            <Form.Label>Upload product photo</Form.Label>

            <div>
              <form action='# '>
                <input
                  type='file'
                  name='file'
                  onChange={(event) => {
                    uploader(event);
                  }}
                />
              </form>
            </div>

            {uploaded === true && (
              <h6 style={{ marginTop: '10px' }}>Uploaded</h6>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={editHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
