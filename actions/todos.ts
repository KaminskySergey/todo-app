"use server";
import { Status, Todo } from "@prisma/client";
import prisma from "../lib/prisma";
import { auth } from "../lib/auth";
import { ITodoCreate } from "@/types/todos";
export async function getAllTodos() {
//   const dateObj = new Date(date + "T00:00:00");
  const todos = await prisma.todo.findMany();
  return todos;
}

export async function getTodosByDate(date: string) {
    const start = new Date(date + "T00:00:00");
    const end = new Date(date + "T23:59:59");
  
    const todos = await prisma.todo.findMany({
      where: {
        startTime: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { startTime: "asc" },
    });
  
    return todos;
  }

export async function createTodo(todo: ITodoCreate) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const newTodo = await prisma.todo.create({
    data: {
      title: todo.title,
      priority: todo.priority,
      status: todo.status,
      startTime: todo.startTime,
      endTime: todo.endTime,
      userId: session?.user.id,
    },
  });
  return newTodo;
}

export async function editTodo(id: string, todo: ITodoCreate) {
  //   const session = await auth();
  //   if (!session?.user?.id) {
  //     throw new Error("Unauthorized");
  //   }

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: todo,
    });
    return updatedTodo;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodo(id: string) {
  try {
    const todo = await prisma.todo.delete({
      where: { id },
    });
    return todo;
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
}

export async function changeStatusTodo(id: string, status: Status) {
  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: {
        status,
      },
    });
    return todo;
  } catch (error) {
    console.error(error);
  }
}
