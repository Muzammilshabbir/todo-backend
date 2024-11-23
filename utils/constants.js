const S3_PATH = "https://tmio-production.s3.amazonaws.com/";
const LOCAL_ASSET_PATH = "http://localhost:5000";

const IS_ACTIVE_STATUS = "ACTIVE";
const PAGE_SIZE = 10;
const START_PAGE_INDEX = 0;

const FPS = 10;
const RESOLUTION = "720x480";
const BIT_RATE = "150k";

const MODELS = [
  "ShortUrl",
  "User",
  "MobileTarget",
];

const STATUS_ENUM = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

const ROLE_ENUM = {
  ADMIN: "admin",
  ADMIN_ID:1,
  CUSTOMER: "customer",
};

export {
  IS_ACTIVE_STATUS,
  PAGE_SIZE,
  START_PAGE_INDEX,
  FPS,
  RESOLUTION,
  BIT_RATE,
  MODELS,
  // RESPONSE_IMPORTS,
  STATUS_ENUM,
  ROLE_ENUM,
  S3_PATH,
  LOCAL_ASSET_PATH,
};
