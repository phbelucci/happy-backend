import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image'

@Entity('orphanages')
export default class Orphanage {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    openingHours: string;

    @Column()
    instructions: string;

    @Column()
    openOnWeekends: boolean;

    @OneToMany(() => Image, image => image.orphanage, {
        //o cadastro ou update de um orphanage vai automaticamente cadastrar ou atualizar as imagens do orphanage
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'orphanage_id' })
    images: Image[];

}