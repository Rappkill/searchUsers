import React from "react";

function getUsers() {
    let users = [];
    for (let i = 1; i <= 100; i++) {
        users.push({ id: i, name: `User${i}` })
    }
    return users;
}

export { getUsers };