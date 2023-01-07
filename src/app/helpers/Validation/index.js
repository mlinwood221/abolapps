import validation from './ValidationVars'
import validatejs from 'validate.js'

export default function validate(fieldName, value, custom = null) {
  
  if(!custom){
      var formValues = {}
      formValues[fieldName] = value 
      var formFields = {}
      formFields[fieldName] = validation[fieldName]
    
      const result = validatejs(formValues, formFields)
    
      // If there is an error message, return it!
      if (result) {
        // Return only the field error message if there are multiple
        return result[fieldName][0]
      }
  }else{
    const result = validatejs(value, custom)
    
      // If there is an error message, return it!
      if (result) {
        // Return only the field error message if there are multiple
        return result[fieldName][0]
      }
  }
  

  return null
}