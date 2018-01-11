/**
 * Handle your goddamn error!
 * @param {Object} errorBag
 * @param {Error | AxiosError} e Maybe error or an axios error
 */
export function handleError(errorBag, e) {
  if (!e.response) {
    return e.message;
  }

  const { status, data } = e.response;
  const { message, errors } = data;
  if (status === 422) {
    errors.forEach(e => errorBag.add(e.field, e.message));
  } else {
    return message;
  }
}
