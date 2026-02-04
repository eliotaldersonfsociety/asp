import { Users, ThumbsUp, MessageSquare, Radio } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Real Followers",
    description:
      "Increase your follower base with real and active accounts that improve your credibility and organic reach.",
  },
  {
    icon: ThumbsUp,
    title: "Genuine Likes",
    description:
      "Increase your post engagement with likes from real users that boost the algorithm.",
  },
  {
    icon: MessageSquare,
    title: "Active Comments",
    description:
      "Generate conversation on your posts with relevant comments that increase interaction.",
  },
  {
    icon: Radio,
    title: "Live Viewers",
    description:
      "Fill your live streams with real viewers who interact and improve your positioning.",
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to grow on social media
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
