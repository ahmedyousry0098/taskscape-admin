import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { Rootstate, AppDispatch } from "../Redux/Store";

export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;
export const useAppDispatch = useDispatch<AppDispatch>;
