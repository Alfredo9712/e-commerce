import axios from "axios";
export const months = [
  { x: "jan" },
  { x: "feb" },
  { x: "mar" },
  { x: "apr" },
  { x: "may" },
  { x: "jun" },
  { x: "jul" },
  { x: "aug" },
  { x: "sep" },
  { x: "oct" },
  { x: "nov" },
  { x: "dec" },
];

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const year = new Date().getFullYear();
const daysOfMonths = months.map((month, index) => {
  const days = new Date(year, index + 1, 0).getDate();
  return { x: month.x, days };
});

const getDailyPercentages = (month, year, orders) => {
  var shirts = 0;
  var shirtPrice = 0;
  var pants = 0;
  var pantPrice = 0;

  const filteredMonth = orders.filter(
    (i) =>
      i.createdAt.substring(6, 7) == month &&
      i.createdAt.substring(0, 4) == year
  );

  filteredMonth.forEach((order) => {
    shirts += order.order
      .filter((i) => i.category === "shirts")
      .reduce((accu, cur) => accu + cur.quantityPurchased, 0);
    shirtPrice += order.order
      .filter((i) => i.category === "shirts")
      .reduce((accu, cur) => accu + cur.price, 0);
    pants += order.order
      .filter((i) => i.category === "pants")
      .reduce((accu, cur) => accu + cur.quantityPurchased, 0);
    pantPrice += order.order
      .filter((i) => i.category === "pants")
      .reduce((accu, cur) => accu + cur.price, 0);
  });
  const earnings = filteredMonth.reduce((accu, cur) => accu + cur.amount, 0);

  return {
    shirts,
    shirtPrice,
    pantPrice,
    pants,
    earnings,
  };

  // const shirts = console.log('orders' + '' + orders);
};
const getDailyStats = async (month, year) => {
  const response = await axios.get("/api/order");
  const filteredMonth = response.data.filter(
    (i) =>
      i.createdAt.substring(6, 7) == month &&
      i.createdAt.substring(0, 4) == year
  );

  const totalOrders = filteredMonth.length;
  const pendingOrders = filteredMonth.filter(
    (order) => order.complete === false
  );
  const completeOrders = filteredMonth.filter(
    (order) => order.complete === true
  );

  return {
    totalOrders,
    pendingOrders,
    completeOrders,
  };
};
export const getDailyOrders =
  (selectedMonth, selectedYear) => async (dispatch) => {
    const filtered = daysOfMonths.filter(
      (i, index) => index + 1 == selectedMonth
    );
    try {
      const response = await axios("/api/order");
      const request = response.data;
      var data = [];

      for (let x = 1; x <= filtered[0].days; x++) {
        data.push({
          x,
          y: request
            .filter(
              (i) =>
                i.createdAt.substring(8, 10) == x &&
                i.createdAt.substring(6, 7) == selectedMonth &&
                i.createdAt.substring(0, 4) == selectedYear
            )
            .reduce((accu, cur) => accu + cur.amount, 0),
        });
      }
      const { shirts, pants, earnings, shirtPrice, pantPrice } =
        getDailyPercentages(selectedMonth, selectedYear, request);
      const { totalOrders, pendingOrders, completeOrders } =
        await getDailyStats(selectedMonth, selectedYear);

      dispatch({
        type: "ORDER_AMOUNT_DAILY",
        payload: [{ id: "revenue", data }],
        title: monthNames[selectedMonth - 1],
        request,
        shirtPrice,
        totalOrders,
        pendingOrders,
        completeOrders,
        pantPrice,
        earnings,
        pieData: [
          {
            id: "shirts",
            label: "shirts",
            value: shirts ? shirts : 0,
          },
          {
            id: "pants",
            label: "pants",
            value: pants ? pants : 0,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

const getMonthlyPercentages = (year, orders) => {
  var shirts = 0;
  var pantPrice = 0;
  var shirtPrice = 0;

  var pants = 0;
  const filteredYear = orders.filter(
    (i) => i.createdAt.substring(0, 4) == year
  );
  filteredYear.forEach((order) => {
    shirtPrice += order.order
      .filter((i) => i.category === "shirts")
      .reduce((accu, cur) => accu + cur.price, 0);
    shirts += order.order
      .filter((i) => i.category === "shirts")
      .reduce((accu, cur) => accu + cur.quantityPurchased, 0);
    pants += order.order
      .filter((i) => i.category === "pants")
      .reduce((accu, cur) => accu + cur.quantityPurchased, 0);
    pantPrice += order.order
      .filter((i) => i.category === "pants")
      .reduce((accu, cur) => accu + cur.price, 0);
  });
  const total = shirts + pants;
  const shirtsPercentage = (shirts / total) * 100;
  const earnings = filteredYear.reduce((accu, cur) => accu + cur.amount, 0);

  const pantsPercentage = (pants / total) * 100;
  return {
    shirts,
    pants,
    shirtPrice,
    pantPrice,
    earnings,
  };

  // const shirts = console.log('orders' + '' + orders);
};

export const getMonthlyOrderStats = async (year) => {
  const response = await axios.get("/api/order");
  const filteredYear = response.data.filter(
    (i) => i.createdAt.substring(0, 4) == year
  );
  const totalOrders = filteredYear.length;
  const pendingOrders = filteredYear.filter(
    (order) => order.complete === false
  );
  const completeOrders = filteredYear.filter(
    (order) => order.complete === true
  );
  return {
    totalOrders,
    pendingOrders,
    completeOrders,
  };
};
export const getMonthlyOrders = (selectedYear) => async (dispatch) => {
  try {
    const response = await axios("/api/order");
    const request = response.data;
    var data = [];
    months.forEach((month, index) => {
      data.push({
        x: month.x,
        y: request
          .filter(
            (i) =>
              i.createdAt.substring(6, 7) == index + 1 &&
              i.createdAt.substring(0, 4) == selectedYear
          )
          .reduce((accu, cur) => accu + cur.amount, 0),
      });
    });
    const { shirts, pants, earnings, shirtPrice, pantPrice } =
      getMonthlyPercentages(selectedYear, request);
    const { totalOrders, pendingOrders, completeOrders } =
      await getMonthlyOrderStats(selectedYear);

    dispatch({
      type: "ORDER_AMOUNT_MONTHLY",
      payload: [{ id: "revenue", data }],
      title: selectedYear,
      request,
      shirtPrice,
      pantPrice,
      earnings,
      pieData: [
        {
          id: "shirts",
          label: "shirts",
          value: shirts ? shirts : 0,
        },
        {
          id: "pants",
          label: "pants",
          value: pants ? pants : 0,
        },
      ],
      totalOrders,
      pendingOrders,
      completeOrders,
    });
  } catch (err) {
    console.log(err);
  }
};
