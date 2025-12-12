import { z } from "zod"

const productSchemaValidator = z.object({
  name: z.string()
    .min(4, "El nombre debe tener al menos 4 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  description: z.string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres"),
  price: z.number()
    .min(10, "El precio debe ser mayor a 10")
    .max(1000000, "El precio no puede exceder 1,000,000"),
  category: z.string()
    .min(2, "La categoría debe tener al menos 2 caracteres")
    .max(50, "La categoría no puede exceder 50 caracteres"),
  stock: z.number()
    .int("El stock debe ser un número entero")
    .positive("El stock debe ser un número positivo")
    .max(100000, "El stock no puede exceder 100,000"),
  image: z.string().default("No contiene imagen")
})

export const createProductSchema = productSchemaValidator

export const updatedProductSchema = productSchemaValidator.partial()