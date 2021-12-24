const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61327c14411291599d0d5a8c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            description: 'A photo of a light brown dog with short ears and a pink tongue sticking out, sitting in a field of autumn leaves. The dog is in focus while the sunlight reflects off the light orange and yellow leaves, fading into the background.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvhvaldrm/image/upload/v1630856797/YelpCamp/he3xdnfdkwcmtim3o3qv.jpg',
                    filename: 'YelpCamp/he3xdnfdkwcmtim3o3qv'
                },
                {
                    url: 'https://res.cloudinary.com/dvhvaldrm/image/upload/v1630856797/YelpCamp/owcsnyqm9iabcinzbic8.jpg',
                    filename: 'YelpCamp/owcsnyqm9iabcinzbic8'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})