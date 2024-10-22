export const ImageInput = ({
  getRootProps,
  getInputProps,
  isDragActive,
  className,
  onSubmit,
}) => {
  return (
    <form
      id="uploadForm"
      onSubmit={onSubmit}
      className={`cursor-pointer border-dashed w-full md:w-[600px] border-amber-500 border-2 rounded-lg p-20 text-center ${{
        ...className,
      }}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} className="bg-red-500 w-full h-8" />
      {isDragActive ? (
        <p>Suelta la imagen aqui...</p>
      ) : (
        <p>Click para subir o intenta soltar una imagen</p>
      )}
    </form>
  );
};
