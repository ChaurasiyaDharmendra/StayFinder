const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    mongoose.connect(MONGO_URL);
};

const initDB = async () => {
    await Listing.deleteMany({});   
    initData.data = initData.data.map((obj) => ({...obj, owner: "6871229c269d71e7086f934a"}));
    await Listing.insertMany(initData.data);    
    console.log("Data was initisalised");
};

initDB();
