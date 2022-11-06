const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const priceRand = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "633f2258886762b8a69a13bd",
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: "http://source.unsplash.com/collection/483251",
      price: priceRand,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      images: [
        {
          url: "https://res.cloudinary.com/dhlvzthux/image/upload/v1667590777/YelpCamp/ahlk0pibvruzviojy8ng.jpg",
          filename: "YelpCamp/ahlk0pibvruzviojy8ng",
        },
        {
          url: "https://res.cloudinary.com/dhlvzthux/image/upload/v1667590777/YelpCamp/qg9vnrdcffwagqbpyxfz.jpg",
          filename: "YelpCamp/qg9vnrdcffwagqbpyxfz",
        },
      ],
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
