import { injectable } from 'inversify';
import { Moose, IMoose } from '../models/moose';

// Клас-репозиторій для роботи з лосями
// Анотація injectable дозволяє впровадити цей репозиторій через IoC контейнер
@injectable()
export class MooseRepository {
    // Метод для отримання всіх лосів з бази даних
    public async findAll(): Promise<IMoose[]> {
        return Moose.find();
    }

    // Метод для пошуку лося за унікальним ідентифікатором
    public async findById(id: string): Promise<IMoose | null> {
        return Moose.findById(id);
    }

    // Метод для створення нового лося в базі даних
    public async create(mooseData: IMoose): Promise<IMoose> {
        const moose = new Moose(mooseData);
        return moose.save();
    }

    // Метод для видалення лося за ідентифікатором
    public async delete(id: string): Promise<boolean> {
        const result = await Moose.findByIdAndDelete(id);
        return result !== null;
    }

    // Метод для повного оновлення даних про лося (заміна всіх полів)
    public async update(id: string, mooseData: IMoose): Promise<IMoose | null> {
        return Moose.findByIdAndUpdate(id, mooseData, { new: true });
    }

    // Метод для часткового оновлення даних про лося (оновлення лише вказаних полів)
    public async patch(id: string, mooseData: Partial<IMoose>): Promise<IMoose | null> {
        return Moose.findByIdAndUpdate(id, { $set: mooseData }, { new: true });
    }
}
