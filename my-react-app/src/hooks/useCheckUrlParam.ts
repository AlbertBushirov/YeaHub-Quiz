import { useLocation } from "react-router-dom";

export function useCheckUrlParam(key: string, value: string | number) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const rawValue = searchParams.get(key);

  const valuesList = ["skills", "complexity"].includes(key)
    ? (rawValue?.split(",") ?? [])
    : searchParams.getAll(key);

  return valuesList.includes(String(value));
}
