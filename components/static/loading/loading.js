let curPage

Component({
    data: {},
    properties: {
        error: Boolean,
        fullHeight: Boolean,
        msg: String,
    },
    methods: {
        onError() {
            this.triggerEvent('error')
        }
    },
    lifetimes: {
        attached() {
            curPage = getCurrentPages().slice(-1)[0]
        },
    }
})