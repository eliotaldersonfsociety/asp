import { FAQItem } from "./faq-item"

const faqs = [
  {
    question: "¿Es seguro para mi cuenta?",
    answer:
      "Sí. Utilizamos métodos orgánicos y estratégicos que respetan los términos de servicio de cada plataforma para garantizar la seguridad total de tu cuenta.",
  },
  {
    question: "¿Los seguidores son reales?",
    answer:
      "Trabajamos con una red de usuarios reales y perfiles de alta calidad interesados en diferentes nichos, lo que garantiza un crecimiento con apariencia natural.",
  },
  {
    question: "¿Cómo funciona el servicio de IA Política?",
    answer:
      "Nuestra IA analiza el sentimiento de la audiencia en tiempo real, optimiza tus mensajes clave y monitorea la percepción pública para ajustar tu estrategia de comunicación de manera efectiva.",
  },
  {
    question: "¿Cuánto tiempo tarda en iniciar el servicio?",
    answer:
      "La mayoría de los servicios de SMM inician en menos de 24 horas. Los análisis estratégicos de IA suelen entregarse en reportes semanales tras la configuración inicial.",
  },
  {
    question: "¿Necesitan mi contraseña?",
    answer:
      "Nunca te pediremos tu contraseña. Solo necesitamos el enlace público de tu perfil o el @usuario para aplicar las estrategias de crecimiento.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos Bancolombia, Nequi, Daviplata y PayPal. Todos los pagos son seguros y procesados de manera profesional.",
  },
  {
    question: "¿Ofrecen garantía en el servicio?",
    answer:
      "Sí, contamos con garantía de reposición en nuestros servicios de crecimiento y soporte estratégico continuo para asegurar tu satisfacción absoluta.",
  },
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
