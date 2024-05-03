import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { SalaJuego } from "./salaJuegoEntity";

@Entity({ name: "categoria" })
export class Categoria extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @OneToMany(() => SalaJuego, salaJuego => salaJuego.categoria)
salasJuego: SalaJuego[];

}
