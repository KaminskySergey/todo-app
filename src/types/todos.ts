import { Priority, Status } from "@prisma/client";

export interface ITodo {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  startTime: Date | string;
  endTime: Date | string;
  completed: boolean;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ITodoCreate {
  title: string;
  priority: Priority;
  status: Status;
  startTime: string | Date;
  endTime: string | Date;
}

// export enum Priority {
//     LOW = "LOW",
//     MEDIUM = "MEDIUM",
//     HIGH = "HIGH",
//   }
  
// export enum Status {
//     TODO = "TODO",
//     IN_PROGRESS = "IN_PROGRESS",
//     DONE = "DONE",
//   }
  