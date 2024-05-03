import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "./categoriaEntity";

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
