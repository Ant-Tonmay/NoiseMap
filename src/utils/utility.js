export function formatDate(date) {
    let month = parseInt(date.getMonth()) + 1;
    if (month < 9) month = "0" + month;

    let dt = date.getDate();
    if (dt < 9) dt = "0" + dt;

    //return dt + "-" + month + "-" + date.getFullYear();
    //return month + "-"+dt+date.getFullYear();
    return date.getFullYear() + "-" + month + "-" + dt
}

export function getColor(colorBand) {
    switch (colorBand.toLowerCase()) {
      case "red":
        return "red";
      case "yellow":
        return "yellow";
      case "green":
        return "green";
      default:
        return "blue"; // Default color if no match
    }
  }
