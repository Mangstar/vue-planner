import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ru';

dayjs.locale('ru');

dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.extend(updateLocale);

dayjs.updateLocale('ru', {
  weekdays : ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  weekdaysShort: ['пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт', 'вск'],
  weekdaysMin: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
});

const Dayjs = {};

Dayjs.install = function (Vue) {
  Object.defineProperty(Vue.prototype, '$date', {
    get () {
      return dayjs
    }
  })
}

export default Dayjs;