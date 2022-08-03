import { RESPONSE_CODE, RESPONSE_FAILURE, RESPONSE_SUCCESS } from '@/common/Constants';
import { locale } from '@/config/locales';
import ExampleFactory from '@/factories/ExampleFactory';
import ExampleService from '@/services/ExampleService';
import { sendResponse } from '@/utils/common';
import { logger } from '@/utils/logger';
import { isEmpty, isObjectId } from '@utils/util';
import { NextFunction, Request, Response } from 'express';

class ExampleController {
    static async create(req: Request, res: Response) {
        if (isEmpty(req.body)) return sendResponse(res, {}, locale('Example_INVALID_DATA'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
        const exampleData = ExampleFactory.generateExample(req.body);
        const example = await ExampleService.create(exampleData);

        return sendResponse(res, example, locale('Example_CREATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.CREATED);
    }

    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const examples = await ExampleService.list();
            return sendResponse(res, examples, locale('Example_GET_ALL_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('ExampleController.getAll() Error: ', error);
            next(error);
        }
    };

    static getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.exampleId)) return sendResponse(res, {}, locale('Example_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const exampleId: string = req.params.exampleId;
            const findOneExampleData = await ExampleService.readById(exampleId);
            return sendResponse(res, findOneExampleData, locale('Example_GET_ONE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('ExampleController.getOne() Error: ', error);
            next(error);
        }
    };

    static update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.exampleId)) return sendResponse(res, {}, locale('Example_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            if (isEmpty(req.body)) return sendResponse(res, {}, locale('Example_INVALID_DATA'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const exampleId: string = req.params.exampleId;
            const exampleData = req.body;
            const updateExampleData = await ExampleService.updateById(exampleId, { $set: exampleData });

            return sendResponse(res, updateExampleData, locale('Example_UPDATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('ExampleController.update() Error: ', error);
            next(error);
        }
    };

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.exampleId)) return sendResponse(res, {}, locale('Example_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const exampleId: string = req.params.exampleId;
            await ExampleService.deleteById(exampleId);

            return sendResponse(res, null, locale('Example_DELETE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('ExampleController.delete() Error: ', error);
            next(error);
        }
    };
}

export default ExampleController;
