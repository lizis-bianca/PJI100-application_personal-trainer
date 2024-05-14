import Image from "next/image";
import ManImage from "../../../public/image_man.png";

export const ExploreCards = () => {
  return (
    <div className="hidden top-0 lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
        <Image className="w-full absolute right-[20px] top-4 w-90 flex flex-col drop-shadow-xl shadow-black/10 dark:shadow-white/10" src={ManImage} alt={""} width='600' height='600'/>
    </div>
  );
};