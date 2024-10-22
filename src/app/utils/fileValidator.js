export const fileValidator = (file, setError) => {
  if (!file.type.includes("image")) {
    setError("El archivo debe ser una imagen");
    return "El archivo debe ser una imagen";
  }
  if (file.size > 5 * 1024 * 1024) {
    setError(
      "Los archivos no pueden superar los 5 MB, por favor reintentelo con uno menos pesado"
    );
    return "Los archivos no pueden superar los 5 MB, por favor reintentelo con uno menos pesado";
  }
};
