import { JsonController, Post, Body, Res, Req, Get } from 'routing-controllers';
import { Response, Request } from 'express';
import User from '../models/User';
@JsonController('/users')
export default class UserController {

    @Post()
    public async add(@Body({ validate: true }) params: any, @Req() req: Request, @Res() response: Response): Promise<any> {
        try {
            const user = new User();
            user.name = params.name;
            user.password = params.password;
            user.email = params.email;
            await user.save();
            return response.status(200).json(user);
        } catch (error) {
            return response.status(400).send({
                status: 0,
                message: 'unable to create user'
            });
        }
    }
    /**
     * @api {get} /users Get Users
     * @apiName GetUsers
     * @apiGroup User
     *
     * @apiSuccess {Array} users List of users.
     * @apiSuccess {String} users.id User's unique ID.
     * @apiSuccess {String} users.name User's name.
     *
     * @apiError {String} message Error message.
     */

    // @Authorized()
    @Get('/')
    public async Get(@Req() req: Request, @Res() response: Response): Promise<any> {
        try {
            console.log(req, 'req');

            const user = await User.find({});
            return response.status(200).send({
                status: 1,
                message: 'user listed successful',
                data: user,
            });
        } catch (error) {
            return response.status(400).send({
                status: 1,
                message: 'unable to find user',
            });
        }
    }
}
