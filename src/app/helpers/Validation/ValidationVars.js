const validation = {
    name :{
      presence: {
        allowEmpty:false,
        message:"^Please Enter Name"
      }
    },
    phone :{
      presence: {
        allowEmpty:false,
        message:"^Please Enter Mobile Number"
      },
      length:{
        minimum:9,
        maximum:14,
        message:"^Please Enter Valid Mobile Number"
      }
    },
    email: {
      presence: {
        allowEmpty:false,
        message: '^Please Enter Email Address'
      },
      email: {
        message: '^Please Enter Valid Email Address'
      }
    },
    
    password: {
      presence: {
        message: '^Please Enter Password'
      },
      length: {
        minimum: 5,
        message: '^Your password must be at least 5 characters'
      }
    },
    card_number : {
      presence: {
        allowEmpty:false,
        message: '^Card Number is required',
      },
      length:{
        minimum:16,
        maximum:16,
        message: '^Please input 16 digit card number'
      }
    },
    pin_number : {
      presence: {
        allowEmpty:false,
        message: '^Pin Number is required',
      },
      length:{
        minimum:4,
        maximum:4,
        message: '^Please input 4 digit pin number'
      }
    }
  }
  
  export default validation