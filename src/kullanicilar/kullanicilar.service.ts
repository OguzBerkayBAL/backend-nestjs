import { Injectable } from '@nestjs/common';

@Injectable()
export class KullanicilarService {
  private readonly kullanicilar = [
    {
      userId: 1,
      userName: 'berkaybal',
      password: '123456',
    },
    {
      userId: 2,
      userName: 'test',
      password: 'test',
    },
  ];

  async findOne(userName: string): Promise<any> {
    return this.kullanicilar.find(
      (kullanici) => kullanici.userName === userName,
    );
  }
}
