function validateContact(data){
    const {email,phoneNumber}= data;
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/;
    if(email && !emailRegex.test(email)){
        return{valid:false,error:"Invalid Email"};
    }
    if (phoneNumber && !phoneRegex.test(phoneNumber)){
        return {valid:false,error:"Invalid Phone number Format"}

    }
    return{valid:true};
}
module.exports = validateContact;