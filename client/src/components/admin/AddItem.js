import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Dropdown, Alert } from 'react-bootstrap';
import axios from 'axios';
import {
  ref,
  getStorage,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { firebaseApp } from '../../firebase/config';
import ImageComponent from './ImageComponent';
const AddItem = () => {
  const token = localStorage.getItem('token');

  const [confirm, setConfirm] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  let progress = 0;

  const [file, setFile] = useState(null);

  const types = ['image/png', 'image/jpeg'];
  const [error, setError] = useState();
  const storage = getStorage(firebaseApp);

  const [item, setItem] = useState({
    product: '',
    category: '',
    image: '',
    sizes: [
      { size: 'small', quantity: null, price: null },
      { size: 'medium', quantity: null, price: null },
      { size: 'large', quantity: null, price: null },
    ],
  });

  const quantityHandler = (newItem, size) => {
    const updateSizes = item.sizes.map((item) =>
      item.size === size ? { ...item, quantity: newItem } : item
    );
    setItem({ ...item, sizes: updateSizes });
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
  const priceHandler = (newItem, size) => {
    const updateSizes = item.sizes.map((item) =>
      item.size === size ? { ...item, price: newItem } : item
    );
    setItem({ ...item, sizes: updateSizes });
  };
  const sumbitHandler = async (e) => {
    item.sizes.forEach((i) => {
      i.quantity || (i.price === null && setError(true));
    });
    setTimeout(() => {
      setError(false);
    }, 2000);
    if (item.product === '' || item.category === '' || item.image === '') {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      const { category, product, image, sizes } = item;
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      e.preventDefault();
      const response = await axios.post(
        `/api/${category}`,
        {
          category,
          product,
          image,
          sizes,
        },
        config
      );
      console.log(response);
      setConfirm(true);
      setTimeout(() => {
        setConfirm(false);
      }, 2000);

      setItem({
        product: '',
        category: '',
        image: '',
        sizes: [
          { size: 'small', quantity: null, price: null },
          { size: 'medium', quantity: null, price: null },
          { size: 'large', quantity: null, price: null },
        ],
      });
    }
  };
  // useEffect(() => {
  //   if (file !== null) {
  //     const imageRef = ref(storage, file.name);

  //     const uploadTask = uploadBytesResumable(imageRef, file);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {},
  //       (error) => {},
  //       async () => {
  //         // Upload completed successfully, now we can get the download URL
  //         url = await getDownloadURL(uploadTask.snapshot.ref);

  //         setItem({ ...item, image: url });
  //       }
  //     );
  //   }
  // }, [file]);
  return (
    <div style={{ marginTop: '30px' }} className='addProduct'>
      <h1>Add Product</h1>

      {error && <Alert variant='warning'> Please enter all fields</Alert>}
      {confirm && <Alert variant='success'> Item Added</Alert>}
      <Form onSubmit={sumbitHandler} style={{ marginTop: '40px' }}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type='text'
              value={item.product}
              placeholder='Enter Product Name'
              onChange={(e) => setItem({ ...item, product: e.target.value })}
            />
          </Form.Group>

          <Dropdown as={Col} style={{ marginTop: '30px' }}>
            <Dropdown.Toggle variant='dark' id='dropdown-basic'>
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
              <Form.Label style={{ textTransform: 'capitalize' }}>
                Quantity for {size.size}
              </Form.Label>
              <Form.Control
                type='text'
                value={size.quantity === null ? '' : size.quantity}
                placeholder={`Enter quantity for ${size.size}`}
                onChange={(e) =>
                  quantityHandler(Number(e.target.value), size.size)
                }
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Price for {size.size}</Form.Label>
              <Form.Control
                type='text'
                placeholder={`Enter price for ${size.size}`}
                value={size.price === null ? '' : size.price}
                onChange={(e) =>
                  priceHandler(Number(e.target.value), size.size)
                }
              />
            </Form.Group>
          </Row>
        ))}
      </Form>

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

        {uploaded === true && <h6 style={{ marginTop: '10px' }}>Uploaded</h6>}
      </Form.Group>

      <Button
        onClick={sumbitHandler}
        style={{ marginTop: '20px' }}
        disabled={uploaded !== true}
      >
        Submit
      </Button>
    </div>
  );
};

export default AddItem;
