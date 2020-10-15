import { Request, Response } from 'express';
import Orphanage from '../models/Orphanage';
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

export default {

    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return res.status(200).json(orphanageView.renderMany(orphanages));
    },

    async show(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const { id } = req.params;
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.status(200).json(orphanageView.render(orphanage));
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            openOnWeekends,
        } = req.body;

        const orphanagesRepository = getRepository(Orphanage);

        const reqImages = req.files as Express.Multer.File[];

        const images = reqImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            openOnWeekends,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            openingHours: Yup.string().required(),
            openOnWeekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        await schema.validate(data, {
            //se encontrar campo invalido esperar verificar todos e retornar todos os erros
            abortEarly: false
        })

        const saveOrphanage = orphanagesRepository.create(data)

        await orphanagesRepository.save(saveOrphanage);

        return res.status(201).json(saveOrphanage);
    }
}