"use strict";

const autocannon = require("autocannon");

autocannon(
    {
        url: "http://localhost:3000/api/mongo/clients",
        method: "POST",
        connections: 20,
        duration: 15,
        headers: {
            "Content-Type": "application/json",
            Cookie: "sessionId=REAL_SESSION_ID",
        },
        body: JSON.stringify({
            name: "Perf Client",
            email: "perf@test.com",
        }),
    },
    console.log
);
