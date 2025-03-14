export const generateId = (prefix: string): string => {
  const year = new Date().getFullYear().toString().slice(2); // 2 últimos dígitos del año (Ej: 23 para 2023)
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0'); // Mes en formato 01-12
  const day = new Date().getDate().toString().padStart(2, '0'); // Día en formato 01-31
  
  // Usamos los primeros 4 dígitos del timestamp para mantener la unicidad
  const timestamp = Date.now().toString().slice(-4); // Últimos 4 dígitos del timestamp

  // Concatenamos el prefijo, la fecha y los 4 dígitos del timestamp
  const id = `${prefix}${year}${month}${day}${timestamp}`;

  return id;
}

export const generateArticlePrefix = (): string => `A${new Date().getFullYear().toString()}`
