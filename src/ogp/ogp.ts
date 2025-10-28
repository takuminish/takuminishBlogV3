import createOGPFn from "./infra/ogps.repository";

export function createOGP(title: string): Promise<ArrayBuffer> {
  return createOGPFn(title);
}
