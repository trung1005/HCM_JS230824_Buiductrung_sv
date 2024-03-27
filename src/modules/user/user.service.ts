import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create.dto';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto){
        try{
            let user = await this.prisma.user.create({
                data: {
                    ...data,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                }
            })
            return{
                data: user
            }
        }catch(err){
            return {
                err
            }
        }
    }
    async findByuserName(userName: string){
        try{
            let user = await this.prisma.user.findUnique({
                where: {
                    userName
                }
            })
            if(!user) throw {
                message: " User not found"
            }
            return {
                data: user
            }
        }catch(err){
            return{
                err
            }
        }
    }
}