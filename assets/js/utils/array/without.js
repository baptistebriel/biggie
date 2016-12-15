export default (arr, ...values) => {
    
    return arr.filter(el => !values.some(exclude => el === exclude))
}