import { ISideBar } from "@/config/interfaces";

export const LIMIT_EQUIPMENT_QUERY = 10;

const API_URL = process.env.NEXT_PUBLIC_API;

export const API = {
  EQUIPMENT: `${API_URL}/equipment`,
  EQUIPMENT_PAGINATED: `${API_URL}/equipment/paginated`,
  BASE_EQUIPMENT: `${API_URL}/base-equipment`,
  SIMULATION: `${API_URL}/simulation`,
}


export const SIDE_BAR: ISideBar[] = [
  {
    href: "/auth/load-equipments",
    label: "Cargar Equipos Base",
    subLabel: "Equipos"
  },
  {
    href: "/auth/base-equipments",
    label: "Equipos Base",
    subLabel: "Equipos"
  },
  {
    href: "/equipments",
    label: "Equipos",
    subLabel: "Equipos"
  },
  {
    href: "/simulations",
    label: "Simulaciones",
    subLabel: "Simulaciones"
  },
  {
    href: "/ejecutor",
    label: "Ejecutor",
    subLabel: "Simulaciones"
  },

]