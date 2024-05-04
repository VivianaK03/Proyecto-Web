import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "palabrasporcategoria" })
export class PalabrasPorCategoria extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    cate_id: number;

    @Column({ nullable: false })
    pala_id: number;
}
