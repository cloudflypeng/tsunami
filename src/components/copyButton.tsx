import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function CopyButton({ text }: { text: string }) {

  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return <div className="flex items-center gap-2">
    <AnimatePresence mode="wait">
      <p className="text-white/80 bg-[#A78A7F] px-4 py-2 rounded-md cursor-pointer" onClick={copyToClipboard}>{text}</p>
      {!copied &&
        <motion.button
          className="text-white/90 bg-[#A78A7F] px-4 py-2 rounded-md cursor-pointer"
          onClick={copyToClipboard}
          initial={{ opacity: 0, width: 'auto' }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 0,
            marginRight: 0
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut"
          }}
        >
          copy
        </motion.button>
      }
      {copied &&
        <motion.p
          className='text-[#BF4342]/90 px-4'
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          transition={{
            duration: 0.2,
            ease: "easeInOut"
          }}
        >
          copied
        </motion.p>
      }
    </AnimatePresence>
  </div>
}
