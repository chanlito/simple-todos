import Vue from 'vue';
import VueNotifications from 'vue-notifications';
import iziToast from 'izitoast'; // https://github.com/dolce/iziToast
import 'izitoast/dist/css/iziToast.min.css';

function toast({
  id = null,
  title,
  message,
  type,
  timeout = 5000,
  cb,
  icon,
  position = 'bottomRight',
  toastOnce = false,
  progressBar = true
}) {
  if (type === VueNotifications.types.warn) type = 'warning';
  return iziToast[type]({ id, title, message, timeout, cb, icon, position, toastOnce, progressBar });
}

const options = {
  show: toast,
  success: toast,
  error: toast,
  info: toast,
  warn: toast
};

Vue.use(VueNotifications, options);
