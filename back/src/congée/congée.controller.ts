import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Put,
  Req,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  // HttpException,
  // HttpStatus,
} from '@nestjs/common';
import { CongesService } from './congée.service';
import { Conge } from './entities/congée.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer';
// import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CreateCongéeDto } from './dto/create-congée.dto';
import { FileService } from 'src/file/file.service';

@UseGuards(JwtAuthGuard)
@Controller('conges')
export class CongesController {
  constructor(
    private readonly congesService: CongesService,
    private readonly fileService: FileService,
  ) {}

  // @Post('pointage')
  // async pointageConge(@Body() PointageDto: any): Promise<Conge> {
  //   return this.congesService.pointage(PointageDto);
  // }

  @Get('/all')
  async getAllConges(): Promise<Conge[]> {
    return this.congesService.getAllConges();
  }

  @Post('creer')
  @UseInterceptors(FileInterceptor('file'))
  async creerConge(
    @Req() req,
    @Body() createCongeDto: CreateCongéeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const id = req.user.id;
    const user = req.user.username;

    if (file) {
      try {
        const fileName = `${uuidv4()}-${file.originalname}`;
        const fileUrl = await this.fileService.uploadFile(
          'conges',
          fileName,
          file.buffer,
        );

        createCongeDto.piècesjustificatives = fileUrl;
      } catch (error) {
        throw new Error('Failed to upload file to MinIO');
      }
    }
    return this.congesService.creerConge(createCongeDto, id, user);
  }

  // @Get('type/:typeConge')
  // async getConges(@Param('typeConge') typeConge: string): Promise<Conge> {
  //   return this.congesService.getConges(typeConge);
  // }

  @Get('historique/:employeId')
  async getHistoriqueConges(
    @Param('employeId') employeId: number,
  ): Promise<Conge[]> {
    return this.congesService.getHistoriqueConges(employeId);
  }

  @Put('/valider/:id')
  async validerConge(
    @Param('id') id: number,
    @Body('status') status: string,
  ): Promise<Conge> {
    return this.congesService.validerConge(id, status);
  }

  @Get()
  async getTousLesConges(@Req() req): Promise<Conge[]> {
    const id = req.user.id;
    return this.congesService.getTousLesConges(id);
  }

  @Delete('/supprimer/:id')
  async supprimerConge(@Param('id') id: number): Promise<void> {
    return this.congesService.supprimerConge(id);
  }

  @Patch('/status/:id')
  async updateStatus(
    @Param('id') id: number,
    @Body() data: { status: 'waiting' | 'accepted' | 'refused' },
  ) {
    return this.congesService.updateStatus(id, data.status);
  }

  @Put('change-date/:id')
  updateLeave(
    @Param('id') id: number,
    @Body() body: { startDate: Date; endDate: Date },
  ): Promise<Conge> {
    return this.congesService.updateLeave(id, body);
  }

  @Delete('annulé/:id')
  annulé(@Param('id') id: number) {
    return this.congesService.annulé(id);
  }
}
