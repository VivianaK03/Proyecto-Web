import { SalaJuego } from "../entity/salaJuegoEntity";
import { AppDataSource } from "../data-source";
import { FindManyOptions } from "typeorm";

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
}
