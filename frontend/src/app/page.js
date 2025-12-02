import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className=" flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-5 bg-white dark:bg-black sm:items-start">
  
          <div className="mt-8 flex  gap-4 text-base font-medium sm:flex-row sm:flex-wrap">
            <Link
              href="/clinic-dashboard"
              className="flex h-12 w-full items-center justify-center rounded-full bg-orange-600 px-6 text-white transition-colors hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 sm:w-auto"
            >
              Clinic Dashboard
            </Link>
            <Link
              href="/image-gallery"
              className="flex h-12 w-full items-center justify-center rounded-full bg-green-600 px-6 text-white transition-colors hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 sm:w-auto"
            >
              Image Gallery
            </Link>
            <Link
              href="/admin"
              className="flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-auto"
            >
              Admin Dashboard
            </Link>
            <Link
              href="/user"
              className="flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-auto"
            >
              User Dashboard
            </Link>
          </div>
        
      </main>
    </div>
  );
}
