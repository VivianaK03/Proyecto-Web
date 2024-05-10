import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Categoria } from "./categoriaEntity";
import { Palabra } from "./palabraEntity";

@Entity()
export class SalaJuego {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    estado: string;

    @ManyToOne(() => Categoria, categoria => categoria.salasJuego)
    categoria: Categoria;

}
