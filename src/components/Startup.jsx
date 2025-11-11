import { motion, AnimatePresence } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Startup({ show, onComplete }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="startup"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-[#0E0E10] overflow-hidden"
        >
          <div className="absolute inset-0">
            <Spline scene="https://prod.spline.design/sHDPSbszZja1qap3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0E0E10]/40 to-[#0E0E10]" />
          </div>

          <div className="relative h-full flex items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              className="text-center"
            >
              <motion.div
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_rgba(0,255,209,0.15)]"
              >
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest"
                    style={{ fontFamily: 'Orbitron, Rajdhani, Inter Tight, Inter, sans-serif' }}>
                  <span className="text-white">Neon</span>
                  <span className="text-[#00FFD1]">Calc</span>
                </h1>
              </motion.div>
              <p className="mt-6 text-white/80 text-sm md:text-base">A modern, futuristic calculator interface</p>
            </motion.div>
          </div>

          {/* Auto-fade to app */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#00FFD1] via-[#5B5BFF] to-[#39FF14]"
            onAnimationComplete={onComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
