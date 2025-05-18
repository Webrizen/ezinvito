import { QRCodeSVG } from 'qrcode.react';
import Logo from "@/assets/logo.png"; 
import Image from 'next/image';

export default function QRCodeWithLogo({ url }) {
  return (
    <div className="relative w-[200px] h-[200px]">
      <QRCodeSVG
        value={url}
        size={200}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      />
      <Image
        src={Logo}
        alt="Logo"
        width={40}
        height={40}
        placeholder='blur'
        className="absolute top-1/2 left-1/2 w-[40px] h-[40px] transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-black p-1"
      />
    </div>
  );
}