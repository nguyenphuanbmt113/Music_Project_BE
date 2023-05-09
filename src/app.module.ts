import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './modules/auth/role.module';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { MusicianModule } from './modules/musician/musician.module';
import { MusicianAlbumModule } from './modules/musician-album/musician-album.module';
import { ArtistAlbumModule } from './modules/artist-album/artist-album.module';
import { SongModule } from './modules/song/song.module';
import { MusicModule } from './modules/music/music.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    AccessControlModule.forRoles(roles),
    AlbumModule,
    ArtistModule,
    MusicianModule,
    MusicianAlbumModule,
    ArtistAlbumModule,
    SongModule,
    MusicModule,
    FavoriteModule,
    PlaylistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
