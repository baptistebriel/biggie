export default (fn) => {

    let done = false

    return (...args) => {
        if (done) return
        done = true
        fn(...args)
    }
}