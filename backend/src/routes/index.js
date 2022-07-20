const express = require("express");

const userRoutes = require("./user.routes");

router.use("/users", userRoutes);
