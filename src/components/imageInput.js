export const ImageInput = ({
  getRootProps,
  getInputProps,
  isDragActive,
  className,
}) => {
  return (
    <form
      className={`cursor-pointer border-dashed w-full md:w-[600px] border-amber-500 border-2 rounded-lg p-20 text-center ${{
        ...className,
      }}`}
      {...getRootProps()}
      action="/target"
      id="target"
    >
      <input
        {...getInputProps()}
        className="bg-red-500 w-full h-8"
        placeholder="sono qui"
      />
      {isDragActive ? (
        <p>Suelta la imagen aqui...</p>
      ) : (
        <p>Click para subir o intenta soltar una imagen</p>
      )}
    </form>
  );
};
