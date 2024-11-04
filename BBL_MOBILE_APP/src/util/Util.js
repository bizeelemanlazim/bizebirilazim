import Req from './Req';
import Const from './Const';

export default Util = {
  loadUtils: arry => {
    arry.forEach(async item => {
      await Req[item]();
    });
  },
  getFormattedDate: date => {
    let dt = new Date(date);
    let month = dt.getUTCMonth(); //months from 1-12
    let day = dt.getUTCDate();
    let year = dt.getUTCFullYear();
    return day + " " + Const.MONTH[month] + " " + year;
  },
};
