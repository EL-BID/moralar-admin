export class RoutesFunction {
  public static getPathIndepentTheRole(subpath: string, typeProfile: string): string {
    switch (typeProfile) {
      case "Gestor":
        return `./gestor-publico/app/${ subpath }`;
      case "TTS":
        return `./profissional/app/${ subpath }`;
      default:
        return `./administrador/app/${ subpath }`;
    }
  }
}