var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// --- Standard express-generator router imports (keep these as placeholders) ---
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// -----------------------------------------------------------------------------

var app = express();

// view engine setup (if you're not using Pug/Jade, you can remove this block)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); // or 'jade', etc.

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// --- Serve your API routes (these would be your actual backend endpoints) ---
// For this demo, these can remain basic or empty, as data is mocked on frontend.
app.use("/", indexRouter);
app.use("/users", usersRouter);
// You would add more API routes here, e.g., app.use('/api/events', eventsRouter);
// ----------------------------------------------------------------------------

// --- IMPORTANT: Serve the React frontend's static files ---
// This line tells Express to serve the static files (JS, CSS, images, etc.)
// from the 'client/dist' directory, where Vite puts its production build.
// '__dirname' refers to the directory where app.js resides (your project root).
app.use(express.static(path.join(__dirname, "client", "dist")));

// --- IMPORTANT: Catch-all route for client-side routing ---
// Any requests not handled by the API routes above will fall through to here.
// This ensures that React Router (or similar) handles the client-side routing.
// It will serve the 'index.html' from your Vite build for any unhandled path.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error"); // Renders your Express error view template
});

module.exports = app;
