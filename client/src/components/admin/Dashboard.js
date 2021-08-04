import React from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import ListAltIcon from '@material-ui/icons/ListAlt';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import GroupIcon from '@material-ui/icons/Group';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
const Dashboard = () => {
  const pieData = [
    {
      id: 'hack',
      label: 'Pants',
      value: 200,
      color: 'hsl(231, 70%, 50%)',
    },
    {
      id: 'sass',
      label: 'Shirts',
      value: 464,
      color: 'hsl(319, 70%, 50%)',
    },
  ];

  const data = [
    {
      id: 'Sales',
      color: 'hsl(50, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 107,
        },
        {
          x: 'helicopter',
          y: 82,
        },
        {
          x: 'boat',
          y: 180,
        },
        {
          x: 'train',
          y: 112,
        },
        {
          x: 'subway',
          y: 194,
        },
        {
          x: 'bus',
          y: 188,
        },
        {
          x: 'car',
          y: 124,
        },
        {
          x: 'moto',
          y: 129,
        },
        {
          x: 'bicycle',
          y: 78,
        },
        {
          x: 'horse',
          y: 255,
        },
        {
          x: 'skateboard',
          y: 129,
        },
        {
          x: 'others',
          y: 170,
        },
      ],
    },
  ];
  return (
    <Container
      fluid
      style={{
        flex: '.9',
        backgroundColor: '#f7f0f0',
        marginTop: '1rem',
      }}
    >
      <Row style={{ height: '200px' }}>
        <Col sm={4}>
          <Card
            style={{
              width: '22rem',
              marginTop: '2rem',
              marginLeft: '2rem',
              border: '5px solid #2F4858 ',
            }}
          >
            <Card.Body>
              <Card.Title> Order Statistics</Card.Title>
              <Row>
                <Col>
                  <Card.Subtitle className='mb-2'>
                    #Pending
                    <Card.Subtitle className='mb-2'>Pending</Card.Subtitle>
                  </Card.Subtitle>
                </Col>

                <Col>
                  <Card.Subtitle className='mb-2'>
                    #Shipping
                    <Card.Subtitle className='mb-2'>Shipping</Card.Subtitle>
                  </Card.Subtitle>
                </Col>
                <Col>
                  <Card.Subtitle className='mb-2'>
                    #Completed
                    <Card.Subtitle className='mb-2'>Completed</Card.Subtitle>
                  </Card.Subtitle>
                </Col>
              </Row>

              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <ListAltIcon />
                <Card.Subtitle className='mb-2'>
                  Total Orders
                  <Card.Subtitle className='mb-2'>#ofOrders</Card.Subtitle>
                </Card.Subtitle>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card
            style={{
              width: '22rem',
              marginTop: '2rem',
              marginLeft: '2rem',
              border: '5px solid #2F4858 ',
            }}
          >
            <Card.Body>
              <Card.Title>Earnings</Card.Title>
              <Row>
                <Col>
                  <Card.Subtitle className='mb-2'>
                    #Pending
                    <Card.Subtitle className='mb-2'>Pending</Card.Subtitle>
                  </Card.Subtitle>
                </Col>

                <Col>
                  <Card.Subtitle className='mb-2'>
                    #Shipping
                    <Card.Subtitle className='mb-2'>Shipping</Card.Subtitle>
                  </Card.Subtitle>
                </Col>
                <Col>
                  <Card.Subtitle className='mb-2'>
                    #Completed
                    <Card.Subtitle className='mb-2'>Completed</Card.Subtitle>
                  </Card.Subtitle>
                </Col>
              </Row>

              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <ListAltIcon />
                <Card.Subtitle className='mb-2'>
                  Total Orders
                  <Card.Subtitle className='mb-2'>#ofOrders</Card.Subtitle>
                </Card.Subtitle>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4} style={{ height: '300px' }}>
          <ResponsivePie
            data={pieData}
            enableArcLinkLabels={false}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            colors={{ scheme: 'set1' }}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor='#333333'
            arcLinkLabelsThickness={3}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 20]] }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            legends={[
              {
                anchor: 'bottom',
                direction: 'column',
                justify: false,
                translateX: 200,
                translateY: -30,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]}
          />
        </Col>
      </Row>
      <Row
        style={{
          height: '400px',
          width: '1300px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          yFormat=' >-.2f'
          axisTop={null}
          enablePoints={false}
          pointSize={3}
          axisRight={null}
          colors={{ scheme: 'category10' }}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Row>
      <Row>
        <Col
          style={{
            marginTop: '2rem',
            marginBottom: '2rem',
          }}
        >
          <Card
            style={{
              width: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
              border: '5px solid #2F4858 ',
            }}
          >
            <Card.Body
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '20px',
              }}
            >
              <div className='mb-2' style={{ display: 'flex' }}>
                <TrendingUpIcon style={{ fontSize: 60 }} />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '8px',
                    marginTop: '10px',
                  }}
                >
                  <Card.Subtitle className='mb-2'>#ofOrders</Card.Subtitle>
                  <Card.Subtitle className='mb-2'>Orders</Card.Subtitle>
                </div>
              </div>
              <div className='mb-2' style={{ display: 'flex' }}>
                <GroupIcon style={{ fontSize: 60 }} />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '8px',
                    marginTop: '10px',
                  }}
                >
                  <Card.Subtitle className='mb-2'>#Customers</Card.Subtitle>
                  <Card.Subtitle className='mb-2'>Customers</Card.Subtitle>
                </div>
              </div>
              <div className='mb-2' style={{ display: 'flex' }}>
                <ShoppingBasketIcon style={{ fontSize: 60 }} />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '8px',
                    marginTop: '10px',
                  }}
                >
                  <Card.Subtitle className='mb-2'>#Product</Card.Subtitle>
                  <Card.Subtitle className='mb-2'>Product</Card.Subtitle>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
