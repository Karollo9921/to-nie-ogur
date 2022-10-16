import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { 
  Connection, 
  Model,
  FilterQuery,
  SaveOptions,
  ProjectionType,
  SortOrder,
} from 'mongoose';
import { AbstractDocument } from './abstract-entity/abstract-entity';

@Injectable()
export abstract class DbRepositoryService<T extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<T>,
    private readonly connection: Connection
  ) {}

  async findOne(filterQuery: FilterQuery<T>, projections?: ProjectionType<T>): Promise<T> {
    return this.model.findOne(filterQuery, projections);
  }

  async findOneWithSort(
    filterQuery: FilterQuery<T>, 
    projections?: ProjectionType<T>,
    arg?: string | {
      [key: string]: SortOrder | {
          $meta: "textScore"
      }
    }
  ): Promise<T> {
    return this.model
      .findOne(filterQuery, projections)
      .sort(arg)
      .limit(1);
  }

  async create(
    document: Omit<T, '_id'>,
    options?: SaveOptions,
  ): Promise<T> {
    return (await this.model.create(document)).save(options);
  }

  async findAndUpdate(
    filterQuery: FilterQuery<T>,
    update: Partial<T>,
  ): Promise<T> {
    return this.model.findOneAndUpdate(filterQuery, update, {
      new: true,
    });
  }

  async upsert(
    filterQuery: FilterQuery<T>,
    document: Partial<T>
  ): Promise<T> {
    return this.model.findOneAndUpdate(filterQuery, document, {
      new: true,
      upsert: true,
    }); 
  }

  async find(filterQuery: FilterQuery<T>,): Promise<T[]> {
    return this.model.find(filterQuery)
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
