const http = require('node:http');
const fs = require('node:fs');
const queryString = require("node:querystring");
const url = require("url");

const server = http.createServer((req, res) => {
    try {
        if (req.url.startsWith("/user")) {
            if (req.method === "GET") {
                let query = req.url.split('user');
                // console.log(query);
                if (!(query.length === 2)) {
                    res.writeHead(400, { "content-type": "text/plain" });
                    res.end("You provide only single id on url.");
                } else {
                    if (query.at(-1) === "" || query.at(-1) === "/") {
                        fs.readFile("./database.json", "utf8", (err, data) => {
                            if (err) throw new Error(err);
                            res.statusCode = 200;
                            if (!data) {
                                res.setHeader("content-type", 'text/plain');
                                res.end("There is no data registered, you have first insert data.")
                            } else {
                                res.writeHead(200, { "content-type": "application/json" });
                                let result = {
                                    users: JSON.parse(data).users.map(user => {
                                        return { "username": user.username, "age": user.age };
                                    })
                                }
                                res.end(JSON.stringify(result));
                            }
                        });
                    } else {
                        let key = query.pop().slice(1);
                        fs.readFile("./database.json", "utf8", (err, data) => {
                            if (err) throw new Error(err);
                            res.statusCode = 200;
                            if (!data) {
                                res.setHeader("content-type", 'text/plain');
                                res.end("There is no data registered, you have first insert data.")
                            }
                            // let users = []
                            let user = JSON.parse(data).users.filter(user => user.username === key);

                            if (!user.toString()) {
                                res.writeHead(404, { "content-type": "text/plain" });
                                res.end(`No user found with username ${key}`);
                            } else {
                                res.writeHead(200, { "content-type": "application/json" });
                                res.end(JSON.stringify(user));
                            }
                        })
                    }
                }
            }
            if (req.method === "POST") {
                let data;
                try {
                    req.on('data', (chunk) => {
                        data += chunk.toString();
                    })
                } catch (err) {
                    res.writeHead(400, { "content-type": "text/plain" });
                    res.end("Invalid Data in body");
                }

                req.on('end', () => {
                    let parse;
                    try {
                        parse = JSON.parse(data.replace(undefined, ""));
                    } catch (err) {
                        parse = queryString.parse(data);
                    }
                    // console.log(parse, data);
                    let temp = Object.keys(parse);
                    if (temp.length !== 3 || !(temp.includes("username") && temp.includes("password") && temp.includes("age"))) {
                        res.writeHead(400, { "content-type": "text/plain" });
                        res.end("Only upload username, password, update, do not add any other fields.");
                    } else {
                        fs.readFile("./database.json", "utf8", (err, data2) => {
                            if (err) throw new Error(err);

                            data2 = JSON.parse(data2);

                            let temp = data2.users.filter(user => user.username === parse.username);
                            // console.log(temp);
                            if (temp.length !== 0) {
                                res.writeHead(400, { "content-type": "text/plain" });
                                res.end("Username Already exists.");
                            } else {
                                data2.users.push({ username: parse.username, password: parse.password, age: parse.age });

                                fs.writeFile("./database.json", JSON.stringify(data2), "utf8", (err) => {
                                    if (err) throw new Error(err);
                                    res.writeHead(200, { "content-type": "text/plain" });
                                    res.end("The User has been added");
                                })
                            }
                        });
                    }

                })

                req.on("error", (err) => {
                    res.writeHead(400, { "content-type": "text/plain" });
                    res.end("Invalid Data in body");
                })
            }
            if (req.method === "PUT") {
                let data;
                let username = (req.url.split('/').at(-1) === "") ? req.url.split('/').at(-2) : req.url.split('/').pop();
                try {
                    req.on('data', (chunk) => {
                        data += chunk.toString();
                    })
                } catch (err) {
                    res.writeHead(400, { "content-type": "text/plain" });
                    res.end("Invalid Data in body");
                }

                req.on('end', () => {
                    let parse;
                    try {
                        parse = JSON.parse(data.replace(undefined, ""));
                    } catch (err) {
                        parse = queryString.parse(data);
                    }
                    // console.log(parse, data);
                    let temp = Object.keys(parse);
                    if (temp.length !== 2 || !(temp.includes("password") && temp.includes("age"))) {
                        res.writeHead(400, { "content-type": "text/plain" });
                        res.end("Only upload password, age, do not add any other fields.");
                    } else {
                        fs.readFile("./database.json", "utf8", (err, data2) => {
                            if (err) throw new Error(err);

                            data2 = JSON.parse(data2);

                            let temp = data2.users.filter(user => user.username === username);
                            // console.log(temp);
                            if (temp.length === 0) {
                                res.writeHead(404, { "content-type": "text/plain" });
                                res.end("Username Not exists.");
                            } else {
                                data2.users = data2.users.map(user => {
                                    if (user.username === username) {
                                        user.password = parse.password ?? user.password;
                                        user.age = parse.age ?? user.age;
                                    }
                                    return user;
                                });
                                fs.writeFile("./database.json", JSON.stringify(data2), "utf8", (err) => {
                                    if (err) throw new Error(err);
                                    res.writeHead(200, { "content-type": "text/plain" });
                                    res.end(`The fields are updated for user:${username}`);
                                })
                            }
                        });
                    }
                })
            } if (req.method === "PATCH") {
                let data;
                let username = (req.url.split('/').at(-1) === "") ? req.url.split('/').at(-2) : req.url.split('/').pop();
                try {
                    req.on('data', (chunk) => {
                        data += chunk.toString();
                    })
                } catch (err) {
                    res.writeHead(400, { "content-type": "text/plain" });
                    res.end("Invalid Data in body");
                }

                req.on('end', () => {
                    let parse;
                    try {
                        parse = JSON.parse(data.replace(undefined, ""));
                    } catch (err) {
                        parse = queryString.parse(data);
                    }

                    // console.log(parse, data);
                    let temp = Object.keys(parse);
                    if (!(temp.includes("password") || temp.includes("age"))) {
                        res.writeHead(400, { "content-type": "text/plain" });
                        res.end("Atleast upload any of password, age, do not add any other fields.");
                    } else {
                        fs.readFile("./database.json", "utf8", (err, data2) => {
                            if (err) throw new Error(err);

                            data2 = JSON.parse(data2);

                            let temp = data2.users.filter(user => user.username === username);
                            // console.log(temp);
                            if (temp.length === 0) {
                                res.writeHead(404, { "content-type": "text/plain" });
                                res.end("Username Not exists.");
                            } else {
                                data2.users = data2.users.map(user => {
                                    if (user.username === username) {
                                        user.password = parse.password ?? user.password;
                                        user.age = parse.age ?? user.age;
                                    }
                                    return user;
                                });
                                fs.writeFile("./database.json", JSON.stringify(data2), "utf8", (err) => {
                                    if (err) throw new Error(err);
                                    res.writeHead(200, { "content-type": "text/plain" });
                                    res.end(`The fields are updated for user:${username}`);
                                })
                            }
                        });
                    }
                })
            } if (req.method === "DELETE") {
                let username = (req.url.split('/').at(-1) === "") ? req.url.split('/').at(-2) : req.url.split('/').pop();
                fs.readFile("./database.json", "utf8", (err, data) => {
                    if (err) throw new Error(err);

                    data = JSON.parse(data);

                    let temp = data.users.filter(user => user.username === username);
                    // console.log(temp);
                    if (temp.length === 0) {
                        res.writeHead(404, { "content-type": "text/plain" });
                        res.end("Username Not exists.");
                    } else {
                        data.users = data.users.filter(user => user.username !== username);
                        fs.writeFile("./database.json", JSON.stringify(data), "utf8", (err) => {
                            if (err) throw new Error(err);
                            res.writeHead(200, { "content-type": "text/plain" });
                            res.end(`Deleted user:${username}`);
                        })
                    }
                });
            }
        } else {
            res.statusCode = 404;
            res.end("Invalid Url Path");
        }
    } catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.end("something went wrong");
    }
});

server.listen(5000, () => {
    console.log("The server is listening on port 5000");
})