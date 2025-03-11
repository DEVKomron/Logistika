import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { Role, User } from "@prisma/client";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import { UserSignInDto } from "src/user/dto/sign_in-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async getTokens(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }),
        ]);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async signUp(createUserDto: CreateUserDto) {
        const condiate = await this.userService.findByEmail(
            createUserDto.email
        );
        if (condiate) {
            throw new BadRequestException("Bunday foydalanuvchi mavjud");
        }
        const newUser = await this.userService.create(createUserDto);

        const response = {
            message:
                "Tabriklayman tizimga qo'shildingin",
            userId: newUser.id,
        };

        return response;
    }

    async signIn(userSignInDto: UserSignInDto, res: Response) {
        const { email, password } = userSignInDto;

        if (!email || !password) {
            throw new BadRequestException("Email va parol kiritilishi shart");
        }

        const user = await this.userService.findByEmail(email);
        console.log(user);
        

        if (!user) {
            throw new UnauthorizedException("Invalid Email or password");
        }
        const validPassword = await bcrypt.compare(
            userSignInDto.password,
            user.hashed_password
        );
        if (!validPassword) {
            throw new UnauthorizedException("paroling xato xozirchalika ");
        }

        const tokens = await this.getTokens(user);

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

        const updateUser = await this.userService.updateRefreshToken(
            user.id,
            hashed_refresh_token
        );
        if (!updateUser) {
            throw new InternalServerErrorException("Tokenni saqlashda xatolik");
        }
        res.cookie("refresh_token", tokens.refresh_token, {
            maxAge: Number(process.env.COOKIE_TIME),
            httpOnly: true,
        });
        const response = {
            message: "User logged in",
            userId: user.id,
            access_token: tokens.access_token,
        };

        return response;
    }

    async signOut(refreshToken: string, res: Response) {
        const userData = await this.jwtService.verify(refreshToken, {
            secret: process.env.REFRESH_TOKEN_KEY,
        });
        if (!userData) {
            throw new ForbiddenException("User not verified");
        }
        const hashed_refresh_token = null;
        await this.userService.updateRefreshToken(
            userData.id,
            hashed_refresh_token
        );

        res.clearCookie("refresh_token");

        const response = {
            message: "User logged out successfully",
        };
        return response;
    }
    
        async adminSignUp(createAdminDto: CreateUserDto) {
            const candidate = await this.userService.findByEmail(createAdminDto.email);
            if (candidate) {
                throw new BadRequestException("Bunday admin allaqachon mavjud");
            }
    
            createAdminDto.role = Role.admin; 
            const newAdmin = await this.userService.create(createAdminDto);
    
            return {
                message: "Tabriklayman, admin sifatida tizimga qo'shildingiz",
                adminId: newAdmin.id
            };
        }
    
        async adminSignIn(adminSignInDto: UserSignInDto, res: Response) {

            const { email, password } = adminSignInDto;
    
            if (!email || !password) {
                throw new BadRequestException("Email va parol kiritilishi shart");
            }
    
            const admin = await this.userService.findByEmail(email);
            if (!admin) {
                throw new UnauthorizedException("Email yoki parol noto‘g‘ri");
            }
    
            if (admin.role !== Role.admin && admin.role !== Role.superAdmin) {
                throw new ForbiddenException("Siz admin emassiz");
            }
    
            const validPassword = await bcrypt.compare(password, admin.hashed_password);
            if (!validPassword) {
                throw new UnauthorizedException("Email yoki parol noto‘g‘ri");
            }
    
            const tokens = await this.getTokens(admin);
            const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    
            const updateAdmin = await this.userService.updateRefreshToken(admin.id, hashed_refresh_token);
            if (!updateAdmin) {
                throw new InternalServerErrorException("Tokenni saqlashda xatolik yuz berdi");
            }
    
            res.cookie("refresh_token", tokens.refresh_token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
            
    
            return {
                message: "Admin tizimga muvaffaqiyatli kirdi",
                adminId: admin.id,
                access_token: tokens.access_token
            };
        }
    
        async adminSignOut(refreshToken: string, res: Response) {
            const adminData = await this.jwtService.verify(refreshToken, {
                secret: process.env.REFRESH_TOKEN_KEY,
            });
    
            if (!adminData || adminData.role !== Role.admin) {
                throw new ForbiddenException("Admin tasdiqlanmadi");
            }
    
            await this.userService.updateRefreshToken(adminData.id, null);
    
            res.clearCookie("refresh_token");
    
            return { message: "Admin tizimdan chiqdi" };
        }
    
        async adminRefreshToken(id: number, refreshToken: string, res: Response) {
            const decodedToken = await this.jwtService.decode(refreshToken);
    
            if (!decodedToken || id !== decodedToken["id"]) {
                throw new BadRequestException("Ruxsat etilmagan");
            }
    
            const admin = await this.userService.findOne(id);
            if (!admin || admin.role !== Role.admin || !admin.hashed_refresh_token) {
                throw new BadRequestException("Admin topilmadi yoki noto‘g‘ri rol");
            }
    
            const tokenMatch = await bcrypt.compare(refreshToken, admin.hashed_refresh_token);
            if (!tokenMatch) {
                throw new ForbiddenException("Yangi token olish rad etildi");
            }
    
            const tokens = await this.getTokens(admin);
            const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    
            await this.userService.updateRefreshToken(admin.id, hashed_refresh_token);
    
            res.cookie("refresh_token", tokens.refresh_token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
    
            return {
                message: "Admin token yangilandi",
                adminId: admin.id,
                access_token: tokens.access_token,
            };
        }
    
        async refreshToken(id: number, refreshToken: string, res: Response) {
            const decodedToken = await this.jwtService.decode(refreshToken);
            
            if (!decodedToken || id !== decodedToken["id"]) {
                throw new BadRequestException("Ruxsat etilmagan");
            }
    
            const user = await this.userService.findOne(id);
            if (!user || !user.hashed_refresh_token) {
                throw new BadRequestException("Foydalanuvchi topilmadi");
            }
    
            const tokenMatch = await bcrypt.compare(refreshToken, user.hashed_refresh_token);
            if (!tokenMatch) {
                throw new ForbiddenException("Yangi token olish rad etildi");
            }
    
            const tokens = await this.getTokens(user);
            const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    
            await this.userService.updateRefreshToken(user.id, hashed_refresh_token);
    
            res.cookie("refresh_token", tokens.refresh_token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
    
            return {
                message: "Foydalanuvchi token yangilandi",
                userId: user.id,
                access_token: tokens.access_token,
            };
        }

    }
    

