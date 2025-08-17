$version: "2"
namespace uk.co.samplecompany

/// An error message
string ErrorMessage

@error("client")
@httpError(400)
structure BadRequestError {
    @required
    message: ErrorMessage
}

@error("client")
@httpError(404)
structure NotFoundError {
    @required
    message: ErrorMessage
}

@error("client")
@httpError(422)
structure UnprocessableEntityError {
    @required
    message: ErrorMessage
}

/// An internal failure at the fault of the server
@error("server")
@httpError(500)
structure InternalFailureError {
    @required
    message: ErrorMessage
}