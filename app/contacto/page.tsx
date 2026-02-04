"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MessageCircle, Clock, Send } from "lucide-react"
import { sendContactEmail } from "@/lib/actions/contact"
import { useLanguage } from "@/contexts/language-context"

export default function ContactoPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const fd = new FormData()
    fd.append('name', formData.name)
    fd.append('email', formData.email)
    fd.append('subject', formData.subject)
    fd.append('message', formData.message)

    try {
      const result = await sendContactEmail(fd)
      if (result.success) {
        alert(t.contact.formSuccess)
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        alert(result.error || t.contact.formError)
      }
    } catch (error) {
      alert(t.contact.formConnectionError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        {/* HERO SECTION */}
        <section className="text-center mb-10 px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 font-outfit uppercase tracking-tight line-height-tight">
            {t.contact.title} <span className="text-accent">{t.contact.titleAccent}</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            {t.contact.subtitle}
          </p>
        </section>

        {/* CONTACT GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
            
            {/* LEFT COLUMN: CONTACT INFO */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* EMAIL CARD */}
              <Card className="bg-card/50 border-border hover:border-accent/40 transition-colors">
                <CardContent className="p-5 md:p-6 flex gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-bold mb-1">{t.contact.emailTitle}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">{t.contact.emailDesc}</p>
                    <p className="text-accent font-semibold text-sm md:text-base underline decoration-accent/30 underline-offset-4 truncate">{t.contact.email}</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground mt-1">{t.contact.emailResponse}</p>
                  </div>
                </CardContent>
              </Card>

              {/* LIVE CHAT CARD */}
              <Card className="bg-card/50 border-border hover:border-accent/40 transition-colors">
                <CardContent className="p-5 md:p-6 flex gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-bold mb-1">{t.contact.chatTitle}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">{t.contact.chatDesc}</p>
                    <a 
                      href="https://wa.me/573161744421" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent font-semibold text-sm md:text-base hover:underline"
                    >
                      {t.contact.chatLink}
                    </a>
                    <p className="text-[10px] md:text-xs text-muted-foreground mt-1">{t.contact.chatSupport}</p>
                  </div>
                </CardContent>
              </Card>

              {/* HOURS CARD */}
              <Card className="bg-card/50 border-border hover:border-accent/40 transition-colors">
                <CardContent className="p-5 md:p-6 flex gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <div className="w-full min-w-0">
                    <h3 className="text-base md:text-lg font-bold mb-1">{t.contact.hoursTitle}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">{t.contact.hoursDesc}</p>
                    <div className="space-y-1 text-xs md:text-sm">
                      <p className="flex justify-between gap-4">
                        <span className="text-muted-foreground">{t.contact.weekdays}</span>
                        <span className="text-foreground font-medium">{t.contact.weekdaysTime}</span>
                      </p>
                      <p className="flex justify-between gap-4">
                        <span className="text-muted-foreground">{t.contact.saturdays}:</span>
                        <span className="text-foreground font-medium">{t.contact.saturdaysTime}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT COLUMN: CONTACT FORM */}
            <div className="lg:col-span-3">
              <Card className="h-full bg-card/50 border-border shadow-xl">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 font-outfit">{t.contact.formSubject}</h3>
                  <p className="text-sm text-muted-foreground mb-6 md:mb-8">Tell us about your project and we will propose the best growth path for you.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground">{t.contact.formName}</Label>
                        <Input 
                          id="name" 
                          placeholder="Your full name" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-background/50 border-border focus:border-accent h-11 md:h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground">{t.contact.formEmail}</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="name@company.com" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-background/50 border-border focus:border-accent h-11 md:h-12"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground">{t.contact.formSubject}</Label>
                      <Input 
                        id="subject" 
                        placeholder="e.g., AI Positioning, SMM Growth, etc." 
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="bg-background/50 border-border focus:border-accent h-11 md:h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground">{t.contact.formMessage}</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your objectives and current social networks..." 
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-background/50 border-border focus:border-accent resize-none text-sm md:text-base"
                      />
                    </div>

                    <Button type="submit" className="w-full h-12 md:h-14 text-base md:text-lg font-bold" disabled={isSubmitting}>
                      {isSubmitting ? t.contact.formSubmitting : t.contact.formSubmit}
                      <Send className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-accent/5 rounded-[2rem] md:rounded-[3rem] border border-accent/10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4 font-outfit uppercase tracking-tight">
              FAQ <span className="text-accent">Answered</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg px-4">Everything you need to know about our growth ecosystem</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {(t.contact.faqs as Array<{q: string, a: string}>).map((faq, index) => (
              <Card key={index} className="bg-card border-border hover:bg-card/80 transition-all duration-300">
                <CardContent className="p-6">
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {faq.q}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* STILL HAVE QUESTIONS */}
        <section className="text-center mt-24">
          <p className="text-muted-foreground mb-2 font-medium">Need a personalized plan?</p>
          <Link 
            href="https://wa.me/573161744421" 
            target="_blank"
            className="text-accent font-bold text-lg hover:underline underline-offset-8 decoration-2"
          >
            {t.hero.btnSecondary}
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
