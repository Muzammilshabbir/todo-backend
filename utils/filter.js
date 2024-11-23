import { Op } from "sequelize";
import Paginator from "./paginator";
import {ROLE_ENUM} from "./constants";

const getOrFilterWithPagination = async ({
  filters = [],
  include = [],
  model,
  page = 0,
  pageSize = 10,
  sort = "DESC",
  nestedSort = null,
}) => {
  try {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    let sortingData = [["id", sort]];
    if (nestedSort) sortingData = [["id", sort], ...nestedSort];
    let filter =
      filters && filters.length > 0
        ? {
            [Op.or]: filters,
          }
        : {};

    let res = await model.findAll({
      where: filter,
      order: [...sortingData],
      include,
      offset: page * pageSize,
      limit: pageSize,
    });

    let pagination = await Paginator.getPagination({
      model,
      page,
      pageSize,
      filter,
    });

    return {
      records: res,
      pagination,
    };
  } catch (error) {
    console.log("Error in filters ", error);
    return {};
  }
};

const getAndFilterWithPagination = async ({
  filters = [],
  include = [],
  model,
  page = 0,
  pageSize = 10,
  sort = "DESC",
  attributes=[],
  nestedSort = null,
  user={},
  showAll=false
}) => {
  try {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    if(user.role === ROLE_ENUM.CUSTOMER && user.user_id) {
      filters.push({created_by: user.user_id})
    }
    let sortingData = [["id", sort]];
    if (nestedSort) sortingData = [["id", sort], ...nestedSort];
    let filter =
      filters && filters.length > 0
        ? {
            [Op.and]: filters,
          }
        : {};

    let params = {
      where: filter,
      order: [...sortingData],
      include,
      offset: page * pageSize,
      limit: pageSize,
    }
    if(attributes.length) {
      params= {...params, attributes}
    }
    let res = await model.findAll(params);

    if (model.name === "Domain" && showAll && user.role === ROLE_ENUM.CUSTOMER) {
      const defaultDomainRecord = await model.findByPk(process.env.PLATFORM_DEFAULT_DOMAIN_ID)
      
      if(defaultDomainRecord) res.unshift(defaultDomainRecord);
    }

    let pagination = await Paginator.getPagination({
      model,
      page,
      pageSize,
      filter,
    });

    return {
      records: res,
      pagination
    };
  } catch (error) {
    console.log("Error in filters ", error);
    return {};
  }
};

const getAndOrFilterWithPagination = async ({
  filtersAnd = [],
  filtersOr = [],
  include = [],
  model,
  page = 0,
  pageSize = 10,
  sort = "DESC",
  nestedSort = null,
}) => {
  try {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    let sortingData = [["id", sort]];
    if (nestedSort) sortingData = [["id", sort], ...nestedSort];

    let filter = {
      [Op.and]: filtersAnd,
      [Op.or]: filtersOr,
    };

    let res = await model.findAll({
      where: filter,
      order: [...sortingData],
      include,
      offset: page * pageSize,
      limit: pageSize,
    });

    let pagination = await Paginator.getPagination({
      model,
      page,
      pageSize,
      filter,
    });

    return {
      records: res,
      pagination,
    };
  } catch (error) {
    console.log("Error in filters ", error);
    return {};
  }
};

export default {
  getOrFilterWithPagination,
  getAndFilterWithPagination,
  getAndOrFilterWithPagination,
};
