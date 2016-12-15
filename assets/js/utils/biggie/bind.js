import slice from '../array/slice'
import route from './route'

export default {

    add: (a) => {

        slice(a).forEach((el) => el.onclick = route)
    },
    
    remove: (a) => {

        slice(a).forEach((el) => el.onclick = null)
    }
}