import { ErrorBag, Validator } from 'vee-validate';

export function handleErrors(eb: ErrorBag, e: any) {
  if (!e.response) {
    return e.message;
  }

  const { status, data } = e.response;
  const { message, errors } = data;
  if (status === 422) {
    errors.forEach((e: any) => eb.add({ field: e.field, msg: e.message }));
  } else {
    return message;
  }
}

export async function validate($validator: Validator) {
  try {
    const ok = await $validator.validateAll();
    if (!ok) throw new Error('Form Validation Failed');
  } catch (e) {
    throw e;
  }
}
