"use strict";

const autocannon = require("autocannon");

autocannon(
    {
        url: "http://localhost:3000/api/mongo/clients",
        connections: 50,
        duration: 20,
    },
    console.log
);
