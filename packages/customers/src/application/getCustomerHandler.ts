import { GetCustomerInput, GetCustomerOutput, NotFoundError } from "../../output/ts-server/typescript-ssdk-codegen/src";
import { CustomersRepository } from "../infra/customersRepository";


export class GetCustomerHandler {
    constructor(private readonly customersRepository: CustomersRepository) {}

    public async handle(input: GetCustomerInput): Promise<GetCustomerOutput> {
        const customer = await this.customersRepository.findById(input.customerId);
        if (!customer) {
            throw new NotFoundError({ message: "" });
        }

        return {
            customer: {
                id: customer.id,
                name: customer.name,
                phoneNumber: customer.phoneNumber,
                email: customer.email,
            }
        }
    }
}