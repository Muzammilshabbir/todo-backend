import BaseController from './BaseController'
import model from "../models";
import { Op, Sequelize } from 'sequelize'
import { Filter } from "../utils";
const { Todo } = model;
console.log("herer",Todo); // Should not be undefined

class TodoController extends BaseController {
  constructor() {
    super();
  }

  getAll = async (req, res) => {
    try {
      let filtersArray = [];
      const {page, pageSize, title} = req.query

      if (title) {
        filtersArray.push({
          title: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("title")),
            "LIKE",
            `%${title.toLowerCase()}%`
          ),
        });
      }
    
      const include = []
      let data = await Filter.getAndFilterWithPagination({
        page,
        pageSize,
        filters: filtersArray,
        model: Todo,
        include,
      });
      return this.success(res, data, "Fetched Successfully");
    } catch (error) {
      console.log('error :>> ', error);
      this.serverError(res, error);
    }
  };
  create = async (req, res) => {
    try {
      const todo = await Todo.create(req.body)
      this.success(res, todo);
    } catch (error) {
      console.log('error :>> ', error);
        this.serverError(res, error);
    }
  }
  getOne = async (req, res) => {
    try {
      const todo = await Todo.findByPk(req.params.id)
      this.success(res, todo);
    } catch (error) {
      console.log('error :>> ', error);
        this.serverError(res, error);
    }
  }
  update = async (req, res) => {
    try {
      const { id } = req.params;
      
      const todo = await Todo.findByPk(id)
      if(!Todo)  return this.error(res,404,"Todo", 'Todo not found');
      
      const updatedTodo = await todo.update(req.body);
      this.success(res, updatedTodo);
    } catch (error) {
      console.log('error :>> ', error);
        this.serverError(res, error);
    }
  }
  delete = async (req, res) => {
    try {
      if (req.body.ids) {
        const deletedCount = await Todo.destroy({
          where: {
            id: {
              [Op.in]: req.body.ids
            }
          }
        });
        return this.success(res, null, `${deletedCount} record has been deleted Successfully`);
      }
       this.error(res,404,"ids", 'ids not found');
    } catch (error) {
      console.log('error :>> ', error);
        this.serverError(res, error);
    }
  }
}

const controller = new TodoController();
export default controller;