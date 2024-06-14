import { Module } from '@nestjs/common';
import { KullanicilarService } from './kullanicilar.service';

@Module({
  providers: [KullanicilarService],
  exports: [KullanicilarService],
})
export class KullanicilarModule {}
