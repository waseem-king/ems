// seed_categories.js
require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/category.model"); // Change path to your Category model
const Organization = require("../models/organization.model"); // Change path to your Organization model
const userModel = require("../models/user.model");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ems";

// --------------- Static category keywords (same as your AI model) -----------------
const CATEGORY_KEYWORDS = {
  food: ["restaurant","food","meal","lunch","dinner","breakfast","coffee","cafe","pizza","burger","sandwich","snack","drink","beverage","grocery","supermarket","cook","kitchen","delivery","takeout"],
  transportation: ["uber","lyft","taxi","cab","gas","fuel","petrol","parking","toll","bus","train","metro","subway","flight","airline","car","vehicle","auto","transport","travel","rent","lease"],
  shopping: ["amazon","ebay","walmart","target","store","shop","buy","purchase","clothing","clothes","shoes","accessories","gift","electronics","phone","laptop","computer","furniture"],
  entertainment: ["movie","film","netflix","spotify","hulu","disney","game","gaming","concert","ticket","event","show","party","club","bar","night","entertainment","hobby","sport","gym","fitness"],
  utilities: ["electric","electricity","water","gas bill","internet","wifi","phone bill","mobile","utility","bill","power","cable","net"],
  healthcare: ["doctor","hospital","pharmacy","medicine","drug","medical","health","dental","dentist","eye","vision","prescription","therapy","insurance","clinic","wellness"],
  education: ["book","course","tuition","school","college","university","training","workshop","class","education","learning","exam","subscription","membership"],
  office: ["office","supplies","staples","printer","ink","paper","desk","chair","equipment","software","license","domain","hosting","cloud","service"],
  travel: ["hotel","motel","airbnb","resort","lodging","accommodation","vacation","trip","booking","hostel","suite","room"],
  other: []
};

// --------------- Helper to get random array element -----------------
function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --------------- Seed function -----------------
async function seedCategories() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // 1️⃣ Clear existing custom categories if needed
    await Category.deleteMany({ type: "custom" });

    // 2️⃣ Fetch all organizations
    const organizations = await Organization.find({});
    console.log(`Found ${organizations.length} organizations`);

    const categoriesToInsert = [];

    // 3️⃣ System categories for individual users
    const userTypes = ["student", "housewife", "freelancer", "single shop owner", "single worker"];
    const users = await userModel.find();
    for (let i = 0; i < 550; i++) {
      const name = `${randomElement(Object.keys(CATEGORY_KEYWORDS))} - ${randomElement(userTypes)}`;
      const randomUser = randomElement(users);
      categoriesToInsert.push({
        name,
        type: "custom",
        ownerId: randomUser._id, // belongs to individual users
      });
    }

    // 4️⃣ Categories for organizations
    organizations.forEach(org => {
      const orgCategoryCount = Math.floor(Math.random() * 5) + 5; // 5-9 categories per org
      for (let i = 0; i < orgCategoryCount; i++) {
        const name = `${randomElement(Object.keys(CATEGORY_KEYWORDS))} - ${org.name}`;
        categoriesToInsert.push({
          name,
          type: "custom",
          ownerId: org._id,
        });
      }
    });

    // 5️⃣ Insert all categories
    await Category.insertMany(categoriesToInsert);
    console.log(`Inserted ${categoriesToInsert.length} categories successfully`);

    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding categories:", err);
    mongoose.disconnect();
  }
}

seedCategories();