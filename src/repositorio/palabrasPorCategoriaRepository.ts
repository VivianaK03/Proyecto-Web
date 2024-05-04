import { PalabrasPorCategoria } from "../entity/palabrasPorCategoriaEntity";
import { AppDataSource } from "../data-source";

export class PalabrasPorCategoriaRepository {
    private repository = AppDataSource.getRepository(PalabrasPorCategoria);
    async asociarPalabraACategoria(cate_id: number, pala_id: number) {
        const asociacion = new PalabrasPorCategoria();
        asociacion.cate_id = cate_id;
        asociacion.pala_id = pala_id;
        asociacion.id = null;
        return this.repository.save(asociacion);
    }

    async desvincularPalabraDeCategoria(cate_id: number, pala_id: number) {
        return this.repository.delete({ cate_id, pala_id });
    }
}
