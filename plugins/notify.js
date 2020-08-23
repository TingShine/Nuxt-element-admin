import { Message } from 'element-ui'
import Vue from 'vue'


Vue.prototype.$success = message => {
    Message({
        message: message,
        type: "success"
    })
}

Vue.prototype.$warning = message => {
    Message({
        message: message,
        type: "warning"
    })
}

Vue.prototype.$info = message => {
    Message({
        message: message,
        type: "info"
    })
}

Vue.prototype.$error = message => {
    Message({
        message: message,
        type: "error"
    })
}


