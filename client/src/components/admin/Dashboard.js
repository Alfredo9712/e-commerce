import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card, Spinner, Dropdown } from "react-bootstrap";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyOrders,
  months,
  getDailyOrders,
  monthNames,
} from "../../actions/orderActions";
import ListAltIcon from "@material-ui/icons/ListAlt";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import GroupIcon from "@material-ui/icons/Group";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import axios from "axios";
import { map } from "bluebird";
import { getProducts } from "../../actions/productsActions";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const Dashboard = () => {
  const currentMonth = "All";
  const currenntYear = 2021;
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(currenntYear);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.data);
  const title = useSelector((state) => state.orders.title);
  const request = useSelector((state) => state.orders.request);
  const pieData = useSelector((state) => state.orders.pieData);
  const earnings = useSelector((state) => state.orders.earnings);
  const shirtEarnings = useSelector((state) => state.orders.shirtEarnings);
  const pantsEarnings = useSelector((state) => state.orders.pantEarnings);

  const product = useSelector((state) => state.product.data);

  const customers = [...new Set(request.map((i) => i.billingDetails.email))];
  const monthHandler = (index) => {
    setSelectedMonth(index);

    if (index === 0) {
      dispatch(getMonthlyOrders(selectedYear));
    } else {
      dispatch(getDailyOrders(index, selectedYear));
    }
  };
  const yearHandler = (year) => {
    setSelectedYear(year);

    if (selectedMonth === 0) {
      dispatch(getMonthlyOrders(year));
    } else {
      dispatch(getDailyOrders(selectedMonth, year));
    }
  };
  useEffect(() => {
    dispatch(getMonthlyOrders(currenntYear));
    //use state instead
    dispatch(getProducts());
  }, []);

  return (
    <Container
      style={{
        minWidth: "95.8vw",
      }}
    >
      <>
        <Row
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Col
            md={"auto"}
            style={{
              boxShadow:
                "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.24)",
              borderRadius: "15px",
              backgroundColor: "white",
              width: "600px",
            }}
          >
            <h3>Order Statistics</h3>
          </Col>
          <Col
            md={"auto"}
            style={{
              boxShadow:
                "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.24)",
              borderRadius: "15px",
              backgroundColor: "white",
              width: "600px",
            }}
          >
            <Row>
              <Col xs={7}>
                <h3 style={{ display: "inline-block" }}>Earnings </h3>
                <h4> total: ${earnings}</h4>
                <h6>
                  <FiberManualRecordIcon style={{ color: "#1B9E77" }} />
                  pants Revenue: ${pantsEarnings}
                </h6>
                <h6>
                  <FiberManualRecordIcon style={{ color: "#105b45" }} />
                  shirts Revenue: ${shirtEarnings}
                </h6>
                <h3
                  style={{ display: "inline-block", marginTop: "20px" }}
                  className="text-muted"
                >
                  {title}
                </h3>
              </Col>
              <Col xs={5}>
                <div
                  style={{
                    height: "200px",
                    width: "200px",
                  }}
                >
                  <ResponsivePie
                    data={pieData}
                    margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
                    enableArcLinkLabels={false}
                    colors={["#105b45", "#1B9E77"]}
                    enableArcLabels={false}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                      from: "color",
                      modifiers: [["darker", 0.2]],
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                      from: "color",
                      modifiers: [["darker", 2]],
                    }}
                    defs={[
                      {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "rgba(255, 255, 255, 0.3)",
                        size: 4,
                        padding: 1,
                        stagger: true,
                      },
                      {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "rgba(255, 255, 255, 0.3)",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                      },
                    ]}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          {" "}
          <div
            style={{
              height: "400px",
              backgroundColor: "white",
              marginTop: "35px",
              boxShadow:
                "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.24)",
              borderRadius: "15px",
              marginLeft: "20px",
            }}
          >
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="dark"
                      id="dropdown-basic"
                      size="sm"
                    >
                      {selectedMonth === 0
                        ? "All"
                        : monthNames[selectedMonth - 1]}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          monthHandler(0);
                        }}
                      >
                        All Months
                      </Dropdown.Item>

                      {months.map((month, index) => (
                        <Dropdown.Item
                          onClick={() => {
                            monthHandler(index + 1);
                          }}
                        >
                          {month.x}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown>
                    <Dropdown.Toggle
                      variant="dark"
                      id="dropdown-basic"
                      size="sm"
                    >
                      {selectedYear}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={(e) => yearHandler(Number(e.target.text))}
                      >
                        2020
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => yearHandler(Number(e.target.text))}
                      >
                        2021
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h1 style={{ padding: "0", margin: "0" }}>{title}</h1>
                </div>

                <ResponsiveLine
                  data={orders}
                  margin={{ top: 25, right: 100, bottom: 120, left: 60 }}
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
                  colors={{ scheme: "dark2" }}
                  axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,

                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "amount",
                    legendOffset: -40,
                    format: (v) => `$${v}`,

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
              </>
            )}
          </div>
        </Row>
        <Row>
          <Col
            style={{
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Card
              className="test3"
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
                className="test2"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "20px",
                }}
              >
                <Row>
                  <Col xs={"auto"}>
                    <div className="mb-2" style={{ display: "flex" }}>
                      <TrendingUpIcon style={{ fontSize: 40 }} />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "8px",
                          marginTop: "10px",
                        }}
                      >
                        <Card.Subtitle className="mb-2">
                          {request.length}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2">Orders</Card.Subtitle>
                      </div>
                    </div>
                  </Col>

                  <Col xs={"auto"}>
                    <div className="mb-2" style={{ display: "flex" }}>
                      <GroupIcon style={{ fontSize: 40 }} />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "8px",
                          marginTop: "10px",
                        }}
                      >
                        <Card.Subtitle className="mb-2">
                          {customers.length}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2">
                          Customers
                        </Card.Subtitle>
                      </div>
                    </div>
                  </Col>
                  <Col xs={"auto"}>
                    <div className="mb-2" style={{ display: "flex" }}>
                      <ShoppingBasketIcon style={{ fontSize: 40 }} />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "8px",
                          marginTop: "10px",
                        }}
                      >
                        <Card.Subtitle className="mb-2">
                          {product.length}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2">Products</Card.Subtitle>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    </Container>
  );
};

export default Dashboard;
