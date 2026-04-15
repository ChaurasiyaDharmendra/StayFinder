const Listing = require("../models/listing");

// ❌ REMOVE MAPBOX CODE

module.exports.index = async (req, res) => {
    let { category, q } = req.query;
    let query = {};

    if (category) {
        query.category = category;
    }

    if (q) {
        const regex = new RegExp(`\\b${q}\\b`, "i");
        query.$or = [
            { title: regex },
            { location: regex },
            { country: regex }
        ];
    }

    const allListings = await Listing.find(query);

    res.render("listings/index.ejs", { 
        allListings, 
        category: category || "", 
        searchQuery: q || "" 
    });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listings = await Listing.findById(id)
        .populate({path: "reviews", populate: {path: "author"}})
        .populate("owner");

    if(!listings) {
        req.flash("error", "Listing you requested for doesn't exist");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", {listings});
};

module.exports.createListing = async (req, res, next) => {    
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    // ❌ NO MAP / GEOMETRY

    let savedListing = await newListing.save();

    req.flash("success", "New listing created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);

    if(!listing) {
        req.flash("error", "Listing you requested for doesn't exist");
        return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", {listing});
};

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;

    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }

    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing deleted");
    res.redirect("/listings");
};