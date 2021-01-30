const express = require('express');
const router = express.Router();
const {validateField, validateData} = require('../middleware/validator')

router.post('/validate-rule', async(req,res) => {
    try {
        const {errors, isValid} = validateField(req.body)
        if(!isValid) {
            
            res.status(400).json({ message: errors,
                                    status: "error",
                                    data: null
    })
        } else{
            const result = validateData(req.body)
            res.status(result.statusCode).json({
                message: result.message,
                status: result.status,
                data: {
                    validation: {
                        error: result.data.validation.error,
                        field: result.data.validation.field,
                        field_value: result.data.validation.field_value,
                        condition: result.data.validation.condition,
                        condition_value: result.data.validation.condition_value
                    }
                }
            });


        }
    } catch (error) {
        if(error.type === 'entity.parse.failed') {
            res.status(400).json({message: 'Invalid JSON payload passed.',
                            status: "error",
                             data: null
                            })
        } else {

            res.status(400).json({message: error.message,
            status: "error",
            data: null
            })
        }
    }
})

module.exports = router;