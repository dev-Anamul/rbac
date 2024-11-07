import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { DynamicRoleGuard } from 'src/common/guards/dynamic-role/dynamic-role.guard';
import { Action, Resource } from 'src/common/decorators/permissions.decorator';

@Controller('articles')
@UseGuards(DynamicRoleGuard)
@Resource('article')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @Action('create')
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @Action('read_all')
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @Action('read_one')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  @Action('update')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @Action('delete')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
