import { Document, model, Schema } from 'mongoose';

interface ITodo extends Document {
    firstname: string;
    lastname: string;
    role: string;
    username: string;
    email: string;
}

const todoSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String },
    role:{ type: String },
    email: { type: String, required: true },
});

const Todo = model<ITodo>('Todo', todoSchema, 'todos');

export { Todo, ITodo };
