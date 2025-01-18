import * as z from 'zod';

export const loginViaPhoneNumberSchema = z.object({
  phoneNumber: z
    .string({ required_error: 'field is requierd' })
    .min(1, 'שדה חובה') // Ensures the field is not empty
    .regex(/^05\d{8}$/, 'מספר שגוי'),
});
