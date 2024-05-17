const { sendSmsMessageToUser } = require("../services/user");
const XMLHttpRequest = require("xhr2");

//  var xhr = new XMLHttpRequest();
//---------SMS SENDER FUNCTION-----------------
const sendSMS = (user) => {
  try {
    const request = new XMLHttpRequest();

    request.open("POST", process.env.SMS_URL);

    request.setRequestHeader("Content-Type", "application/json");

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log("Status:", this.status);
        console.log("Headers:", this.getAllResponseHeaders());
        console.log("Body:", this.responseText);
      }
    };

    let message = sendSmsMessageToUser(user);

    const body = {
      from: "max",
      to: user.phone,
      type: "1", // <!-- use 0 for flash sms and 1 for plain sms -->
      message: message,
      app_id: process.env.api_ID,
      app_secret: process.env.api_Secret,
    };

    return request.send(JSON.stringify(body));
  } catch (error) {
    console.log(error);
  }
};
module.exports = sendSMS;
