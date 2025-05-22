import { Schema, model } from 'mongoose';

// Інтерфейс для об'єкта "Лось"
interface IMoose {
    name: string; // Ім'я лося
    age: number; // Вік лося у роках
    height: number; // Висота лося в сантиметрах
    weight: number; // Вага лося в кілограмах
    gender: 'male' | 'female'; // Стать лося: 'male' - самець, 'female' - самка
    description?: string; // Опис лося (необов'язкове поле)
    dateAdded: Date; // Дата додавання запису до бази даних
    hornAge: number; // Вік рогів у роках
}

// Схема MongoDB для моделі "Лось"
const mooseSchema = new Schema<IMoose>({
    name: {
        type: String,
        required: true, // Поле є обов'язковим
    },
    age: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    height: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    weight: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    gender: {
        type: String,
        required: true, // Поле є обов'язковим
        enum: ['male', 'female'], // Допустимі значення: 'male' або 'female'
    },
    description: String, // Необов'язкове текстове поле
    dateAdded: {
        type: Date,
        default: Date.now, // Значення за замовчуванням - поточна дата і час
    },
    hornAge: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
});

// Створення моделі Mongoose на основі схеми
export const Moose = model<IMoose>('Moose', mooseSchema);
export type { IMoose }; // Експортуємо інтерфейс для використання в інших файлах
