import Link from 'next/link';
import { Header } from '@/components/header';

export default function NotFound() {
  return (
    <>
      <Header solid />
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-[6vw] pt-24 text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="max-w-[16ch] text-5xl md:text-6xl">
          This Page Has Quietly Left the Market.
        </h1>
        <p className="mt-5 max-w-md text-mist">
          The page you’re looking for doesn’t exist or has moved. The
          properties, however, are very much still here.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-solid">Return Home</Link>
          <Link href="/properties" className="btn-ghost">View Properties</Link>
        </div>
      </div>
    </>
  );
}
