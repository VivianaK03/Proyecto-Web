import { SalaJuego } from "../entity/salaJuegoEntity";
import { AppDataSource } from "../data-source";
import { FindManyOptions } from "typeorm";
import { Palabra } from "../entity/palabraEntity";

export class SalaJuegoRepository {
    private repository = AppDataSource.getRepository(SalaJuego);

    async findById(id: number) {
        return this.repository.findOne({ where: { id } });
    }
    async findByEstado(estado: string) {
        return this.repository.find({ where: { estado } });
    }

    async save(salaJuego: SalaJuego) {
        return this.repository.save(salaJuego);
    }

    async delete(id: number) {
        return this.repository.delete(id);
    }
    async findAll() {
        return this.repository.find({ relations: ["categoria"] });
    }
    async getAll(estado?: string) {
        const options: FindManyOptions<SalaJuego> = {};
        if (estado) {
            options.where = { estado };
        }
        return this.repository.find(options);
    }
    async findPalabrasByCategoria(categoriaNombre: string): Promise<Palabra[]> {
        const result = await this.repository.createQueryBuilder("salaJuego")
            .innerJoin("salaJuego.categoria", "categoria")
            .innerJoin("categoria.palabras", "palabra")
            .where("categoria.nombre = :categoriaNombre", { categoriaNombre })
            .select("palabra")
            .getMany();
            
        // Extraer las palabras del resultado
    const palabras: Palabra[] = result.flatMap(salaJuego => salaJuego.categoria.palabras);
    
    return palabras;
    }

}
