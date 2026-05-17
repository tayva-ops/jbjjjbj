import { useEffect, useState } from 'react'

export default function CreatorOrganizer() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    window.addEventListener('appinstalled', () => {
      setInstalled(true)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const installApp = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  const sections = [
    {
      title: 'Vídeos',
      emoji: '🎬',
      color: 'from-red-500 to-orange-500',
      items: [
        '30 Dias Treinando Xadrez',
        'Como Pensar Mais Rápido',
        'Minha Rotina de Foco'
      ]
    },
    {
      title: 'Shorts',
      emoji: '⚡',
      color: 'from-yellow-400 to-orange-400',
      items: [
        'Mate em 3 jogadas',
        'Erro que destrói iniciantes',
        'Dica rápida de estratégia'
      ]
    },
    {
      title: 'Comunidade',
      emoji: '👥',
      color: 'from-blue-500 to-cyan-500',
      items: [
        'Enquete sobre próximos vídeos',
        'Bastidores da gravação',
        'Atualização semanal'
      ]
    },
    {
      title: 'Ao Vivo',
      emoji: '🔴',
      color: 'from-pink-500 to-red-500',
      items: [
        'Live treinando xadrez',
        'Analisando inscritos',
        'Desafio contra viewers'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,180,0,0.15),transparent_40%)] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
              Creator Organizer
            </h1>
            <p className="text-zinc-400 mt-2 text-lg">
              Organize seus conteúdos, ideias e gravações.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300">
              + Novo Conteúdo
            </button>

            {!installed && (
              <button
                onClick={installApp}
                className="bg-white text-black font-bold px-6 py-3 rounded-2xl hover:scale-105 transition-all duration-300"
              >
                📲 Instalar App
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-2xl hover:border-yellow-500/50 transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${section.color} rounded-2xl p-4 mb-5`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-black">
                      {section.title}
                    </h2>
                    <p className="text-black/70 font-semibold text-sm mt-1">
                      Organização criativa
                    </p>
                  </div>

                  <div className="text-4xl">{section.emoji}</div>
                </div>
              </div>

              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-black/50 border border-zinc-800 rounded-2xl p-4 hover:border-yellow-400 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-white leading-tight">
                          {item}
                        </h3>
                        <p className="text-zinc-500 text-sm mt-1">
                          Planejamento de conteúdo
                        </p>
                      </div>

                      <span className="text-xs bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-full">
                        Ideia
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-5 border border-dashed border-zinc-700 hover:border-yellow-400 rounded-2xl py-3 text-zinc-400 hover:text-yellow-300 transition-all duration-300 font-semibold">
                + Adicionar
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">Planejamento da Semana</h2>
              <span className="bg-yellow-400 text-black font-bold px-4 py-1 rounded-full text-sm">
                PRODUTIVO
              </span>
            </div>

            <div className="space-y-4">
              {[
                ['Segunda', 'Gravar vídeo principal'],
                ['Terça', 'Editar shorts'],
                ['Quarta', 'Post comunidade'],
                ['Quinta', 'Live com inscritos'],
                ['Sexta', 'Planejar próxima semana']
              ].map(([day, task], index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-black/40 border border-zinc-800 rounded-2xl p-4"
                >
                  <div>
                    <h3 className="font-bold text-lg">{day}</h3>
                    <p className="text-zinc-400">{task}</p>
                  </div>

                  <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 text-black shadow-2xl">
            <h2 className="text-3xl font-black leading-tight">
              Meta do Canal
            </h2>

            <p className="mt-3 font-medium text-black/70">
              Poste consistentemente e acompanhe sua evolução.
            </p>

            <div className="mt-8 space-y-4">
              <div className="bg-black/10 rounded-2xl p-4">
                <div className="flex justify-between font-bold mb-2">
                  <span>Vídeos</span>
                  <span>4/8</span>
                </div>
                <div className="w-full bg-black/10 rounded-full h-3">
                  <div className="bg-black h-3 rounded-full w-1/2"></div>
                </div>
              </div>

              <div className="bg-black/10 rounded-2xl p-4">
                <div className="flex justify-between font-bold mb-2">
                  <span>Shorts</span>
                  <span>12/20</span>
                </div>
                <div className="w-full bg-black/10 rounded-full h-3">
                  <div className="bg-black h-3 rounded-full w-3/4"></div>
                </div>
              </div>

              <div className="bg-black/10 rounded-2xl p-4">
                <div className="flex justify-between font-bold mb-2">
                  <span>Lives</span>
                  <span>2/4</span>
                </div>
                <div className="w-full bg-black/10 rounded-full h-3">
                  <div className="bg-black h-3 rounded-full w-1/3"></div>
                </div>
              </div>
            </div>

            <button className="w-full mt-8 bg-black text-white py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300">
              Ver Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
