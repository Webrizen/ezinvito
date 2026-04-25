import { Sekuya, Archivo } from "next/font/google";

export const sekuya = Sekuya({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});
