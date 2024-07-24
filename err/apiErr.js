class apiErr extends Error{
    constructor (status, message) {
        super();
        this.status = status;
        this.message = message;
    }


    static BadRequest (message) {
        return new apiErr (404, message)
    }

    static internal (message) {
        return new apiErr (500, message)
    }

    static forbidden (message) {
        return new apiErr (403, message)
    }
}

module.exports = {apiErr}