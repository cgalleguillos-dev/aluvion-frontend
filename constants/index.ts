export const LIMIT_EQUIPMENT_QUERY = 10;

const API_URL = process.env.NEXT_PUBLIC_API;

export const API = {
  EQUIPMENT: `${API_URL}/equipment`,
  EQUIPMENT_PAGINATED: `${API_URL}/equipment/paginated`,
  BASE_EQUIPMENT: `${API_URL}/base-equipment`,
}