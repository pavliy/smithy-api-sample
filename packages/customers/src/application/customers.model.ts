import { z } from "zod";

export const CustomerDTO = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
});

export type CustomerDTO = z.infer<typeof CustomerDTO>;