export default function GlobalLoading() {
  return (
    <div className='min-h-[60vh] flex items-center justify-center bg-[#0a0f1d]'>
      <div className='relative'>
        <div className='h-14 w-14 rounded-full border-2 border-white/10 border-t-blue-500 animate-spin' />
        <div className='absolute inset-2 rounded-full border border-emerald-400/30 animate-pulse' />
      </div>
    </div>
  );
}
