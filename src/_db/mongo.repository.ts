import { ReturnModelType, types } from '@typegoose/typegoose';
import {
    ClientSession,
    CreateOptions,
    FilterQuery,
    ProjectionType,
    QueryOptions,
    UpdateQuery,
} from 'mongoose';

export abstract class MongoRepositoryBase<
    Entity extends types.AnyParamConstructor<any>,
> {
    constructor(protected readonly model: ReturnModelType<Entity>) {}

    async create(
        country: InstanceType<Entity>,
        options?: CreateOptions,
        session?: ClientSession,
    ): Promise<InstanceType<Entity> | null> {
        const countryDoc = await this.model.create(
            country,
            options ? { ...options, session } : { session },
        );

        return countryDoc as InstanceType<Entity>;
    }

    async createMany(
        country: InstanceType<Entity>[],
        options?: CreateOptions,
        session?: ClientSession,
    ): Promise<InstanceType<Entity>[] | null> {
        const countryDoc = await this.model.create(
            country,
            options ? { ...options, session } : { session },
        );

        return countryDoc as InstanceType<Entity>[];
    }

    async updateOne(
        filter: FilterQuery<InstanceType<Entity>>,
        update: UpdateQuery<InstanceType<Entity>>,
        options?: QueryOptions<InstanceType<Entity>>,
        session?: ClientSession,
    ): Promise<void> {
        await this.model.updateOne(
            filter,
            update,
            options
                ? { ...options, session }
                : {
                    session,
                },
        );
    }

    async updateMany(
        filter: FilterQuery<InstanceType<Entity>>,
        update: UpdateQuery<InstanceType<Entity>>,
        options?: QueryOptions<InstanceType<Entity>>,
        session?: ClientSession,
    ): Promise<void> {
        await this.model.updateMany(
            filter,
            update,
            options ? { ...options, session } : { session },
        );
    }

    async findOne(
        filter: FilterQuery<InstanceType<Entity>>,
        projection?: ProjectionType<InstanceType<Entity>>,
        options?: QueryOptions<InstanceType<Entity>>,
        session?: ClientSession,
    ): Promise<InstanceType<Entity> | null> {
        const countryDoc = await this.model.findOne(
            filter,
            projection,
            options
                ? { ...options, session }
                : {
                    session,
                },
        );

        return countryDoc as InstanceType<Entity>;
    }

    async findMany(
        filter: FilterQuery<InstanceType<Entity>>,
        projection?: ProjectionType<InstanceType<Entity>>,
        options?: QueryOptions<InstanceType<Entity>>,
        session?: ClientSession,
    ): Promise<InstanceType<Entity>[]> {
        const countryDocList = await this.model.find(
            filter,
            projection,
            options ? { ...options, session } : { session },
        );

        return countryDocList as InstanceType<Entity>[];
    }

    async findAll(
        options?: QueryOptions<InstanceType<Entity>>,
        session?: ClientSession,
    ): Promise<InstanceType<Entity>[]> {
        const countryDocList = await this.model.find(
            null,
            null,
            options ? { ...options, session } : { session },
        );

        return countryDocList as InstanceType<Entity>[];
    }

    async deleteOne(
        filter: FilterQuery<InstanceType<Entity>>,
        options?: QueryOptions<InstanceType<Entity>>,
        session?: ClientSession,
    ): Promise<void> {
        await this.model.deleteOne(
            filter,
            options ? { ...options, session } : { session },
        );
    }

    async deleteMany(
        filter: FilterQuery<InstanceType<Entity>>,
        options?: QueryOptions<InstanceType<Entity>>,
        session?: ClientSession,
    ): Promise<void> {
        await this.model.deleteMany(
            filter,
            options ? { ...options, session } : { session },
        );
    }
}
