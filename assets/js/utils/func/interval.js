export default (callback, opts = { delay: 500, duration: 1500 }) => {

    let rAF, start, loop
    
    const tick = now => {

        if (now - loop >= opts.delay) {
            loop = now
            callback()
        }

        if (now - start < opts.duration) {
            rAF = requestAnimationFrame(tick)
        } else {
            cancelAnimationFrame(rAF)
        }
    }
    
    start = loop = performance.now()
    rAF = requestAnimationFrame(tick)
}