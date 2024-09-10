import { GithubLogo } from '@phosphor-icons/react'

function Footer() {

  let data = new Date().getFullYear()

  return (
    <>
      <div className="flex justify-center font-italiana text-reuse-green h-35 px-10 bg-gray-200">
        <div className="container flex flex-col items-center py-9">
          <p className=' font-bold  text-3xl'> {data}</p>
          <p className='text-4xl font-bold'>Reuse Moda Sustentável </p>
          <p className='text-2xl font-sans'>Enviamos para todo o Brasil | Copyright (&#x1F1E7;&#x1F1F7;) </p>
          <div className='flex gap-2'>
            <a href="https://github.com/ReUse-Moda-Sustentavel" target="_blank">
              <GithubLogo size={48} weight='bold' />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer