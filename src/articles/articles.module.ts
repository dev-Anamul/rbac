import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { RolesModule } from 'src/roles/roles.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { DynamicRoleGuard } from 'src/common/guards/dynamic-role/dynamic-role.guard';

@Module({
  imports: [RolesModule, PermissionsModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, DynamicRoleGuard],
})
export class ArticlesModule {}
