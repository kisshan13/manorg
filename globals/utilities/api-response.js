class ApiResponse {
    constructor({status, message,  data=null}) {
        this.status = status
        this.message = message

        if(data) {
            this.data = data
        }

        this.success = status < 399
    }
}

export default ApiResponse