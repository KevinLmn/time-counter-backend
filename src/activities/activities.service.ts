import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async timeAvailableAfterActivity(id: number, time: number): Promise<number> {
    const timeOfLeisureLeft = await this.getTotalTimeOfLeisure(id);
    return timeOfLeisureLeft - time;
  }

  async getTotalTimeOfLeisure(id: number): Promise<number> {
    const timeLogs = await this.prisma.timeLogs.findMany({
      where: {
        UserID: id,
      },
    });
    let totalTimeOfLeisure = 0;
    timeLogs.forEach((element) => {
      if (element.isLeisure === false) totalTimeOfLeisure += element.Time;
      if (element.isLeisure === true) totalTimeOfLeisure -= element.Time;
    });
    return totalTimeOfLeisure;
  }
}
