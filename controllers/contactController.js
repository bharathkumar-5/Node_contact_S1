const contactInformation = require("../models/contactModels")
const authenticateAdmin = require("../middleware/authenticateAdmin");
async function identifyContact(req,res){
    const {email,phoneNumber} = req.body;
    if (!email && !phoneNumber){
        return res.status(400).json({message:"Either email or Phone number is required!"});
    }
    try{
        let existingContact = await contactInformation.findOne({
            $or:[{email},{phoneNumber}]
        })
        if(existingContact){
            return res.join({
                primaryContactId: existingContact._id,
                emails:[existingContact.email],
                phoneNumbers:[existingContact.phoneNumber],
                secondaryContactIds:existingContact.secondaryContactIds
            })
        }
        const newContact = new contactInformation({
            email,
            phoneNumber,
            isPrimary:true,
            secondaryContactIds:[]
        });
        await newContact.save();
        return res.status(201).json({
            primaryContactId: newContact._id,
            emails:[newContact.email],
            phoneNumber:[newContact.phoneNumber],
            secondaryContactIds:[]
        })
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:'Server error'})
    }
}
async function searchContact(req,res){
    try{
        const {email, phoneNumber} = req.query;
        if(!email && !phoneNumber){
            return res.status(400).json({message:'Email or phone number is required for search'});
        }
        const query = email?{email}:{phoneNumber};
        const contacts = await contactInformation.find(query)
        if (contacts.length === 0){
            return res.status(404).json({message:'No contacts found'});
        }
        const result = contacts.filter(contact => contact.isPrimary).map(contact=>({
            primaryContactId: contact._id,
            emails: [contact.email],
            phoneNumbers:[contact.phoneNumber],
            secondaryContactIds: contact.secondaryContactIds
        }))
        if (result.length===0){
            return res.status(404).json({message:'No Primary contacts found'})
        }
        return res.json(result);
    }catch(error){
        return res.status(500).json({message:'Server error'})
    }
}
module.exports = {identifyContact,searchContact}