import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const Accordian = () => {
  return (
    <Accordion style={{ maxWidth: '800px' }}>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant='link' eventKey='0'>
            <OpenInNewIcon />
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>Hello! I'm the body</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Accordian;
