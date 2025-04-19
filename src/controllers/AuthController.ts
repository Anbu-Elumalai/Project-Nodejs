import { JsonController, Post, Body, Res, Req, Get, QueryParams } from 'routing-controllers';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import UserAccessToken from '../models/UserAcesstoken';
// import listRequest from './request/listRequest';
import { listRequest } from './request/listRequest';
import { Request, Response } from 'express';
import ApiError from '../utils/error';
@JsonController('/auth')
export default class AuthController {
    @Post('/login')
    public async login(
        @Body({ validate: true }) params: any,
        @Req() req: Request,
        @Res() res: Response
    ): Promise<any> {
        try {
            console.log('inside');
            const user: any = await User.findOne({ isActive: 1, isDelete: 0 });
            console.log(user, 'oooo');

            if (!user) {
                return res.status(400).send({
                    status: 0,
                    message: 'user not found',
                });
            }

            const token = jwt.sign({ emailId: user.email }, '1234', { expiresIn: '1h' });

            const userToken = new UserAccessToken();
            userToken.userId = user._id;
            userToken.token = token;
            userToken.isActive = 1;
            userToken.isDelete = 0;

            const result = await userToken.save();

            if (result) {
                return res.status(200).send({
                    status: 1,
                    message: 'login successful',
                    data: token,
                });
            } else {
                return res.status(500).json({ error: 'Ha Ocurrido un error' });
            }
        } catch (error: any) {
            // Return an error response
            return res.status(500).send({
                status: 0,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }

    @Get('/')
    public async list(@QueryParams() params: listRequest, @Req() req: Request, @Res() res: Response): Promise<any> {
        console.log('inside');

        const user: any = await User.findOne({ isActive: 1, isDelete: 0 });
        console.log(user, 'oooo');

        if (!user) {
            return res.status(400).send({
                status: 0,
                message: 'user not found',
            });
        }
        const token = jwt.sign({ emailId: user.email }, '1234', { expiresIn: '1h' });

        const userToken = new UserAccessToken();
        userToken.userId = user._id;
        userToken.token = token;
        userToken.isActive = 1;
        userToken.isDelete = 0;
        const result = await userToken.save();
        if (result) {
            return res.status(200).send({
                status: 1,
                message: 'login successful',
                data: token,
            });
        }

    }
}