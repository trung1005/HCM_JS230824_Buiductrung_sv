import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.dto';
import { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() body: CreateUserDto, @Res() res: Response){
    try{
      let {err,data} = await this.userService.create(body);
      if(err){
        throw {
          message: " Lỗi chưa xác định"
        }
      }
      return res.status(200).json({
        message: "Register Ok"
      });
    }catch(err){
      return res.status(500).json({
        message: err.message ? [err.message] : [" Lỗi chưa xác định"]
      })
    }
  }
}
