export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="sm:h-[600px] h-[700px] flex justify-center items-center">
        <h1 className="xl:text-[300px] lg:text-[250px] md:text-[200px] sm:text-[120px] text-[80px] font-bold select-none  text-9xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-green-700 to-blue-900">
          [ISE]
        </h1>
        <h1 className="xl:text-[300px] lg:text-[250px] md:text-[200px] sm:text-[120px] text-[80px] font-bold select-none animate-wiggle text-9xl font-semibold bg-gradient-to-r bg-clip-text text-black animate-text">
          Pick
        </h1>
      </div>
    </div>
  );
}
