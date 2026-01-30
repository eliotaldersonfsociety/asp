import { FAQItem } from "./faq-item"

const faqs = [
  {
    question: "Es seguro para mi cuenta?",
    answer:
      "Si. Utilizamos metodos que respetan los terminos de servicio de cada plataforma...",
  },
  {
    question: "Los seguidores son reales?",
    answer:
      "Trabajamos con una red de usuarios reales interesados en diferentes nichos...",
  },
  // resto igual
]

export function FAQSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Resolvemos tus dudas antes de empezar
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
