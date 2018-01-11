export async function validateSubmit(v) {
  try {
    const pass = await v.validateAll();
    if (!pass) throw new Error('Form Validation Failed');
  } catch (e) {
    throw e.message;
  }
}
