const express = require("express");

const app = express();

app.use(logger);

//GET /books => this should return response of { route: "/books"}

app.get("/books", (req, res) => {
	return res.send({ route: "/books", role: req.role });
});

app.use(checkPermission);
//GET / libraries => this should return response of { route: "/libraries", permission: true}

app.get("/libraries", checkPermission("librarian"), (req, res) => {
	return res.send({
		route: "/libraries",
		role: req.role,
		permission: req.permission,
	});
});

//GET /authors => this should return response of { route: "/authors", permission: true}

app.get("/authors", checkPermission("author"), (req, res) => {
	return res.send({ route: "/authors", role: req.role, permission: true });
});

//You need to create a logger middleware that will work for all route handlers and it will log request path

function logger(req, res, next) {
	if (req.path === "/books") {
		req.role = "books";
	} else if (req.path === "/libraries") {
		req.role = "libraries";
	} else if (req.path === "/authors") {
		req.role = "authors";
	}
	console.log("working");
	next();
}

function checkPermission(role) {
	return function logger(req, res, next) {
		if (role === "libraries" || role === "authors") {
			req.permission = "true";
		}
		next();
	};
}

app.listen(5000, () => {
	console.log("Listening to port 5000");
});
