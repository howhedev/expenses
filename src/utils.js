export const currencyFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export const dateParser = (inputDate) => {
  const date = {
    day: "0",
    month: "00",
    year: "0000",
  };

  inputDate = inputDate.split("-");

  date.day = inputDate[2];
  date.year = inputDate[0];

  switch (inputDate[1]) {
    case "01":
      date.month = "Jan";
      break;
    case "02":
      date.month = "Feb";
      break;
    case "03":
      date.month = "Mar";
      break;
    case "04":
      date.month = "Apr";
      break;
    case "05":
      date.month = "May";
      break;
    case "06":
      date.month = "Jun";
      break;
    case "07":
      date.month = "Jul";
      break;
    case "08":
      date.month = "Aug";
      break;
    case "09":
      date.month = "Sep";
      break;
    case "10":
      date.month = "Oct";
      break;
    case "11":
      date.month = "Nov";
      break;
    default:
      date.month = "Dec";
  }

  return date;
};

export const expensesMapper = (expenses) => {
  const expensesMapped = expenses.map(
    ({ id, description, amount, date, category, expOrInc }) => {
      date = dateParser(date);

      amount = expOrInc === "expense" ? -amount : +amount;

      const expenseMapped = {
        id: id,
        name: description,
        type: category,
        date: date,
        price: amount,
        expOrInc: expOrInc,
      };
      return expenseMapped;
    }
  );

  return expensesMapped;
};

export const graphDataMapper = (expenses) => {
  const expensesMapped = expenses.map(({ amount, date, expOrInc }) => {
    const splitDate = date.split("-");

    const expenseMapped = {
      month: splitDate[1] * 1,
      year: splitDate[0] * 1,
      price: amount * 1,
      expOrInc: expOrInc,
    };

    return expenseMapped;
  });

  return expensesMapped;
};
