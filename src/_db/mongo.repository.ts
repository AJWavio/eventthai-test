import { ReturnModelType, types } from '@typegoose/typegoose';
import {
    CreateOptions,
    FilterQuery,
    ProjectionType,
    QueryOptions,
    SaveOptions,
    UpdateQuery,
} from 'mongoose';

export abstract class MongoRepositoryBase<
    Entity extends types.AnyParamConstructor<any>,
> {
    constructor(protected readonly model: ReturnModelType<Entity>) {}

    async createOne(
        entity: InstanceType<Entity>,
        toObject = false,
        options?: SaveOptions,
    ): Promise<InstanceType<Entity> | null> {
        const entityDoc = new this.model(entity);
        await entityDoc.save(options);

        if (!entityDoc) return null;

        if (toObject) return entityDoc[0].toObject();

        return entityDoc as InstanceType<Entity>;
    }

    async createMany(
        entity: InstanceType<Entity>[],
        toObject = false,
        options?: CreateOptions,
    ): Promise<InstanceType<Entity>[] | null> {
        const entityDoc = await this.model.create(entity, options);

        if (toObject)
            return entityDoc.map(
                (doc) => doc.toObject() as InstanceType<Entity>,
            );

        return entityDoc as InstanceType<Entity>[];
    }

    async updateOne(
        filter: FilterQuery<InstanceType<Entity>>,
        update: UpdateQuery<InstanceType<Entity>>,
        options?: QueryOptions<InstanceType<Entity>>,
    ): Promise<void> {
        await this.model.updateOne(filter, update, options);
    }

    async updateMany(
        filter: FilterQuery<InstanceType<Entity>>,
        update: UpdateQuery<InstanceType<Entity>>,
        options?: QueryOptions<InstanceType<Entity>>,
    ): Promise<void> {
        await this.model.updateMany(filter, update, options);
    }

    async findOne(
        filter: FilterQuery<InstanceType<Entity>>,
        toObject = false,
        projection?: ProjectionType<InstanceType<Entity>>,
        options?: QueryOptions<InstanceType<Entity>>,
    ): Promise<InstanceType<Entity> | null> {
        const entityDoc = await this.model.findOne(filter, projection, options);

        if (!entityDoc) return null;
        if (toObject) return entityDoc.toObject();

        return entityDoc as InstanceType<Entity>;
    }

    async findMany(
        filter: FilterQuery<InstanceType<Entity>>,
        toObject = false,
        projection?: ProjectionType<InstanceType<Entity>>,
        options?: QueryOptions<InstanceType<Entity>>,
    ): Promise<InstanceType<Entity>[]> {
        const entityDocList = await this.model.find(
            filter,
            projection,
            options,
        );

        if (toObject)
            return entityDocList.map(
                (doc) => doc.toObject() as InstanceType<Entity>,
            );

        return entityDocList as InstanceType<Entity>[];
    }

    async findAll(
        toObject = false,
        options?: QueryOptions<InstanceType<Entity>>,
    ): Promise<InstanceType<Entity>[]> {
        const entityDocList = await this.model.find(null, null, options);

        if (toObject)
            return entityDocList.map(
                (doc) => doc.toObject() as InstanceType<Entity>,
            );

        return entityDocList as InstanceType<Entity>[];
    }

    async deleteOne(
        filter: FilterQuery<InstanceType<Entity>>,
        options?: QueryOptions<InstanceType<Entity>>,
    ): Promise<void> {
        await this.model.deleteOne(filter, options);
    }

    async deleteMany(
        filter: FilterQuery<InstanceType<Entity>>,
        options?: QueryOptions<InstanceType<Entity>>,
    ): Promise<void> {
        await this.model.deleteMany(filter, options);
    }
}
