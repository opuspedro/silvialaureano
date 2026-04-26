import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ChevronDown,
  Heart,
  Brain,
  Sparkles,
  GraduationCap,
  Award,
  Clock,
  X,
  Menu,
  MessageCircle,
} from 'lucide-react'
import heroPhoto from './assets/IMG-20240827-WA0001.jpg'
import portraitPhoto from './assets/IMG-20240827-WA0002.jpg'
import casualPhoto from './assets/FB_IMG_1747141430729.jpg'
import './App.css'

const WHATSAPP_NUMBER = '5511941333848'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá, gostaria de agendar uma consulta.')}`

function FadeIn({ children, delay = 0, direction = 'up', className = '', duration = 0.7 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none: { y: 0, x: 0 },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#especialidades', label: 'Especialidades' },
    { href: '#abordagem', label: 'Abordagem' },
    { href: '#contato', label: 'Contato' },
  ]

  const handleNavClick = () => setMobileOpen(false)

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            Silvia <span>Laureano</span>
          </a>
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="nav-cta">
            Agendar Consulta
          </a>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
              <X size={28} />
            </button>
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ color: 'var(--gold-500)' }}
            >
              Agendar Consulta
            </motion.a>
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
        <div className="hero-content">
          <FadeIn delay={0.2}>
            <div className="hero-label">Psicologia Clinica</div>
          </FadeIn>
          <FadeIn delay={0.35}>
            <h1 className="hero-title">
              Silvia <em>Laureano</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.45}>
            <p className="hero-subtitle">Psicóloga Clinica &mdash; CRP 06/21461-1</p>
          </FadeIn>
          <FadeIn delay={0.55}>
            <p className="hero-description">
              Com mais de quatro décadas de dedicação à psicologia clínica, ofereço um espaço
              seguro e acolhedor para o autoconhecimento, a superação de desafios emocionais
              e o desenvolvimento pessoal.
            </p>
          </FadeIn>
          <FadeIn delay={0.65}>
            <div className="hero-actions">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <span>Agendar Consulta</span>
                <ArrowRight size={16} />
              </a>
              <a href="#sobre" className="btn-secondary">
                Conheça meu trabalho <ChevronDown size={16} />
              </a>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3} direction="left">
          <div className="hero-image-wrapper">
            <div className="hero-image-frame">
              <img
                src={heroPhoto}
                alt="Silvia Laureano, Psicóloga Clínica"
                loading="eager"
              />
              <motion.div
                className="hero-experience-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="number">40+</div>
                <div className="label">anos de experiência</div>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="sobre">
      <div className="about-inner">
        <FadeIn direction="right">
          <div className="about-image-col">
            <img src={casualPhoto} alt="Silvia Laureano" className="about-image" />
            <div className="about-decorative" />
          </div>
        </FadeIn>

        <div className="about-content">
          <FadeIn>
            <div className="section-label">Sobre Mim</div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="section-title">
              Uma vida dedicada <em>ao cuidar</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="about-text">
              <p>
                Sou Silvia Laureano, psicóloga clínica formada há mais de 40 anos,
                com ampla experiência no atendimento a adultos, adolescentes e crianças.
                Ao longo da minha trajetória, acompanhei centenas de pessoas em seus
                processos de transformação pessoal.
              </p>
              <p>
                Minha abordagem integra diferentes vertentes da psicologia, sempre respeitando
                a singularidade de cada pessoa. Acredito que a relação terapêutica é o
                alicerce para toda mudança genuína.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="about-credentials">
              <div className="credential">
                <div className="credential-icon">
                  <GraduationCap size={20} />
                </div>
                <div className="credential-text">
                  <div className="value">CRP 06/21461-1</div>
                  <div className="desc">Conselho Regional de Psicologia</div>
                </div>
              </div>
              <div className="credential">
                <div className="credential-icon">
                  <Award size={20} />
                </div>
                <div className="credential-text">
                  <div className="value">40+ anos</div>
                  <div className="desc">de prática clínica</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const services = [
    {
      icon: <Brain size={26} />,
      title: 'Adultos',
      desc: 'Atendimento individual voltado para questões emocionais, relacionais e existenciais da vida adulta.',
      topics: [
        'Ansiedade e depressão',
        'Conflitos nos relacionamentos',
        'Autoconhecimento',
        'Luto e perdas',
        'Transições de vida',
      ],
    },
    {
      icon: <Sparkles size={26} />,
      title: 'Adolescentes',
      desc: 'Acompanhamento sensível para as transformações e desafios da adolescência.',
      topics: [
        'Identidade e autoestima',
        'Dificuldades escolares',
        'Conflitos familiares',
        'Ansiedade social',
        'Orientação vocacional',
      ],
    },
    {
      icon: <Heart size={26} />,
      title: 'Crianças',
      desc: 'Psicoterapia infantil com abordagem lúdica e acolhedora, em parceria com a família.',
      topics: [
        'Dificuldades comportamentais',
        'Medos e fobias',
        'Separação dos pais',
        'Problemas de socialização',
        'Desenvolvimento emocional',
      ],
    },
  ]

  return (
    <section className="services" id="especialidades">
      <div className="services-inner">
        <div className="services-header">
          <FadeIn>
            <div className="section-label">Especialidades</div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="section-title">
              Atendimento para todas as <em>fases da vida</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p>
              Cada fase traz seus desafios únicos. Com experiência e sensibilidade,
              ofereço um espaço de escuta e transformação para cada momento.
            </p>
          </FadeIn>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.15}>
              <div className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                <ul className="service-topics">
                  {service.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Approach() {
  const pillars = [
    {
      title: 'Escuta Ativa',
      desc: 'Um espaço sem julgamentos, onde cada palavra importa e cada silêncio tem significado.',
    },
    {
      title: 'Olhar Integrador',
      desc: 'Articulação de diferentes abordagens psicológicas para atender à singularidade de cada pessoa.',
    },
    {
      title: 'Vínculo Terapêutico',
      desc: 'A relação de confiança entre terapeuta e paciente como base para toda transformação.',
    },
  ]

  return (
    <section className="approach" id="abordagem">
      <div className="approach-inner">
        <div className="approach-content">
          <FadeIn>
            <div className="section-label">Abordagem</div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="section-title">
              Psicoterapia com <em>profundidade</em> e acolhimento
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="approach-text">
              Meu trabalho é guiado pela crença de que cada pessoa possui dentro de si
              os recursos necessários para sua transformação. O papel da terapia é criar
              as condições para que esses recursos sejam acessados e desenvolvidos.
            </p>
          </FadeIn>

          <div className="approach-pillars">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={0.3 + i * 0.1}>
                <div className="pillar">
                  <div className="pillar-number">0{i + 1}</div>
                  <div className="pillar-content">
                    <h4>{pillar.title}</h4>
                    <p>{pillar.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn direction="left" delay={0.2}>
          <div className="approach-image-col">
            <img src={portraitPhoto} alt="Silvia Laureano" className="approach-image" />
            <motion.div
              className="approach-quote"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <p>&ldquo;A cura começa quando nos permitimos ser verdadeiramente vistos.&rdquo;</p>
              <span className="quote-attr">Silvia Laureano</span>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function QuoteSection() {
  return (
    <section className="quote-section">
      <FadeIn direction="none">
        <div className="quote-inner">
          <p className="quote-text">
            &ldquo;A psicoterapia não é sobre consertar o que está quebrado.
            É sobre iluminar o que sempre esteve ali, esperando para ser descoberto.&rdquo;
          </p>
          <p className="quote-author">Silvia Laureano</p>
        </div>
      </FadeIn>
    </section>
  )
}

function Contact() {
  const cards = [
    {
      icon: <Phone size={22} />,
      title: 'Telefone',
      info: '(11) 94133-3848',
    },
    {
      icon: <MapPin size={22} />,
      title: 'Consultório',
      info: 'Rua Dom Luís Felipe de Orleans, 698\nVila Maria — São Paulo, SP\nCEP 02118-000',
    },
    {
      icon: <Clock size={22} />,
      title: 'Horário',
      info: 'Seg. a Sex.\nSob agendamento',
    },
  ]

  return (
    <section className="contact" id="contato">
      <div className="contact-inner">
        <FadeIn>
          <div className="section-label">Contato</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="section-title">
            Dê o primeiro passo
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="contact-subtitle">
            O caminho para o bem-estar começa com uma conversa.
            Entre em contato para agendar sua primeira sessão.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="contact-cards">
            {cards.map((card) => (
              <div className="contact-card" key={card.title}>
                <div className="contact-card-icon">{card.icon}</div>
                <h4>{card.title}</h4>
                <p>{card.info}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="contact-cta-wrapper">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-large"
            >
              <MessageCircle size={20} />
              <span>Agendar pelo WhatsApp</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          Silvia <span>Laureano</span>
        </div>
        <div className="footer-info">
          Psicóloga Clinica &mdash; CRP 06/21461-1
        </div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Silvia Laureano. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}

function Divider() {
  return (
    <div className="section-divider">
      <div className="line" />
    </div>
  )
}

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Services />
      <Divider />
      <Approach />
      <QuoteSection />
      <Contact />
      <Footer />
    </>
  )
}

export default App
