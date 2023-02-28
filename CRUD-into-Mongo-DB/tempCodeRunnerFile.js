const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

// console.log(process.env);

mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log(conn);
    console.log("DB Connection Successful");
  })
  .catch((error) => {
    console.log("Some error has occured"+ error );
  });

// Creating a Schema :we have to describe the dataType of eacch field we wanted to add ; We can also pass a second optional argument after the datatypes
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  category: String,
  description: String,
  image: String,
});

//We can take this schema definition further by defining schemaTypeOptions for the fields ; using schemaTypeOptions we can describe the type of field , whether the field is required or not , whether the field is required or not ; like we have done down :
// const productSchema=new mongoose.Schema({
//     title : {type:String
// required: true},  // we can do this and other properties to rest of fileds also
//     price : {type: Number
//required: [true,''Name is required field !]}, // adding validation error message  ; require here is known as validator ; There are also many other validators in the mongoose ; also we can add our custom validators in mongoose
//     category : {type:String,
// unique:true},
//     description : {type: String,
// default:1.0},
//     image : String
// })
// Creating the Model :Have two args (nameOfTheModel,schemaBasedOnWhichWantToCraeteTheModel)
const Product = mongoose.model("Product", productSchema); // In the db a collection of name Product will be made(but the collection name will be plural) ; using product model we can perform crud in the db

// Creating the document from the model :
const testProduct = new Product({
  title: "product2",
  price: 50,
  category: "category2",
  description: "description2",
  image: "https://image2.png",
});
// Saving this document in the database :
testProduct
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("error occured: " + err);
  }); // as ths .save method will return a promise ; so we can consume that promise using the .then() and can pass a callback function which is going to receive the new documents just created and can console it AND in case the document is not received then we can catch the error  
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server has started...");
});
