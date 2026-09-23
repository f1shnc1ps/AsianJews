import Image from "next/image";

export default function ProfileHero({image}) {
  return (
    <>
      <Image
        className="d-block w-100 home-hero-img"
        src={image}
        alt="ASB"
        width={1920}
        height={720} 
      />
    </>
  );
}
