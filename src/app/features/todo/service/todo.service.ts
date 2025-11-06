import { Injectable } from "@angular/core";
import { TODOS } from "../model/todo.mock";
import { Todo } from "../model/todo.model";

@Injectable()
export class TodoService {
  loadAll(): Todo[] {
    return TODOS;
  }

  addTodo(todo: Partial<Todo>): Todo{
    return {
      id: Math.random().toString(36).substring(2, 9),
      ...todo
    } as Todo;
  }
}
