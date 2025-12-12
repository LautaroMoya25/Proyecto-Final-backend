import { z } from "zod"

// Schema para validación de email
const emailSchema = z.string()
    .email("El email debe ser válido")
    .min(5, "El email debe tener al menos 5 caracteres")
    .max(100, "El email no puede exceder 100 caracteres")

// Schema para validación de contraseña
const passwordSchema = z.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(50, "La contraseña no puede exceder 50 caracteres")

// Schema para registro de usuario
export const registerSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})

// Schema para login de usuario
export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})

// Tipos derivados de los schemas
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
