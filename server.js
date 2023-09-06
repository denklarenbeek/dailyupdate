require("dotenv").config();
const axios = require("axios");
const cron = require("node-cron");
const colors = require("colors");
const moment = require("moment");
const { sendEmail } = require("./helper/mailer");

const place = "52.03333,5.65833";
const api_url = `http://api.weatherapi.com/v1/current.json?key=${process.env.apikey}`;

const get_weather_data = async (place) => {
    try {
        const response = await axios.get(
            `${api_url}&q=52.03333,5.65833&aqi=no`
        );
        const { location } = response.data;
        const { current } = response.data;
        return {
            location,
            current,
        };
    } catch (error) {
        console.log(error);
    }
};

const send_message = async () => {
    // const data = await get_weather_data(place);
    sendEmail({
        subject: "Good morning",
        filename: "update",
        toEmail: "dennis.klarenbeek@icloud.com",
    });
    console.log("send");
};

cron.schedule("0 10 * * *", () => {
    console.log(
        colors.inverse(
            `Schedule is started ${moment().format("MMMM Do YYYY, h:mm:ss a")}`
        )
    );
    send_message();
});

// send_message();
