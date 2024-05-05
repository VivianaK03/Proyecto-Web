import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany, JoinTable  } from "typeorm";
import { SalaJuego } from "./salaJuegoEntity";
import { Palabra } from "./palabraEntity";

@Entity({ name: "categoria" })
export class Categoria extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @OneToMany(() => SalaJuego, salaJuego => salaJuego.categoria)
  salasJuego: SalaJuego[];

  @ManyToMany(() => Palabra)
  @JoinTable()
  palabras: Palabra[];

}
