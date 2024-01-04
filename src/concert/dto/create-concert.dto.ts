import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConcertDto {
  @IsString()
  @IsNotEmpty({ message: '공연명은 필수입니다.' })
  concert_name: string;

  @IsString()
  @IsNotEmpty({ message: '공연장은 필수입니다.' })
  location: string;

  @IsDate()
  @IsNotEmpty({ message: '공연일은 필수입니다.' })
  date: Date;

  @IsNumber()
  @IsNotEmpty({ message: '관람시간은 필수입니다.' })
  running_time: number;

  @IsNumber()
  @IsNotEmpty({ message: '가격은 필수입니다.' })
  price: number;
}
