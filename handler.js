"use strict";
const axios = require("axios");
const api = axios.create({ baseURL: "https://api.telegram.org" });
const config = require("./config.json");
const messages = require("./messages.json");

const sendMessage = (message) => {
    const token = config.token;
    const chat_id = config.chat_id;

    const url = `/bot${token}/sendMessage`;
    return api
        .get(url, {
            params: {
                chat_id: chat_id,
                text: message,
            },
        })
        .then((_) => {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Sent",
                }),
            };
        });
};

module.exports.trainConfirmation = async (event) => {
    return sendMessage(messages.trainConfirmation);
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.attendanceReminder = async (event) => {
    return sendMessage(attendance_reminder);
}
