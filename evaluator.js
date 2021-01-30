const equal = (a, b) => {
    return {
        value: a === b,
        field_value: a
    };
};

const notEqual = (a, b) => {
    return {
        value: a !== b,
        field_value: a
    };
};
 const greater = (a, b) => {
    return {
        value: a > b,
        field_value: a
    };
};
 const greaterOrEqual = (a, b) => {
    return {
        value: a >= b,
        field_value: a
    } ;
};

const contains = (a, b) => {
    return {
        value: a === b,
        field_value: a
    }
};
exports.equal =equal
exports.contains =contains
exports.greater =greater
exports.greaterOrEqual =greaterOrEqual
exports.notEqual =notEqual
 