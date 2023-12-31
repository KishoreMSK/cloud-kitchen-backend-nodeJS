const mongoose = require("mongoose");

const user = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    //   validate: {
    //     validator: (value) => {
    //       return value.length === 10;
    //     },
    //     message: "Phone number must be 10 characters long",
    //   },
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, //will convert the value into lowercase
      immutable: true, // will not allow to change the value once it is created
      //custome validation
    //   validate:{
    //     validator: (value) => {
    //         const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //         return emailRegex.test(value);
    //     },
    //     message: "Invalid email address",
    //   }
    },
    userType: {
      type: String,
      required: true,
    },
    loginPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

user.statics.findByEmail = function(email) {
    return this.where({email})
}

const registerUser = mongoose.model("RegisterUserDetails", user);

module.exports = registerUser;
