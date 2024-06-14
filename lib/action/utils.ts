export function actionError(name: string, value: unknown) {
  return new Error(JSON.stringify([name, typeof value, value], undefined, 2));
}
