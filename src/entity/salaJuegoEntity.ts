import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "saladejuego" })
export class SalaJuego extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  estado: string;

  @Column({ nullable: false })
  cate_id: string;
}
