import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as uuid from "uuid";
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class DriverService {
  constructor(private readonly prisma: PrismaService,
    private readonly mailService: MailService,

  ) {}


  async create(createDriverDto: CreateDriverDto) {
    const { userId, is_verified, ...driverData } = createDriverDto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { role: 'driver' },
    });

    const activationLink = uuid.v4(); 

    const driver = await this.prisma.driver.create({
      data: {
        User: { connect: { id: userId } },
        link: activationLink, 
        is_verified: false,
        ...driverData,
      },
    });

    const activationUrl = `3.78.122.117/driver/activate/${activationLink}`;
    await this.mailService.sendActivationEmail(user.email, activationUrl);

    return {
      message: 'Driver created. Activation email sent.',
      driverId: driver.id,
    };
  }


  async activate(link: string) {
    console.log("hello2");

    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const driver = await this.prisma.driver.findFirst({
      where: {
        link,
        is_verified: false,
      },
    });
    
    if (!driver) {
      throw new BadRequestException("driver already activates or link is invalid");
    }

    const updateDriver = await this.prisma.driver.update({
      where: { id: driver.id },
      data: { is_verified: true },
    });

    const response = {
      message: "User activated successfully",
      driver: updateDriver.is_verified,
    };

    return response;
  }

  async findAll() {
    return this.prisma.driver.findMany({ include: { User: true, raiting: true } });
  }

  async findOne(id: number) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
      include: { User: true },
    });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    return driver;
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    const driver = await this.prisma.driver.findUnique({ where: { id } });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    return this.prisma.driver.update({
      where: { id },
      data: updateDriverDto,
    });
  }

  async remove(id: number) {
    const driver = await this.prisma.driver.findUnique({ where: { id } });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    return this.prisma.driver.delete({ where: { id } });
  }
}
