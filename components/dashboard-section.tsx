"use client"

import { BarChart3, TrendingUp, Users, Activity } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function DashboardSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              {t.dashboard.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              {t.dashboard.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t.dashboard.description}
            </p>
            
            <div className="space-y-4">
              {t.dashboard.features.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mock Dashboard */}
          <div className="relative">
            <div className="absolute inset-0 bg-accent/5 rounded-2xl blur-2xl" />
            <div className="relative bg-card border border-border rounded-2xl p-6 shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">{t.dashboard.panelTitle}</h3>
                <span className="text-xs text-muted-foreground">{t.dashboard.lastUpdate}</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-secondary">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-xs text-muted-foreground">{t.dashboard.followers}</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">24,589</div>
                  <div className="text-xs text-accent">{t.dashboard.weeklyGrowth}</div>
                </div>
                <div className="p-4 rounded-lg bg-secondary">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-accent" />
                    <span className="text-xs text-muted-foreground">{t.dashboard.engagement}</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">8.7%</div>
                  <div className="text-xs text-accent">{t.dashboard.previousComparison}</div>
                </div>
              </div>

              {/* Chart Mock */}
              <div className="p-4 rounded-lg bg-secondary">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">{t.dashboard.monthlyGrowth}</span>
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
                <div className="flex items-end gap-2 h-24">
                  {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-accent/20 rounded-t"
                      style={{ height: `${height}%` }}
                    >
                      <div 
                        className="w-full bg-accent rounded-t transition-all"
                        style={{ height: `${height * 0.6}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  {t.dashboard.days.map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
