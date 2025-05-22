import { Router, Request, Response } from 'express';
import { container } from '../config/container';
import { MooseRepository } from '../repositories/MooseRepository';

// Створюємо новий обробник HTTP-запитів Express
const router = Router();
// Отримуємо екземпляр репозиторію лосів з контейнера інверсії залежностей
const mooseRepository = container.get(MooseRepository);

// Обробка HTTP-запиту GET / - отримання всіх записів лосів
router.get('/', (async (_req: Request, res: Response) => {
    try {
        // Отримуємо всі записи лосів з бази даних через репозиторій
        const moose = await mooseRepository.findAll();
        res.json(moose);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту GET /:id - отримання запису одного лося за ідентифікатором
router.get('/:id', (async (req: Request, res: Response) => {
    try {
        // Пошук лося за ідентифікатором
        const moose = await mooseRepository.findById(req.params.id);
        if (moose) {
            res.json(moose);
        } else {
            // Якщо лось не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис лося не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту POST / - створення нового запису лося
router.post('/', (async (req: Request, res: Response) => {
    try {
        // Створюємо новий запис лося з даних запиту
        const newMoose = await mooseRepository.create(req.body);
        // Повертаємо статус 201 (Created) і дані створеного лося
        res.status(201).json(newMoose);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PUT /:id - повне оновлення запису лося
router.put('/:id', (async (req: Request, res: Response) => {
    try {
        // Перевірка наявності всіх обов'язкових полів для PUT запиту
        const requiredFields = ['name', 'age', 'height', 'weight', 'gender'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        // Якщо є відсутні поля, повертаємо помилку 400 Bad Request
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Відсутні обов'язкові поля: ${missingFields.join(', ')}`,
            });
        }

        // Оновлюємо лося з вказаним ID
        const moose = await mooseRepository.update(req.params.id, req.body);
        if (moose) {
            return res.json(moose);
        } else {
            // Якщо лось не знайдений, повертаємо 404 помилку
            return res.status(404).json({ message: 'Запис лося не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        return res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PATCH /:id - часткове оновлення запису лося
router.patch('/:id', (async (req: Request, res: Response) => {
    try {
        // Часткове оновлення запису лося - передаються лише ті поля, які потрібно змінити
        const moose = await mooseRepository.patch(req.params.id, req.body);
        if (moose) {
            res.json(moose);
        } else {
            // Якщо лось не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис лося не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту DELETE /:id - видалення запису лося
router.delete('/:id', (async (req: Request, res: Response) => {
    try {
        // Видаляємо дані про лося за ID
        const moose = await mooseRepository.delete(req.params.id);
        if (moose) {
            // У разі успіху повертаємо повідомлення про видалення
            res.json({ message: 'Запис про лося видалено' });
        } else {
            // Якщо лось не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис про лося не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

export default router;
