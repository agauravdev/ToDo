import * as uuid from "uuid";
import { APIGatewayProxyEvent } from "aws-lambda";
import { getUserId } from "../lambda/utils";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { TodoItem } from "../models/TodoItem";
import { Todos } from "./DataAccess";
import { CreateTodoRequest } from "../requests/CreateTodoRequest";

const todos = new Todos();

export async function getTodos(event: APIGatewayProxyEvent): Promise<TodoItem[]> {
  const userId = getUserId(event);
  const myTodos = todos.getAll(userId);
  return myTodos
}

export async function createTodo(event: APIGatewayProxyEvent): Promise<TodoItem> {
  const itemId = uuid.v4();
  const userId = getUserId(event);
  const newTodo: CreateTodoRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  const createdTodo = await todos.createTodo(
    {
      createdAt: new Date().toISOString(),
      userId: userId,
      todoId: itemId,
      done: false,
      ...newTodo
    }
  );
  return createdTodo;
}

export async function generateUploadUrl(event: APIGatewayProxyEvent): Promise<string> {
  const todoId = event.pathParameters.todoId;
  const userId = getUserId(event);
  const generatedUrl = await todos.generateUploadUrl(todoId, userId);
  return generatedUrl
}

export async function updateTodo(event: APIGatewayProxyEvent) {
  const todoId = event.pathParameters.todoId;
  const userId = getUserId(event);
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);
  const newTodo = await todos.updateTodo(userId, todoId, updatedTodo);
  return newTodo
}
export async function deleteTodo(event: APIGatewayProxyEvent) {
  const userId = getUserId(event);
  const todoId = event.pathParameters.todoId;
  const deletedTodo = await todos.deleteTodo(todoId, userId);
  return deletedTodo
}
