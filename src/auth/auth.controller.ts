import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from 'src/decorators/cookie-getter.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserSignInDto } from 'src/user/dto/sign_in-user.dto';
import { AdminCreatorGuard } from 'src/guards/admin.creator.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Yangi foydalanuvchilarni ro'yxatdan o'tkazish" })
  @Post('sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(
    @Body() userSignInDto: UserSignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(userSignInDto, res)
  }

  @HttpCode(HttpStatus.OK)
  @Get("sign-out")
  signout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res)
  }

  @HttpCode(HttpStatus.OK)
  @Get(":id/refresh")
  refresh(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res)
  }
  
  
  @ApiOperation({ summary: "Yangi admin ro'yxatdan o'tkazish" })
  @Post('admin/sign-up')
  @UseGuards(AdminCreatorGuard)
  signUpAdmin(@Body() createAdminDto: CreateUserDto) {
    
    return this.authService.adminSignUp(createAdminDto)
  }
  
  @ApiOperation({ summary: "Admin tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post('admin/sign-in')
  adminSignIn(
    @Body() adminSignInDto: UserSignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.adminSignIn(adminSignInDto, res)
  }
  
  @HttpCode(HttpStatus.OK)
  @Get("admin/sign-out")
  AdminSignout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.adminSignOut(refreshToken, res)
  }
  
  
  @HttpCode(HttpStatus.OK)
  @Get("admin/:id/refresh")
  AdminRefresh(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.adminRefreshToken(+id, refreshToken, res)
  }
  
}
