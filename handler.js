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
    let eventMessages = messages.train_confirmation;
    schedule = {
        "Thursday": eventMessages.to_nantes,
        "Friday": eventMessages.to_nantes
    }
    const day = new Date().toLocaleDateString('en', { weekday: 'long' });
    const message = schedule[day] || eventMessages.default;
    
    return sendMessage(message);
};

module.exports.trainToParisReminder = async (event) => {
    return sendMessage(messages.train_confirmation.to_paris);
}

module.exports.attendanceReminder = async (event) => {
    let eventMessages = messages.attendance_reminder;
    schedule = {
        "Monday": eventMessages.on_deadline,
        "Wednesday": eventMessages.before_train,
        "Friday": eventMessages.guache
    }
    const day = new Date().toLocaleDateString('en', { weekday: 'long' });
    const message = schedule[day] || eventMessages.default;
    
    return sendMessage(message);
}
