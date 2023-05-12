import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArtistType } from 'src/common/enum/artist.enum';
import { GENDER } from 'src/common/enum/gender.enum';
import { Role } from 'src/common/enum/role.enum';
import { Roles } from '../auth/decorator/role.decorator';
import { AuthenticationGuard } from '../auth/guards/jwt-guards.guard';
import { AdminAuthGuard } from '../auth/guards/adminGuard.guard';
import { ArtistService } from './artist.service';
import { UpdateArtistDto } from './dto/update-artist';
import { CreateArtistDto } from './dto/create-artist';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('artist')
export class ArtistController {
  constructor(private singerService: ArtistService) {}
  //localhost:3000/singers
  @Get()
  getAllSingers() {
    return this.singerService.findAll();
  }

  @Get('filtered')
  getFilteredSingers(
    @Query('limit') limit: number,
    @Query('type') type: ArtistType,
    @Query('nationality') nationality: string,
    @Query('gender') gender: GENDER,
  ) {
    return this.singerService.getFilterSingers(
      limit,
      nationality,
      type,
      gender,
    );
  }

  @Get('limited')
  getLimitedSingers(@Query('limit') limit: number) {
    return this.singerService.getLimitSingers(limit);
  }

  //localhost:3000/singers
  @Post()
  @UseGuards(AuthenticationGuard, AdminAuthGuard)
  @Roles([Role.ADMIN])
  createNewSinger(@Body() data: CreateArtistDto) {
    return this.singerService.createSinger(data);
  }

  //localhost:3000/singers/:id
  @Get(':id')
  getSingerById(@Param('id') id: number) {
    return this.singerService.findSingerById(id);
  }

  @Post(':id/new-album')
  @UseGuards(AuthenticationGuard, AdminAuthGuard)
  @Roles([Role.ADMIN])
  createNewAlbum(
    @Param('id') id: number,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return this.singerService.createAlbum(id, createAlbumDto);
  }

  @Put(':id/update-singer')
  @UseGuards(AuthenticationGuard, AdminAuthGuard)
  @Roles([Role.ADMIN])
  // @UseInterceptors(FileInterceptor('image'))
  updateSinger(@Param('id') id: number, @Body() data: UpdateArtistDto) {
    return this.singerService.updateSinger(id, data);
  }

  @Delete(':id/delete-singer')
  @UseGuards(AuthenticationGuard, AdminAuthGuard)
  @Roles([Role.ADMIN])
  deleteSinger(@Param('id') id: number) {
    return this.singerService.deleteSinger(id);
  }
}
