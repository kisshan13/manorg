export default class ClientSideError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status
    }
}