import { SalaJuego } from "../entity/salaJuegoEntity";
import { AppDataSource } from "../data-source";

export class SalaJuegoRepository {
    private repository = AppDataSource.getRepository(SalaJuego);

    async findAll() {
        return this.repository.find();
    }

    async findById(id: number) {
        return this.repository.findOne({ where: { id } });
    }

    async save(salaJuego: SalaJuego) {
        return this.repository.save(salaJuego);
    }

    async delete(id: number) {
        return this.repository.delete(id);
    }
}
