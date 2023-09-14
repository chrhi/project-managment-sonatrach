import * as z from "zod";

export const accountSchema = z.object({
  username: z.string(),
});

export const accountSchemaServer = z.object({
  imageUrl: z.string(),
  username: z.string(),
});
