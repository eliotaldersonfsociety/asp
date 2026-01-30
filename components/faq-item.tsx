"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FAQItem({
  faq,
  index,
}: {
  faq: { question: string; answer: string }
  index: number
}) {
  const [open, setOpen] = useState(index === 0)

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-card hover:bg-card/80 transition-colors"
      >
        <span className="font-medium text-foreground pr-4">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="p-5 pt-0 text-muted-foreground">{faq.answer}</p>
      </div>
    </div>
  )
}
