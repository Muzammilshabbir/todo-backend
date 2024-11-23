import Sequelize from "sequelize";
import { S3_PATH, LOCAL_ASSET_PATH } from "../utils/constants";
const saltRounds = 10;



const modelNameGetter = (name = "") => {
  return {
    model_name() {
      return name;
    },
  };
};

const generateCoupon = () => {
  const code = Math.floor(100000 + Math.random() * 900000);
  return code.toString();
};

const getUserTimeZone = () => {
  const currentDate = new Date();
  const timezoneOffsetMinutes = currentDate.getTimezoneOffset();

  const hoursOffset = Math.floor(Math.abs(timezoneOffsetMinutes) / 60);
  const minutesOffset = Math.abs(timezoneOffsetMinutes) % 60;
    const sign = timezoneOffsetMinutes > 0 ? "-" : "+";
  
  const utcOffsetString = `${sign}${hoursOffset.toString().padStart(2, "0")}:${minutesOffset.toString().padStart(2, "0")}`;
  return utcOffsetString
}

function generateUniqueString(prefix) {
  const now = new Date();
  const milliseconds = now.getMilliseconds().toString(36);
  const seconds = now.getSeconds().toString(36);
  const minutes = now.getMinutes().toString(36);  
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `${prefix}${minutes}${seconds}${milliseconds}${randomPart}`;
}

const fileGetterSetter = (attr) => {
  return {
    type: Sequelize.DataTypes.TEXT,
    allowNull: true,
    set(value) {
      if (value) {
        let replacedValue = value.replace(S3_PATH, "");
        this.setDataValue(attr, replacedValue);
      } else {
        this.setDataValue(attr, null);
      }
    },
    get() {
      const val = this.getDataValue(attr);
      if (val) {
        if (val.includes(S3_PATH)) return val;
        return `${S3_PATH}${val}`;
      }

      return val;
    },
  };
};

const ensureHttpReg = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return 'http://' + url;
  }
  return url;
}

export {
  modelNameGetter,
  generateCoupon,
  fileGetterSetter,
  generateUniqueString,
  getUserTimeZone,
  ensureHttpReg
};
