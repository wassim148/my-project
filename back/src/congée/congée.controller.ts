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
        // Générer un nom unique pour le fichier
        const fileName = `${uuidv4()}-${file.originalname}`;
        const fileUrl = await this.fileService.uploadFile(
          'conges',
          fileName,
          file.buffer,
        );

        // Stocker l'URL MinIO dans le DTO
        createCongeDto.piècesjustificatives = fileUrl;
      } catch (error) {
        throw new Error('Failed to upload file to MinIO');
      }
    }

    return this.congesService.creerConge(createCongeDto, id, user);
  }

  // @Post('creer')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         const fileName = `${uuidv4()}-${file.originalname}`;
  //         cb(null, fileName);
  //       },
  //     }),
  //     fileFilter: (req, file, cb) => {
  //       if (!file.mimetype.match(/pdf|jpg|jpeg|png/)) {
  //         return cb(
  //           new Error('Only PDF, JPG, JPEG, and PNG files are allowed'),
  //           false,
  //         );
  //       }
  //       cb(null, true);
  //     },
  //     limits: { fileSize: 5 * 1024 * 1024 }, // Limite à 5MB
  //   }),
  // )
  // async creerConge(
  //   @Req() req,
  //   @Body() createCongeDto: CreateCongéeDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   const id = req.user.id;
  //   const user = req.user.username;

  //   if (file) {
  //     createCongeDto.piècesjustificatives = file.path; // Stocker le chemin local du fichier
  //   }

  //   try {
  //     return await this.congesService.creerConge(createCongeDto, id, user);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  @Get('type/:typeConge')
  async getConges(@Param('typeConge') typeConge: string): Promise<Conge> {
    return this.congesService.getConges(typeConge);
  }

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
}
