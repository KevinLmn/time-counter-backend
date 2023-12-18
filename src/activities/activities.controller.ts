import { Controller, Get, Post, Put, Request } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { TimeLogs } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { NotEnoughTimeError } from 'src/Errors/Errors';
import { ActivitiesService } from './activities.service';

export class CreateActivityDto {
  ActivityName: string;
  Ratio: number;
  UsedId: number;
}

export class UpdateActivityDto {
  ActivityId: number;
  ActivityName: string | null;
  ActivityParametersId: number | null;
  Ratio: number | null;
  UsedId: number | null;
}

export class DeleteActivityDto {
  ActivityId: number;
}

@Controller('activities')
class ActivitiesController {
  constructor(
    private readonly prisma: PrismaService,
    private activitiesService: ActivitiesService,
  ) {}

  @Post('/activities/create')
  @ApiBody({ type: CreateActivityDto })
  async createActivity(@Request() req): Promise<any> {
    try {
      const activity = await this.prisma.activities.create({
        data: {
          ActivityName: req.body.ActivityName,
        },
      });
      const activityParameters = await this.prisma.activityParameters.create({
        data: {
          Ratio: req.body.Ratio,
          UserID: req.body.UserId,
          ActivityID: activity.ID,
        },
      });
      return { activity, activityParameters };
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('/activities/end')
  async startActivity(@Request() req): Promise<TimeLogs> {
    const timeLog = await this.prisma.timeLogs.create({
      data: {
        UserID: req.body.userId,
        ActivityID: req.body.activityId,
        RatioAtTheTime: req.body.ratioAtTheTime,
        Time: req.body.time,
        isLeisure: req.body.isLeisure,
      },
    });
    return timeLog;
  }

  @Post('/activities/delete')
  @ApiBody({ type: DeleteActivityDto })
  async deleteActivity(@Request() req): Promise<TimeLogs> {
    const deletedTimeLog = await this.prisma.timeLogs.delete({
      where: {
        ID: req.body.timeLogId,
      },
    });
    return deletedTimeLog;
  }

  @Put('/activities/update')
  @ApiBody({ type: UpdateActivityDto })
  async updateActivity(@Request() req): Promise<string> {
    try {
      await this.prisma.activities.update({
        where: {
          ID: req.body.ActivityId,
        },
        data: {
          ActivityName: req.body.ActivityName,
        },
      });
      await this.prisma.activityParameters.update({
        where: {
          ID: req.body.ActivityId,
        },
        data: {
          Ratio: req.body.Ratio,
          UserID: req.body.UserId,
          ActivityID: req.body.ActivityId,
        },
      });
      return 'Successfuly updated';
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('/activities/addTime')
  @ApiBody({ type: UpdateActivityDto })
  async addTime(@Request() req): Promise<TimeLogs> {
    if (req.body.isLeisure === true) {
      const timeAvailable = await this.activitiesService.getTotalTimeOfLeisure(
        req.body.userId,
      );
      if (timeAvailable < req.body.time) {
        throw new NotEnoughTimeError('Not enough time', timeAvailable);
      }
    }
    const timeLog = await this.prisma.timeLogs.create({
      data: {
        UserID: req.body.userId,
        ActivityID: req.body.activityId,
        RatioAtTheTime: req.body.ratioAtTheTime,
        Time: req.body.time,
        isLeisure: req.body.isLeisure,
      },
    });
  }

  @Get('/activities/getTimeAvailable')
  async getTimeAvailable(@Request() req): Promise<number> {
    const { userId } = req.body;
    const totalTimeOfLeisure =
      await this.activitiesService.getTotalTimeOfLeisure(userId);
    return totalTimeOfLeisure > 0 ? totalTimeOfLeisure : 0;
  }

  @Post('/activities/updateRatio')
  async updateRatio(): Promise<string> {
    return 'updateRatio';
  }
}
