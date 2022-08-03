import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { IExample, Example } from '@/models/example';
import InvalidBuildDataError from '@common/errors/InvalidBuildDataError';
import BaseFactory from './BaseFactory';

export default class ExampleFactory extends BaseFactory {
    public static checkKeysInModel(keys: string | string[]) {
        return super._checkKeysInModel(keys, Example);
    }

    static generateExample(data: any): IExample {
        if (this.checkValidBuildData(data)) {
            if (data.email) data.email = data.email.toLowerCase();
            return new Example(data);
        } else {
            throw new InvalidBuildDataError('Example');
        }
    }

    static checkValidBuildData(data: ILooseObject): boolean {
        return !!data && data.password && data.firstname && data.lastname && data.username && data.email;
    }
}
