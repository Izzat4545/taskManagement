import { Document } from "mongoose";

export interface ITask extends Document {
  title?: RegExp;
  completed?: boolean;
}
