import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { IExample, Example } from '@/models/example';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export default class ExampleService {
    static async create(resource: IExample): Promise<IExample> {
        return await resource.save();
    }

    static async list(findOptions: QueryOptions = {}, sortOptions: ILooseObject = {}, page?: number, limit?: number): Promise<IExample[]> {
        const cursor = Example.find({}, findOptions);
        if (sortOptions) {
            cursor.sort(sortOptions);
        }
        if (page != undefined && limit) {
            cursor.skip(Math.max(page - 1, 0) * limit).limit(limit);
        }
        return cursor;
    }

    static async readById(id: string): Promise<IExample | null> {
        return Example.findById(id).select('-__v').exec();
    }

    static async updateById(administratorId: string, administratorFields: UpdateQuery<IExample>): Promise<IExample> {
        const existingExample = await Example.findByIdAndUpdate(administratorId, administratorFields, { new: true }).exec();
        return existingExample;
    }

    static async update(query: FilterQuery<IExample>, doc: UpdateQuery<IExample>, options: QueryOptions = {}) {
        return Example.updateOne(query, doc, options);
    }

    static async deleteById(id: string): Promise<IExample | null> {
        return Example.findByIdAndDelete(id);
    }

    static async find(
        query: FilterQuery<IExample>,
        findOptions: QueryOptions = {},
        sortOptions: ILooseObject = {},
        page?: number,
        limit?: number,
    ): Promise<IExample[]> {
        const cursor = Example.find(query, findOptions);
        if (sortOptions) {
            cursor.sort(sortOptions);
        }
        if (page != undefined && limit) {
            cursor.skip(Math.max(page - 1, 0) * limit).limit(limit);
        }
        return cursor;
    }
}
