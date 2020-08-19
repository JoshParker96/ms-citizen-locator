const HttpStatusCodes = {
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404
}

class Http500Error {
    constructor(message) {
        this.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR
        this.message = message
    }
}

class Http404NotFoundError {
    constructor(message) {
        this.statusCode = HttpStatusCodes.NOT_FOUND
        this.message = message
    }
}

module.exports = { 
    Http500Error,
    Http404NotFoundError,
    HttpStatusCodes
}