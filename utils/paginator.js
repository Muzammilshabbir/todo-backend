import { PAGE_SIZE, START_PAGE_INDEX } from "../utils/constants";

const getPagination = async ({
  model,
  page = START_PAGE_INDEX,
  pageSize = PAGE_SIZE,
  filter = {},
}) => {
  try {
    let count = await model.count({
      where: filter,
    });
    return {
      recordsCount: count,
      limit: pageSize,
      start: page * pageSize,
      end: parseInt(page * pageSize) + parseInt(pageSize) - 1,
    };
  } catch (error) {
    console.log("Error in paginator ", error);
  }
};

export default { getPagination };
