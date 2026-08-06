import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { Todo } from "../model/todo.model";
import { computed, inject } from "@angular/core";
import { TodoService } from "../service/todo.service";
import { MessageService } from "@openng/optimus-ui/api";

export type TodoFilter = "all" | "pending" | "completed";

type TodosState = {
  todos: Todo[],
  filteredTodos: Todo[],
  loading: boolean,
  filter: TodoFilter
};

const initialState: TodosState = {
  todos: [],
  filteredTodos: [],
  loading: false,
  filter: "all"
};

export const TodoStore = signalStore(
  withState<TodosState>(initialState),
  withComputed((state) => ({
    filteredTodos: computed(() => {
      const todos = state.todos();
      switch (state.filter()) {
        case "all":
          return todos;
        case "pending":
          return todos.filter(todo => !todo.completed);
        case "completed":
          return todos.filter(todo => todo.completed);
      }
    })
  })),
  withProps(() => ({
    todoService: inject(TodoService),
    messageService: inject(MessageService),
  })),
  withMethods((store) => ({
    loadAll() {
      const todos = store.todoService.loadAll();
      patchState(store, { todos }, { loading: true })
    },
    addTodo(title: string) {
      const todo = store.todoService.addTodo({ title, completed: false});
      patchState(store, (state) => ({
        todos: [...state.todos,todo]
      }));
      store.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: `Le tâche "${todo.title}" a été ajouté`
      });
    },
    updateTodo(id: number, completed: boolean) {
      const todo = store.todos().filter((todo: Todo) => todo.id === id).pop();
      if (todo) {
        patchState(store, (state) => ({
          todos: state.todos.map(todo => todo.id == id ? {...todo, completed} : todo)
        }));
        if (completed) {
          store.messageService.add({
            severity: 'success',
            summary: 'Terminé',
            detail: `Le tâche "${todo.title}" est terminée`
          });
        } else {
          store.messageService.add({
            severity: 'warn',
            summary: 'En cours',
            detail: `Le tâche "${todo.title}" est en cours`
          });
        }
      }
    },
    deleteTodo(id: number) {
      const todo = store.todos().filter((todo: Todo) => todo.id === id).pop();
      if (todo) {
        patchState(store, (state) => ({
          todos: state.todos.filter(todo => todo.id != id)
        }));
        store.messageService.add({
          severity: 'warn',
          summary: 'Succès',
          detail: `Le tâche "${todo.title}" a été supprimée`
        });
      }
    },
    updateFilter(filter: TodoFilter) {
      patchState(store, { filter });
    }
  })),
  withHooks(store => ({
    onInit() {
      store.loadAll()
    }
  }))
);
