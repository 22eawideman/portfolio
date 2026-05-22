import { useState } from 'react'

const base = import.meta.env.BASE_URL

interface Link {
  href: string
  label: string
  external?: boolean
}

interface Project {
  title: string
  description: string
  tech: string[]
  images: string[]
  links?: Link[]
}

const projects: Project[] = [
  {
    title: 'Streamlair',
    description:
      'Full-stack YouTube-like video streaming platform with resumable uploads (TUS, up to 4 GB), automated HLS transcoding (360p/720p/1080p) via AWS Batch + FFmpeg on EC2 Spot instances, Google OAuth, Redis/BullMQ job queues, and a Kubernetes deployment demo with HPA autoscaling validated against 500 concurrent virtual users via k6.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'AWS S3', 'CloudFront', 'AWS Batch', 'Docker', 'Redis', 'BullMQ', 'Kubernetes'],
    images: [
      `${base}images/streamlair/01.png`,
      `${base}images/streamlair/02.png`,
      `${base}images/streamlair/03.png`,
      `${base}images/streamlair/04.png`,
      `${base}images/streamlair/05.png`,
    ],
    links: [
      { href: 'https://streamlair.net', label: 'streamlair.net', external: true },
      { href: 'https://streamlair.net/watch/19', label: 'Kubernetes demo', external: true },
    ],
  },
  {
    title: 'Neural Collaborative Filtering',
    description:
      'Recommendation system built from scratch using only NumPy — no ML frameworks. Implements matrix factorization and an MLP with hand-written forward passes, backprop, and a sparse Adam optimizer using scatter-add gradient accumulation. Trained on MovieLens 1M with temporal leave-one-out splitting, achieving HR@10 of 0.667 and NDCG@10 of 0.402 — a 47% improvement over the popularity baseline.',
    tech: ['Python', 'NumPy', 'pandas', 'matplotlib'],
    images: [
      `${base}images/recommendation/01.png`,
      `${base}images/recommendation/02.png`,
      `${base}images/recommendation/03.png`,
      `${base}images/recommendation/04.png`,
      `${base}images/recommendation/05.png`,
    ],
    links: [
      { href: 'https://github.com/22eawideman/RecommendationModel', label: 'GitHub', external: true },
    ],
  },
  {
    title: 'Character-Level GPT',
    description:
      'Transformer language model built from scratch in PyTorch. Implements multi-head self-attention, causal masking, positional encoding, and residual connections by hand — no HuggingFace. Trained on three Project Gutenberg novels (~5 MB) via Apple Silicon MPS, reaching a cross-entropy loss of ~1.25 at 50k steps.\n\nThe output demonstrates what a character-level model actually learns: it picks up on character-level statistics — which letters tend to follow which — so it produces text that looks like plausible English words ("Frince", "suddenstres", "cipounted"). These are invented but structurally convincing, because the model has learned patterns like common suffixes, consonant clusters, and vowel placement.\n\nHowever, coherent sentences are out of reach for a fundamental reason. The model\'s context window is 64 characters — roughly 10–15 words — and each token is a single character, so the model is spending most of its capacity just reconstructing word shapes rather than tracking meaning across a sentence. To produce grammatically coherent output you\'d need subword tokenization (e.g. BPE) so the same context window covers far more semantic content, a much larger model, and significantly more training.',
    tech: ['Python', 'PyTorch', 'Apple MPS'],
    images: [
      `${base}images/genai/01.png`,
      `${base}images/genai/02.png`,
    ],
    links: [
      { href: 'https://github.com/22eawideman/generativeAIModel', label: 'GitHub', external: true },
    ],
  },
]

function Carousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  return (
    <div className="carousel">
      <div className="carousel-image-wrap">
        <img src={images[index]} alt={`Screenshot ${index + 1}`} />
      </div>
      {images.length > 1 && (
        <div className="carousel-controls">
          <button onClick={prev} aria-label="Previous">&#8592;</button>
          <span>{index + 1} / {images.length}</span>
          <button onClick={next} aria-label="Next">&#8594;</button>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-header">
        <h2>{project.title}</h2>
        {project.links && (
          <div className="project-links">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                className="project-link"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="project-description">
        {project.description.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <div className="tech-list">
        {project.tech.map((t) => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>
      <Carousel images={project.images} />
    </article>
  )
}

export default function App() {
  return (
    <div className="page">
      <header className="site-header">
        <h1>Ethan Wideman</h1>
        <p className="subtitle">Software Engineer &middot; Indiana University &rsquo;26</p>
        <nav className="header-links">
          <a href="mailto:22eawideman@gmail.com" className="header-link">Email</a>
          <span className="header-link-divider" />
          <a href="https://www.linkedin.com/in/ethan-wideman-412446271" target="_blank" rel="noopener noreferrer" className="header-link">LinkedIn ↗</a>
          <span className="header-link-divider" />
          <a href="https://github.com/22eawideman" target="_blank" rel="noopener noreferrer" className="header-link">GitHub ↗</a>
          <span className="header-link-divider" />
          <a href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener noreferrer" className="header-link resume-link">Resume ↗</a>
        </nav>
      </header>
      <main className="projects">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </main>
    </div>
  )
}
