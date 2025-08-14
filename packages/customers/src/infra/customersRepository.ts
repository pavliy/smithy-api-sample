import { Customer } from "../domain/customer";

export class CustomersRepository {
    public async findById(id: string): Promise<Customer | null> {
        return Promise.resolve(new Customer(
            id,
            "John Doe",
            "john.doe@example.com",
            "123-456-7890"
        ));
    }
}