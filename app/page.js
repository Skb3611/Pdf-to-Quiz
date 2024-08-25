
import Image from "next/image";
import DropzoneComponent from "@/components/Dropzone";


export default function Home() {
  return (
    <>
      <div className="container m-auto  w-2/3 my-5">
        <div className="hero text-center mb-10">
          <h1 className="text-3xl font-medium mb-2 ">Pdf To Test</h1>
          <p className="text-lg">
            Convert your mcq pdf to online quiz in few seconds.
          </p>
        </div>

        <DropzoneComponent/>
      
      </div>
    </>
  );
}
