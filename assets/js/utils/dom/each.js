export default (nodelist, callback) => {
      
    let i = -1
    const l = nodelist.length

    while (++i < l)
        callback({ el: nodelist.item(i), index: i })
}