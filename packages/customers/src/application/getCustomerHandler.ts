import { CustomersRepository } from "../infra/customersRepository";
import { CustomerDTO } from "./customers.model";

export class GetCustomerHandler {
    constructor(private readonly customersRepository: CustomersRepository) {}

    public async handle(id: string): Promise<CustomerDTO | null> {
        const customer = await this.customersRepository.findById(id);
        if (!customer) {
            return null;
        }

        return CustomerDTO.parse(customer);
    }
}