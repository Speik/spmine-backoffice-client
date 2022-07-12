type AnyValue = unknown;
type AnyObject = { [key: string]: unknown };
type AnyArray = unknown[];
type AnyPrimitive = string | number | boolean;
type AnyNullablePrimitive = AnyPrimitive | null | undefined;

export { AnyValue, AnyObject, AnyArray, AnyPrimitive, AnyNullablePrimitive };
export { IUser } from './entities/user';
