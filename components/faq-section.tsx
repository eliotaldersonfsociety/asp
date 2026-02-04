"use client"

import { FAQItem } from "./faq-item"
import { useLanguage } from "@/contexts/language-context"

const faqsData = [
  {
    question: "Is it safe for my account?",
    answer:
      "Yes. We use organic and strategic methods that respect the terms of service of each platform to guarantee total security for your account.",
  },
  {
    question: "Do the followers interact?",
    answer:
      "We work with a network of high-quality profiles interested in different niches, which guarantees growth with a natural appearance.",
  },
  {
    question: "How does the Political AI service work?",
    answer:
      "Our AI analyzes audience sentiment in real-time, optimizes your key messages, and monitors public perception to adjust your communication strategy effectively.",
  },
  {
    question: "How long does it take to start the service?",
    answer:
      "Most SMM services start in less than 24 hours. AI strategic analyses are usually delivered in weekly reports after initial setup.",
  },
  {
    question: "Do you need my password?",
    answer:
      "We will never ask for your password. We only need the public link to your profile or @username to apply growth strategies.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, digital wallets, and PayPal. All payments are secure and processed professionally.",
  },
  {
    question: "Do you offer a guarantee on the service?",
    answer:
      "Yes, we have a replacement guarantee on our growth services and continuous strategic support to ensure your absolute satisfaction.",
  },
]

export function FAQSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            We answer your questions before getting started
          </p>
        </div>

        <div className="space-y-4">
          {faqsData.map((faq, index) => (
            <FAQItem key={faq.question} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
