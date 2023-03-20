const journeyValidation = (row) => {
    return row.length == 8

    const isString = (text) => {
        return typeof text === 'string' || text instanceof String
    }

    const isDate = (date) => {
        return Boolean(Date.parse(date))
    }

}
module.exports = { journeyValidation }