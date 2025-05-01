interface Props {
  date: string;
  title: string;
  post: any;
  animationConfig?: {
    duration?: number;
    delay?: number;
    scale?: number[];
  };
}
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'

export default function HoverPost({ date, title, post, animationConfig }: Props) {

  const { cover, description, link } = post
  const [hover, setHover] = useState(false)

  const defaultAnimation = {
    duration: 0.3,
    delay: 0.1,
    scale: [0.95, 1]
  }

  const config = { ...defaultAnimation, ...animationConfig }

  return (
    <div className="flex items-baseline gap-3 group">
      <time className="text-xs text-[#BF4342] font-mono">{date}</time>
      <h2 className="text-base text-[#BF4342] cursor-pointer transition-colors duration-300 relative"
        onClick={() => window.open(window.location.origin + '/posts/' + link, '_blank')}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {title}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[1px] bg-[#BF4342]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hover ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <AnimatePresence>
          {hover && cover && (
            <motion.div
              className="absolute top-10 right-0 z-10 bg-[#735751] rounded-lg max-w-[30vw] w-80 origin-top-right overflow-hidden"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.95
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.5,
                delay: config.delay
              }}
            >
              <motion.img
                src={cover}
                alt={title}
                className="w-full h-32 object-cover rounded-t-lg mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.2,
                  delay: config.delay + 0.1,
                  ease: "easeOut"
                }}
              />
              <motion.div
                className="text-white text-sm my-2 px-4 line-clamp-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: config.delay + 0.15
                }}
              >
                {description}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </h2>
    </div>
  )
}
