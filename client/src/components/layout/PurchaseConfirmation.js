import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
function PurchaseConfirmation({ setShow2, show2 }) {
  const history = useHistory();
  const handleClose = () => setShow2(false);
  const redirectHome = () => {
    history.push('/');
  };
  return (
    <>
      <Modal
        show={show2}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Purchase Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thank you for your Purchase. You will receive an email shortly
          comfirming your order.
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={redirectHome}>
            Redirect
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PurchaseConfirmation;
