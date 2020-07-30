export const checkEqual = (fields, a, b) => {
    let res = true

    fields.forEach(field => {
        if(a[field] !== b[field]) {
            res = false
        }
    });

    return res
}