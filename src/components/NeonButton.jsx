import { motion } from 'framer-motion'

export default function NeonButton({ label, variant = 'number', onClick, span = 1 }) {
  const base = 'relative select-none rounded-2xl p-4 md:p-6 text-center font-semibold text-lg md:text-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2'

  const styles = {
    number: 'bg-white/5 text-white/85 hover:bg-white/10 shadow-[0_0_0_0_rgba(255,255,255,0.0)] hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.08)]',
    operator: 'bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20 shadow-[0_0_0_0_rgba(0,255,209,0.0)] hover:shadow-[0_0_24px_2px_rgba(0,255,209,0.25)]',
    clear: 'bg-pink-500/10 text-pink-200 hover:bg-pink-500/20 hover:shadow-[0_0_24px_2px_rgba(255,0,128,0.25)]',
    equals: 'bg-gradient-to-br from-[#5B5BFF]/30 to-[#39FF14]/30 text-white hover:from-[#5B5BFF]/50 hover:to-[#39FF14]/50 shadow-[0_0_30px_2px_rgba(0,255,209,0.25)]',
    function: 'bg-purple-500/10 text-purple-200 hover:bg-purple-500/20 hover:shadow-[0_0_24px_2px_rgba(128,0,255,0.25)]',
  }

  const spanClass = span === 2 ? 'col-span-2' : span === 3 ? 'col-span-3' : 'col-span-1'

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={`${base} ${styles[variant]} ${spanClass}`}
    >
      {label}
    </motion.button>
  )
}
