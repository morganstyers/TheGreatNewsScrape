// Headline model
// ==============

// Require mongoose
var mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the headlineSchema with our schema class
var headlineSchema = new Schema({
  headline:{
    type:String,
    required:true
  },
  summary:{
    type:String,
    required:true
  },
  url:{
    type:String,
    required:true
  },
    date:{
      type:String,
    },
    saved:{
      type:Boolean,
      default: false
    } 
  // headline, a string, must be entered

  // summary, a string, must be entered

  // url, a string, must be entered

  // date is just a string

  // saved, boolean default false
});

// Create the Headline model using the headlineSchema
var Headline = mongoose.model("Headline", headlineSchema);

// Export the Headline model
module.exports = Headline;