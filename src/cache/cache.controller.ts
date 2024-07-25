import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CacheService } from './cache.service';
import { Public } from 'src/public.decorator';

@Controller('cache')
export class CacheController {
    constructor(private readonly cacheService: CacheService) {}
    @Public()
    @Post()
    async setCache(@Query('key') key: string, @Query('value') value: any) {
        await this.cacheService.setCache(key, value);
        return 'Cache set';
    }
    @Public()
    @Get(':key')
    async getCache(@Param('key') key: string) {
        const value = await this.cacheService.getCache<string>(key);
        return { key, value };
    }

    @Delete(':key')
    async delCache(@Param('key') key: string) {
        await this.cacheService.delCache(key);
        return 'Cache deleted';
    }

}
