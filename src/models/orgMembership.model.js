const mongoose = require("mongoose");

const orgMemberSchema = new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        organization:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required:true,
        },
        role:{
            type:String,
            enum:['ceo', 'hr', 'team_load', 'senior','junior'],
            default:"junior"
        },
        employeeEmail:{
            type:String
        },
        about:{
            type:String,
        },
        isActive:{
            type:Boolean,
            default:true
        },
        joinedAt:{
            type:Date,
            default:Date.now
        }
},
{
    timestamps:true
}
)

module.exports = mongoose.model("OrganizationMembership", orgMemberSchema);