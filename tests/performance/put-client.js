"use strict";

const autocannon = require("autocannon");

autocannon(
    {
        url: "http://localhost:3000/api/mongo/clients/6952537607410f8d5c596ad6",
        method: "PUT",
        connections: 20,
        duration: 15,
        headers: {
            "Content-Type": "application/json",
            Cookie: "sessionId=REAL_SESSION_ID",
        },
        body: JSON.stringify({
            name: "Updated via Perf",
        }),
    },
    console.log
);
