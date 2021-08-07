import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import ListAltIcon from "@material-ui/icons/ListAlt";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import GroupIcon from "@material-ui/icons/Group";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import useWindowDimensions from "./windowSize";
import "../../test.scss";
const Dashboard = () => {
  // console.log(width);
  const pieData = [
    {
      id: "hack",
      label: "Pants",
      value: 200,
      color: "hsl(231, 70%, 50%)",
    },
    {
      id: "sass",
      label: "Shirts",
      value: 464,
      color: "hsl(319, 70%, 50%)",
    },
  ];

  const data = [
    {
      id: "Sales",
      color: "hsl(50, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 107,
        },
        {
          x: "helicopter",
          y: 82,
        },
        {
          x: "boat",
          y: 180,
        },
        {
          x: "train",
          y: 112,
        },
        {
          x: "subway",
          y: 194,
        },
        {
          x: "bus",
          y: 188,
        },
        {
          x: "car",
          y: 124,
        },
        {
          x: "moto",
          y: 129,
        },
        {
          x: "bicycle",
          y: 78,
        },
        {
          x: "horse",
          y: 255,
        },
        {
          x: "skateboard",
          y: 129,
        },
        {
          x: "others",
          y: 170,
        },
      ],
    },
  ];
  return (
    <Container
      style={{
        // backgroundColor: '#f7f0f0',
        // backgroundColor: "#F2F2F2",
        // height: "100vh",
        minWidth: "94.4vw",
      }}
    >
      <>
        <Row
          style={{
            minHeight: "200px",
            width: "91.9vw",
            backgroundColor: "red",
            justifyContent: "space-around",
          }}
        >
          <Col md={"auto"}>
            <Card
              style={{
                width: "400px",
                marginTop: "2rem",
                // marginLeft: "auto",

                // marginRight: "auto",
                boxShadow:
                  "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.24)",
                borderRadius: "15px",
              }}
            >
              <Card.Body>
                <Card.Title> Order Statistics</Card.Title>
                <Row>
                  <Col>
                    <Card.Subtitle className="mb-2">
                      #Pending
                      <Card.Subtitle className="mb-2">Pending</Card.Subtitle>
                    </Card.Subtitle>
                  </Col>

                  <Col>
                    <Card.Subtitle className="mb-2">
                      #Shipping
                      <Card.Subtitle className="mb-2">Shipping</Card.Subtitle>
                    </Card.Subtitle>
                  </Col>
                  <Col>
                    <Card.Subtitle className="mb-2">
                      #Completed
                      <Card.Subtitle className="mb-2">Completed</Card.Subtitle>
                    </Card.Subtitle>
                  </Col>
                </Row>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ListAltIcon />
                  <Card.Subtitle className="mb-2">
                    Total Orders
                    <Card.Subtitle className="mb-2">#ofOrders</Card.Subtitle>
                  </Card.Subtitle>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={"auto"}>
            {" "}
            <Card
              style={{
                width: "400px",
                // marginLeft: "auto",

                // marginRight: "auto",
                marginTop: "2rem",

                boxShadow:
                  "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.24)",
                borderRadius: "15px",
              }}
            >
              <Card.Body>
                <Card.Title> Order Statistics</Card.Title>
                <Row>
                  <Col>
                    <Card.Subtitle className="mb-2">
                      #Pending
                      <Card.Subtitle className="mb-2">Pending</Card.Subtitle>
                    </Card.Subtitle>
                  </Col>

                  <Col>
                    <Card.Subtitle className="mb-2">
                      #Shipping
                      <Card.Subtitle className="mb-2">Shipping</Card.Subtitle>
                    </Card.Subtitle>
                  </Col>
                  <Col>
                    <Card.Subtitle className="mb-2">
                      #Completed
                      <Card.Subtitle className="mb-2">Completed</Card.Subtitle>
                    </Card.Subtitle>
                  </Col>
                </Row>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ListAltIcon />
                  <Card.Subtitle className="mb-2">
                    Total Orders
                    <Card.Subtitle className="mb-2">#ofOrders</Card.Subtitle>
                  </Card.Subtitle>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row
          style={{
            minHeight: "400px",
            marginTop: "20px",
          }}
        >
          {" "}
          <div
            style={{
              height: "400px",
              backgroundColor: "white",

              boxShadow:
                "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.24)",
              borderRadius: "15px",
            }}
          >
            <ResponsiveLine
              data={data}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
              }}
              yFormat=" >-.2f"
              axisTop={null}
              enablePoints={false}
              pointSize={3}
              axisRight={null}
              colors={{ scheme: "category10" }}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "transportation",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "count",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </Row>
        {/* <Row>
          <Col
            style={{
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Card
              style={{
                width: "800px",
                marginLeft: "auto",
                marginRight: "auto",
                boxShadow:
                  "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.24)",
                borderRadius: "15px",
              }}
            >
              <Card.Body
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "20px",
                }}
              >
                <div className="mb-2" style={{ display: "flex" }}>
                  <TrendingUpIcon style={{ fontSize: 60 }} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "8px",
                      marginTop: "10px",
                    }}
                  >
                    <Card.Subtitle className="mb-2">#ofOrders</Card.Subtitle>
                    <Card.Subtitle className="mb-2">Orders</Card.Subtitle>
                  </div>
                </div>
                <div className="mb-2" style={{ display: "flex" }}>
                  <GroupIcon style={{ fontSize: 60 }} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "8px",
                      marginTop: "10px",
                    }}
                  >
                    <Card.Subtitle className="mb-2">#Customers</Card.Subtitle>
                    <Card.Subtitle className="mb-2">Customers</Card.Subtitle>
                  </div>
                </div>
                <div className="mb-2" style={{ display: "flex" }}>
                  <ShoppingBasketIcon style={{ fontSize: 60 }} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "8px",
                      marginTop: "10px",
                    }}
                  >
                    <Card.Subtitle className="mb-2">#Product</Card.Subtitle>
                    <Card.Subtitle className="mb-2">Product</Card.Subtitle>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
      </>
    </Container>
  );
};

export default Dashboard;
