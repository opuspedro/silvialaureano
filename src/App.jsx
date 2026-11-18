import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowDown, Plus, Minus, X } from 'lucide-react'
import heroPortrait from './assets/silvia-hero-portrait.jpg'
import studioPortrait from './assets/IMG-20240827-WA0002.jpg'
import officePortrait from './assets/FB_IMG_1747141430729.jpg'
import './App.css'

const WHATSAPP_NUMBER = '5511941333848'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Olá, Silvia. Gostaria de verificar a disponibilidade para agendar uma consulta.'
)}`
const PHONE_LINK = 'tel:+5511941333848'
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Rua Dom Luís Felipe de Orleans, 698, Vila Maria, São Paulo - SP, 02118-000'
)}`

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#especialidades', label: 'Especialidades' },
  { href: '#abordagem', label: 'Abordagem' },
  { href: '#atendimento', label: 'O Atendimento' },
  { href: '#contato', label: 'Contato' },
]

function Reveal({ children, delay = 0, className = '', immediate = false }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -32px 0px' })
  const shouldShow = immediate || isInView

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={shouldShow ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 36)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    const handleKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [mobileOpen])

  const closeMenu = () => setMobileOpen(false)

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-brand" aria-label="Silvia Laureano — Início">
            <span className="nav-brand-name">
              Silvia <em>Laureano</em>
            </span>
            <span className="nav-brand-sep" aria-hidden="true" />
            <span className="nav-brand-crp">CRP 06/21461-1</span>
          </a>

          <nav aria-label="Navegação principal">
            <ul className="nav-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              <span>Agendar Consulta</span>
              <ArrowUpRight size={14} strokeWidth={1.75} />
            </a>

            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mobile-drawer-top">
              <span className="nav-brand-name">
                Silvia <em>Laureano</em>
              </span>
              <button
                type="button"
                className="mobile-close"
                onClick={closeMenu}
                aria-label="Fechar menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="mobile-drawer-links" aria-label="Menu móvel">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.4 }}
                >
                  <span className="mobile-link-index">0{index + 1}</span>
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </nav>

            <div className="mobile-drawer-footer">
              <p className="mobile-drawer-crp">Psicóloga Clínica — CRP 06/21461-1</p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="btn-primary mobile-drawer-cta"
              >
                <span>Agendar Consulta</span>
                <ArrowUpRight size={16} strokeWidth={1.75} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <Reveal immediate delay={0.05}>
            <div className="eyebrow">
              <span className="eyebrow-rule" aria-hidden="true" />
              <span>Psicologia Clínica &middot; São Paulo</span>
            </div>
          </Reveal>

          <Reveal immediate delay={0.12}>
            <h1 className="hero-title">
              Silvia <em>Laureano</em>
            </h1>
          </Reveal>

          <Reveal immediate delay={0.2}>
            <p className="hero-lead">
              Um espaço ético de escuta, presença e elaboração para cada tempo da vida.
            </p>
          </Reveal>

          <Reveal immediate delay={0.28}>
            <p className="hero-description">
              Com mais de quatro décadas dedicadas à psicologia clínica, ofereço
              acompanhamento individual para adultos, adolescentes e crianças — acolhendo
              questões emocionais, transições e processos de autoconhecimento com
              seriedade e sensibilidade.
            </p>
          </Reveal>

          <Reveal immediate delay={0.36}>
            <div className="hero-actions">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Agendar Consulta</span>
                <ArrowUpRight size={16} strokeWidth={1.75} />
              </a>
              <a href="#sobre" className="btn-outline">
                <span>Conhecer trajetória</span>
                <ArrowDown size={15} strokeWidth={1.6} />
              </a>
            </div>
          </Reveal>

          <Reveal immediate delay={0.44}>
            <dl className="hero-ledger">
              <div className="hero-ledger-item">
                <dd>40+ anos</dd>
                <dt>Prática clínica contínua</dt>
              </div>
              <div className="hero-ledger-item">
                <dd>CRP 06/21461-1</dd>
                <dt>Conselho Regional — SP</dt>
              </div>
              <div className="hero-ledger-item">
                <dd>Vila Maria &middot; SP</dd>
                <dt>Consultório presencial</dt>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal immediate delay={0.18} className="hero-visual">
          <figure className="hero-portrait-mat">
            <div className="hero-portrait-frame">
              <img
                src={heroPortrait}
                alt="Retrato de Silvia Laureano, Psicóloga Clínica"
                loading="eager"
              />
            </div>
            <figcaption className="hero-portrait-caption">
              <span className="caption-name">Silvia Laureano</span>
              <span className="caption-meta">Psicóloga Clínica &mdash; CRP 06/21461-1</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="sobre">
      <div className="container">
        <div className="section-rule" aria-hidden="true" />

        <div className="about-grid">
          <Reveal className="about-aside">
            <figure className="archival-card">
              <div className="archival-photo-wrap">
                <img
                  src={officePortrait}
                  alt="Silvia Laureano em seu consultório"
                  loading="lazy"
                />
              </div>
              <figcaption className="archival-caption">
                Mais de quatro décadas dedicadas ao encontro humano e à escuta clínica.
              </figcaption>
            </figure>

            <dl className="credentials-ledger">
              <div className="credentials-row">
                <dt>Registro Profissional</dt>
                <dd>CRP 06/21461-1 (SP)</dd>
              </div>
              <div className="credentials-row">
                <dt>Experiência Clínica</dt>
                <dd>Mais de 40 anos de atuação</dd>
              </div>
              <div className="credentials-row">
                <dt>Público Atendido</dt>
                <dd>Adultos, adolescentes e crianças</dd>
              </div>
            </dl>
          </Reveal>

          <div className="about-body">
            <Reveal>
              <div className="section-eyebrow">
                <span className="section-index">01</span>
                <span className="section-eyebrow-line" aria-hidden="true" />
                <span>Sobre Mim</span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="section-title">
                Uma vida dedicada <em>à escuta e ao cuidar</em>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="about-lead">
                Sou Silvia Laureano, psicóloga clínica formada há mais de 40 anos, com
                ampla experiência no acompanhamento de adultos, adolescentes e crianças.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="about-prose">
                <p>
                  Ao longo dessa trajetória em consultório, acompanhei diferentes gerações
                  em seus processos de transformação pessoal, amadurecimento e travessia
                  de momentos delicados. A prática clínica contínua ensina a escutar sem
                  pressa — reconhecendo que cada história humana possui um tempo próprio e
                  jamais se reduz a fórmulas prontas.
                </p>
                <p>
                  Minha atuação integra referenciais consolidados da psicologia, sempre
                  orientada pelo respeito profundo à singularidade de cada pessoa.
                  Acredito que o vínculo terapêutico — construído com ética, sigilo e
                  presença genuína — é o alicerce para toda mudança verdadeira.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="about-signature">
                <div className="signature-name">Silvia Laureano</div>
                <div className="signature-role">Psicóloga Clínica &middot; CRP 06/21461-1</div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const specialties = [
    {
      numeral: 'I',
      phase: 'Vida Adulta',
      title: 'Adultos',
      desc: 'Psicoterapia individual voltada à elaboração de angústias, impasses afetivos, crises existenciais e processos de autoconhecimento na vida adulta.',
      topics: [
        'Ansiedade, angústia e estados depressivos',
        'Conflitos nos relacionamentos e na vida familiar',
        'Luto, perdas e recomeços',
        'Transições profissionais e de ciclo de vida',
        'Autoconhecimento e amadurecimento emocional',
      ],
    },
    {
      numeral: 'II',
      phase: 'Adolescência',
      title: 'Adolescentes',
      desc: 'Um espaço próprio de escuta e confiança para acolher as intensas transformações subjetivas, sociais e familiares dessa travessia.',
      topics: [
        'Construção de identidade e autoestima',
        'Ansiedade social e pressões contemporâneas',
        'Dificuldades emocionais no ambiente escolar',
        'Conflitos familiares e geracionais',
        'Escolhas, autonomia e projetos de futuro',
      ],
    },
    {
      numeral: 'III',
      phase: 'Infância',
      title: 'Crianças',
      desc: 'Psicoterapia infantil com abordagem lúdica e sensível, acolhendo a expressão da criança em diálogo cuidadoso e periódico com a família.',
      topics: [
        'Desenvolvimento emocional e afetivo',
        'Medos, inseguranças e fobias infantis',
        'Mudanças familiares e separação dos pais',
        'Dificuldades comportamentais e de socialização',
        'Orientação e escuta junto aos pais',
      ],
    },
  ]

  return (
    <section className="services" id="especialidades">
      <div className="container">
        <div className="services-header">
          <div>
            <Reveal>
              <div className="section-eyebrow">
                <span className="section-index">02</span>
                <span className="section-eyebrow-line" aria-hidden="true" />
                <span>Especialidades</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-title">
                Atendimento para todas as <em>fases da vida</em>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <p className="services-intro">
              Cada etapa do viver apresenta questões e linguagens particulares. Com
              experiência clínica e sensibilidade, o espaço terapêutico acolhe a
              necessidade própria de cada momento.
            </p>
          </Reveal>
        </div>

        <div className="services-triptych">
          {specialties.map((item, index) => (
            <Reveal key={item.title} delay={0.1 + index * 0.1} className="triptych-col">
              <article className="specialty-panel">
                <div className="specialty-meta">
                  <span className="specialty-numeral">{item.numeral}</span>
                  <span className="specialty-phase">{item.phase}</span>
                </div>

                <h3 className="specialty-title">{item.title}</h3>
                <p className="specialty-desc">{item.desc}</p>

                <div className="specialty-divider" aria-hidden="true" />
                <div className="specialty-topics-label">Demandas frequentes</div>
                <ul className="specialty-topics">
                  {item.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Approach() {
  const pillars = [
    {
      number: '01',
      title: 'Escuta Ativa e Ética',
      desc: 'Um território protegido pelo sigilo profissional e livre de julgamentos, onde cada palavra importa e cada silêncio tem significado.',
    },
    {
      number: '02',
      title: 'Olhar Clínico Integrador',
      desc: 'Articulação madura de diferentes vertentes da psicologia, construída ao longo de décadas de prática, sempre a serviço da singularidade de cada paciente.',
    },
    {
      number: '03',
      title: 'Vínculo Terapêutico',
      desc: 'A consistência da relação de confiança entre psicóloga e paciente como base segura para sustentar elaborações profundas e duradouras.',
    },
  ]

  return (
    <section className="approach" id="abordagem">
      <div className="container">
        <div className="approach-grid">
          <div className="approach-copy">
            <Reveal>
              <div className="section-eyebrow section-eyebrow-dark">
                <span className="section-index">03</span>
                <span className="section-eyebrow-line" aria-hidden="true" />
                <span>Abordagem Clínica</span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="section-title section-title-dark">
                Psicoterapia com <em>profundidade</em> e acolhimento
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="approach-lead">
                Meu trabalho é guiado pela convicção de que cada pessoa possui dentro de
                si recursos valiosos para sua própria elaboração. O papel da terapia é
                sustentar as condições éticas e humanas para que esses recursos possam
                emergir e se desenvolver.
              </p>
            </Reveal>

            <div className="pillars-list">
              {pillars.map((pillar, index) => (
                <Reveal key={pillar.number} delay={0.22 + index * 0.08}>
                  <div className="pillar-row">
                    <span className="pillar-num">{pillar.number}</span>
                    <div className="pillar-body">
                      <h3>{pillar.title}</h3>
                      <p>{pillar.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.18} className="approach-visual">
            <figure className="studio-portrait-card">
              <div className="studio-portrait-frame">
                <img
                  src={studioPortrait}
                  alt="Retrato em estúdio de Silvia Laureano"
                  loading="lazy"
                />
              </div>
              <blockquote className="approach-epigraph">
                <p>
                  &ldquo;A psicoterapia não é sobre consertar o que está quebrado. É sobre
                  iluminar o que sempre esteve ali, esperando para ser descoberto.&rdquo;
                </p>
                <footer>Silvia Laureano</footer>
              </blockquote>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const items = [
    {
      question: 'Como acontece a primeira sessão?',
      answer:
        'O primeiro encontro é um momento de acolhimento e escuta inicial, sem pressa. Nele, conversamos sobre o que motivou a busca pela psicoterapia, esclarecemos dúvidas sobre o funcionamento do trabalho clínico e alinhamos juntos os horários e o enquadre do acompanhamento.',
    },
    {
      question: 'Qual é a frequência e a continuidade do acompanhamento?',
      answer:
        'As sessões acontecem regularmente, em geral uma vez por semana, em dia e horário reservados especialmente para cada paciente. O ritmo e o percurso do processo são sempre avaliados de forma individualizada, respeitando o momento clínico de cada pessoa.',
    },
    {
      question: 'Como funciona o atendimento de crianças e adolescentes?',
      answer:
        'Na psicoterapia infantil, a escuta ocorre por meio do brincar e de recursos lúdicos adequados à faixa etária, mantendo encontros periódicos de orientação e parceria com os pais ou responsáveis. Com adolescentes, preserva-se um espaço próprio de confiança e privacidade ética, fundamental para o vínculo.',
    },
    {
      question: 'Como agendar uma consulta ou esclarecer uma dúvida inicial?',
      answer:
        'O contato pode ser feito diretamente pelo WhatsApp ou por telefone. Ao enviar uma mensagem, combinamos de forma simples os horários disponíveis para a primeira consulta presencial no consultório em São Paulo.',
    },
  ]

  return (
    <section className="process" id="atendimento">
      <div className="container">
        <div className="process-grid">
          <div className="process-intro">
            <Reveal>
              <div className="section-eyebrow">
                <span className="section-index">04</span>
                <span className="section-eyebrow-line" aria-hidden="true" />
                <span>O Atendimento</span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="section-title">
                Orientações sobre o <em>processo terapêutico</em>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="process-text">
                Procurar acompanhamento psicológico é um gesto significativo de cuidado.
                Reunimos abaixo informações práticas para que esse primeiro passo aconteça
                com clareza e tranquilidade.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="ethics-note">
                <div className="ethics-note-title">Sigilo e Compromisso Ético</div>
                <p>
                  Todos os atendimentos são realizados em estrita conformidade com o
                  Código de Ética Profissional do Psicólogo (CFP), assegurando sigilo,
                  acolhimento e responsabilidade técnica.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="faq-list">
            {items.map((item, index) => {
              const isOpen = openIndex === index
              return (
                <Reveal key={item.question} delay={0.08 + index * 0.06}>
                  <div className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-trigger"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question">{item.question}</span>
                      <span className="faq-icon" aria-hidden="true">
                        {isOpen ? (
                          <Minus size={16} strokeWidth={1.6} />
                        ) : (
                          <Plus size={16} strokeWidth={1.6} />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="faq-answer-wrap"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p className="faq-answer">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contato">
      <div className="container">
        <Reveal>
          <div className="contact-sheet">
            <div className="contact-main">
              <div className="section-eyebrow">
                <span className="section-index">05</span>
                <span className="section-eyebrow-line" aria-hidden="true" />
                <span>Contato &amp; Consultório</span>
              </div>

              <h2 className="section-title">
                Dê o <em>primeiro passo</em>
              </h2>

              <p className="contact-description">
                O caminho para o bem-estar emocional começa com uma conversa tranquila.
                Entre em contato pelo WhatsApp para consultar disponibilidade de horários e
                agendar sua primeira sessão.
              </p>

              <div className="contact-cta-group">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-large"
                >
                  <span>Agendar pelo WhatsApp</span>
                  <ArrowUpRight size={17} strokeWidth={1.75} />
                </a>
              </div>

              <div className="contact-SecondaryLinks">
                <a href={PHONE_LINK} className="inline-link">
                  <span>Ligar: (11) 94133-3848</span>
                </a>
                <span className="inline-dot" aria-hidden="true">
                  &middot;
                </span>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-link"
                >
                  <span>Abrir endereço no Google Maps</span>
                  <ArrowUpRight size={13} strokeWidth={1.75} />
                </a>
              </div>
            </div>

            <div className="contact-ledger">
              <div className="ledger-block">
                <div className="ledger-label">Consultório</div>
                <div className="ledger-value">Rua Dom Luís Felipe de Orleans, 698</div>
                <div className="ledger-sub">
                  Vila Maria &mdash; São Paulo, SP &middot; CEP 02118-000
                </div>
              </div>

              <div className="ledger-block">
                <div className="ledger-label">Telefone &amp; WhatsApp</div>
                <div className="ledger-value">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    (11) 94133-3848
                  </a>
                </div>
                <div className="ledger-sub">
                  Contato direto para informações e agendamento
                </div>
              </div>

              <div className="ledger-block">
                <div className="ledger-label">Horários de Atendimento</div>
                <div className="ledger-value">Segunda a sexta-feira</div>
                <div className="ledger-sub">Consultas com horário previamente agendado</div>
              </div>

              <div className="ledger-block">
                <div className="ledger-label">Identificação Profissional</div>
                <div className="ledger-value">Silvia Laureano &middot; CRP 06/21461-1</div>
                <div className="ledger-sub">Conselho Regional de Psicologia de São Paulo</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-identity">
            <a href="#" className="footer-brand">
              Silvia <em>Laureano</em>
            </a>
            <p className="footer-credential">Psicóloga Clínica &mdash; CRP 06/21461-1</p>
          </div>

          <nav aria-label="Links do rodapé">
            <ul className="footer-nav">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>Rua Dom Luís Felipe de Orleans, 698 &mdash; Vila Maria, São Paulo, SP</p>
          <p>&copy; {new Date().getFullYear()} Silvia Laureano. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Approach />
        <ProcessSection />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
