import { pgEnum } from 'drizzle-orm/pg-core';

export const sexEnum = pgEnum('sex', ['male', 'female']);
export const paymentMethodEnum = pgEnum('payment_method', ['cash', 'prompt_pay', 'true_wallet']);
