import axios from "axios";
export const getMonthlyOrders = () => async (dispatch) => {
  const months = [
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
  try {
    const response = await axios("/api/order");
    const request = response.data;
    var data = [];
    months.forEach((month, index) => {
      //prettier-ignore
      data.push({ x: month.x, y: request.filter((i) => i.createdAt.substring(6, 7) == index + 1).reduce((accu, cur) => accu + cur.amount, 0) })
    });

    dispatch({
      type: "ORDER_AMOUNT_MONTHLY",
      payload: [{ id: "revenue", data }],
    });
  } catch (err) {
    console.log(err);
  }
};
