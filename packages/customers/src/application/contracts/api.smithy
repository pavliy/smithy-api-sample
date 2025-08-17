$version: "2"
namespace uk.co.samplecompany

use aws.protocols#restJson1
use aws.api#service
use smithy.framework#ValidationException

@service(sdkId: "CustomersRegistry")
@restJson1
@title("${awsAccountName}")
service CustomerRegistryApi {
    version: "1.0"
    operations: [
        GetCustomer,
    ],
    errors: [
        BadRequestError,
        ValidationException,
        NotFoundError
    ]
}