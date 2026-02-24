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
            enum:['ceo', 'hr', 'team_lead', 'senior','junior'],
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

orgMemberSchema.index(
  { employeeEmail: 1, organization: 1 },
  { unique: true, sparse: true }
)
module.exports = mongoose.model("OrganizationMembership", orgMemberSchema);