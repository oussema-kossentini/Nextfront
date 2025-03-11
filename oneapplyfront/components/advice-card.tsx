"use client"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

interface AdviceCardProps {
  icon: string
  title: string
  shortDescription: string
  fullDescription: string
  isSelected: boolean
  onClick: () => void
}

export function AdviceCard({ icon, title, shortDescription, fullDescription, isSelected, onClick }: AdviceCardProps) {
  const { t } = useLanguage()
  const { theme } = useTheme()

  return (
    <motion.div
      className={`rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
        theme === "dark"
          ? `bg-[#1a2337] ${isSelected ? "border-2 border-[#64B5F6]" : "border border-[#292929]"}`
          : `bg-white ${isSelected ? "border-2 border-[#1E3A8A]" : "border border-gray-200"}`
      }`}
      whileHover={{ y: -3 }}
      layout
    >
      <div className="p-4 sm:p-6">
        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{icon}</div>
        <h3 className={`text-lg sm:text-xl font-bold mb-2 ${theme === "dark" ? "text-[#64B5F6]" : "text-[#1E3A8A]"}`}>
          {title}
        </h3>
        <p className={`mb-4 text-sm sm:text-base ${theme === "dark" ? "text-[#B0B0B0]" : "text-gray-600"}`}>
          {shortDescription}
        </p>

        <Button
          onClick={onClick}
          variant="outline"
          className={`w-full flex items-center justify-center gap-2 transition-all duration-300 text-sm py-1 h-auto ${
            theme === "dark"
              ? "text-[#64B5F6] border-[#64B5F6] hover:bg-[#1E1E1E]/10"
              : "text-[#1E3A8A] border-[#1E3A8A] hover:bg-[#1E3A8A]/10"
          }`}
        >
          {isSelected ? t("careerAdvice.card.readLess") : t("careerAdvice.card.readMore")}
          {isSelected ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div
                className={`pt-4 mt-4 ${theme === "dark" ? "border-t border-[#292929]" : "border-t border-gray-200"}`}
              >
                <div
                  className={`prose prose-sm max-w-none ${
                    theme === "dark"
                      ? "text-[#E0E0E0] prose-headings:text-[#E0E0E0] prose-strong:text-[#E0E0E0] prose-a:text-[#64B5F6]"
                      : "text-gray-700"
                  }`}
                  dangerouslySetInnerHTML={{ __html: fullDescription }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

