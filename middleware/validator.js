
const isEmpty = require('is-empty');
const {equal, greater, greaterOrEqual, contains, notEqual} = require('../evaluator')

exports.validateField =({rule ,data}) => {
    let errors = {};
    if(isEmpty(rule) && rule === undefined) {
        errors= "rule is required."
    } 
    if (typeof data === "object" && !Object.keys(data).includes(rule.field)) {
       errors= `field ${rule.field} is missing from data.`
    }
    if(Array.isArray(data) && +rule.field > data.length - 1)  {
        errors= `field ${rule.field} is missing from data.`
    }
    
    if (typeof data === "string" && +rule.field > data.length - 1)  {
        errors= `field ${rule.field} is missing from data.`
    }


      if (typeof data !== 'object' && typeof data !== "string" && !Array.isArray(data)) {
        errors = 'data should be an object, a string or an array.'
    }
    if(isEmpty(data)) {
        errors= "data is required."
    }
      let options = ['field', 'condition', 'condition_value'];
      const value = options.filter(option => !Object.keys(rule).includes(option));
      if(value.length > 0) {
          errors= `rule ${value[0]} is required`
      }
     if (typeof rule != "object") {
         errors = 'rule should be an object.'
     }
     
     const conditions = ['eq', 'neq', 'gt', 'gte', 'contains'];
     if (!conditions.includes(rule.condition) && Object.keys(rule).length > 0) {
        errors = `${rule.condition} is not an accepted condition value.`
     }

      return {
          errors,
          isValid:isEmpty(errors)
      }
};
 
exports.validateData =(body) =>{
    const {rule, data} = body
    const type = checkType(data);

    if (type === 'string') {
        let arr = data.split('');

        if (rule.condition === 'eq') {
            const result = equal(arr[+rule.field], rule.condition_value);

            return response(rule, data, result);
        }

        if (rule.condition === 'neq') {
            const result = notEqual(arr[+rule.field], rule.condition_value);

            return response(rule, data, result);
        }

        if (rule.condition === 'gt' || rule.condition === 'gte') {
            const result = rule.condition === 'gt' ? greater(arr[+rule.field], rule.condition_value) : greaterOrEqual(arr[+rule.field], rule.condition_value);

            return response(rule, data, result);
        }
        if (rule.condition === 'contains') {
            const result = contains(data[+rule.field], rule.condition_value);

            return response(rule, data, result);
        }
    }

    if (type === 'array') {
        if (rule.condition === 'eq') {
            const result = equal(data[+rule.field], rule.condition_value);

            return response(rule, data, result, res);
        }

        if (rule.condition === 'neq') {
            const result = notEqual(data[+rule.field], rule.condition_value);

            return response(rule, data, result);
        }

        if (rule.condition === 'gt' || rule.condition === 'gte') {
            const result = rule.condition === 'gt' ? greater(data[+rule.field], rule.condition_value) : greaterOrEqual(data[+rule.field], rule.condition_value);

            return response(rule, data, result);
        }

        if (rule.condition === 'contains') {
            const result = contains(data[+rule.field], rule.condition_value);

            return response(rule, data, result);
        }
    }

    if (rule.condition === 'eq') {
        const result = equal(data[rule.field], rule.condition_value);

        return response(rule, data, result);
    }

    if (rule.condition === 'neq') {
        const result = notEqual(data[rule.field], rule.condition_value);

        return response(rule, data, result);
    }

    if (rule.condition === 'gt' || rule.condition === 'gte') {
        const result = rule.condition === 'gt' ? greater(data[rule.field], rule.condition_value) : greaterOrEqual(data[rule.field], rule.condition_value);

        return response(rule, data, result);
    }

    const result = contains(data[rule.field], rule.condition_value);

    return response(rule, data, result);
};

const checkType = (body) => {
    if (Array.isArray(body)) return 'array';
    return typeof body};



const response = (rule, data, result) => {
    if (result.value) {
        return {
            statusCode: 200,
            message: `field ${rule.field} successfully validated.`,
            status: 'success',
            data: {
                validation: {
                    error: false,
                    field: rule.field,
                    field_value: result.field_value,
                    condition: rule.condition,
                    condition_value: rule.condition_value
                }
            }
        };
    } else {
        return {
            statusCode: 400,
            message: `field ${rule.field} failed validation.`,
            status: 'error',
            data: {
                validation: {
                    error: true,
                    field: rule.field,
                    field_value: result.field_value,
                    condition: rule.condition,
                    condition_value: rule.condition_value
                }
            }
        }
    }
}