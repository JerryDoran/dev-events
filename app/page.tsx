import Hello from '@/components/hello';

export default function HomePage() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <h1 className='text-2xl font-bold'>Home</h1>
      <Hello />
    </main>
  );
}
