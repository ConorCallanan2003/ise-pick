export default function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="h-[600px] relative flex flex-col justify-center items-center">
        <h1 className="absolute text-[300px] font-bold select-none animate-wiggle text-9xl font-semibold bg-gradient-to-r bg-clip-text  text-transparent from-indigo-500 via-purple-500 to-indigo-500 animate-text">
          ISEPick
        </h1>
        {/* <h1 className="absolute text-[200px] font-bold select-none ">
          ISEPick
        </h1> */}
      </div>
    </div>
  );
}
