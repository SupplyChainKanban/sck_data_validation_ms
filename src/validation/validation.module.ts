import { Module } from '@nestjs/common';
import { ValidationService } from './validation.service';
import { ValidationController } from './validation.controller';
import { TransportsModule } from 'src/transports/transports.module';

@Module({
  controllers: [ValidationController],
  providers: [ValidationService],
  imports: [TransportsModule],
})
export class ValidationModule { }
