import { Document, model, Schema } from 'mongoose';

interface IExample extends Document {
    payee: string;
    child: string;
    threeweek: string;
    twoweek: string;
    oneweek: string;
    current: string;
    pending_amount: string;
    over_payment: string;
    pending_credit: string;
    total_amount: string;
}

const exampleSchema = new Schema({
    payee: { type: String, required: true },
    child: { type: String, required: true },
    threeweek: { type: String, required: true },
    twoweek:{ type: String, required: true },
    oneweek: { type: String, required: true },
    current: { type: String, required: true },
    pending_amount: { type: String, required: true },
    over_payment: { type: String, required: true },
    pending_credit:{ type: String, required: true },
    total_amount: { type: String, required: true },
});

const Example = model<IExample>('Example', exampleSchema, 'example');

export { Example, IExample };
