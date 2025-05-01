import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'

const tab = [
  {
    title: 'Post',
    href: '/',
  },
  {
    title: 'Shorts',
    href: '/shorts',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Design',
    href: '/design',
  },
  {
    title: 'Rss',
    href: '/rss',
  },
]


const TextBanner = ({ url }: { url: string }) => {

  const [loading, setLoading] = useState(true)
  const [renderList, setRenderList] = useState(tab)
  const [active, setActive] = useState(tab[0].href)

  useEffect(() => {
    let urlToData = () => {
      let baseUrl = loading ? window.location.pathname : url

      // 正则匹配到/design/后面的单词要有/
      let match = baseUrl.match(/^\/design\/([^\/]+)$/)
      const currentMatch = `/${match?.[1] || ''}`

      if (currentMatch && renderList.find((item) => item.href === currentMatch)) {

        let index = renderList.findIndex((item) => item.href === currentMatch)
        const newList = [...renderList]
        const temp = newList[0]
        newList[0] = newList[index]
        newList[index] = temp
        setRenderList(newList)
        setActive(currentMatch)
      }
      if (currentMatch) {
        setLoading(false)
      }
    }
    document.addEventListener('astro:page-load', urlToData)

    return () => {
      document.removeEventListener('astro:page-load', urlToData)
    }
  }, [])

  if (loading) {
    return <div className="flex gap-4 items-center h-20 overflow-x-hidden pl-5">
    </div>
  }

  return (
    <section className="flex flex-wrap items-center overflow-x-hidden px-5 md:px-20 pt-1 fixed z-1000 top-0 left-0 w-full bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-sm ">
      {/* blur 部分，为了精准控制高度 */}
      {/* <div className="absolute top-0 backdrop-blur-sm left-0 w-full h-23 -z-1"></div> */}
      <AnimatePresence mode="wait">
        {renderList.map((item) => (
          <motion.div
            className="cursor-pointer origin-left text-[#8C1C13] mr-3"
            key={item.title}
            layout
            initial={{
              fontSize: '1rem',
              opacity: 0.5,
              x: 0,
              scale: 1
            }}
            animate={{
              fontSize: active === item.href ? '5rem' : '1rem',
              opacity: active === item.href ? 1 : 0.5,
              x: active === item.href ? 0 : 20,
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
              layout: {
                duration: 0.3
              }
            }}
            whileHover={{
              scale: 1.1,
              opacity: 0.8,
            }}
          >
            <a
              // onClick={() => onClick(item.title)}
              className={`whitespace-nowrap`}
              href={`/design${item.href}`}
            >
              {item.title}
            </a>
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  )
}

export default TextBanner
